const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { Notification } = require("electron");
const { sendMailsToClients } = require("./mailSender");
const { fetchDataFromXLSX, fetchSampleDataFromXLSX } = require("./fetchData");

const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minHeight: 650,
    minWidth: 800,
    frame: false,
    title: "Bean It", 
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "/preload.js"),
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const windowURL = true
    ? `file://${path.join(__dirname, '../build/index.html')}`
    : "http://localhost:3000/";

  mainWindow.loadURL(windowURL);
  ipcMain.on("closeApp", () => {
    mainWindow.close();
  });
  ipcMain.on("maxResApp", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("minimizeApp", () => {
    mainWindow.minimize();
  });

  ipcMain.on("showDialog", async (event, dialogInfo) => {
    dialog.showMessageBox(mainWindow, dialogInfo);
  });

  ipcMain.handle("selectDirectory", async function () {
    let dir = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    return dir.filePaths[0];
  });

  ipcMain.handle("selectFile", async function () {
    let file = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
    });

    return file.filePaths[0];
  });

  ipcMain.handle("getSampleData", async (event, xlsxFile) => {
    const sampleData = await fetchSampleDataFromXLSX(xlsxFile);
    return sampleData;
  });

  ipcMain.handle("fetchAllData", async (event, xlsxFile) => {
    const data = await fetchDataFromXLSX(xlsxFile);
    return data;
  });

  ipcMain.handle("sendMails", async (event, mailInfo) => {
    const clientData = await fetchDataFromXLSX(mailInfo.xlsxFile);
    let ownVariablesLS = await mainWindow.webContents.executeJavaScript(
      'localStorage.getItem("ownVariables");',
      true
    );
    const ownVariables = {};
    if (ownVariablesLS == undefined) ownVariablesLS = "[]";
    ownVariablesLS = JSON.parse(ownVariablesLS);
    ownVariablesLS.forEach((el) => {
      ownVariables[el[0]] = el[1];
    });
    const data = await sendMailsToClients(clientData, mailInfo, ownVariables);
    return data;
  });

  ipcMain.handle("sendTestMail", async (event, mailInfo) => {
    const ownData = [
      {
        mail: mailInfo.mailConfig.mail,
      },
    ];
    const data = await sendMailsToClients(ownData, mailInfo);
    return data; // [errores, sendedMails]
  });

  ipcMain.handle("sendTicket", async (event, mailInfo) => {
    const supportData = [
      {
        mail: "cherubini.franco@hotmail.com",
      },
    ];
    const data = await sendMailsToClients(supportData, mailInfo);
    return data; // [errores, sendedMails]
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId("Bean It")
  createWindow();
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, "3000");
  showNotification("AAAe", "Aasdasdall soon.")
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", (info) => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  console.log(info);
});

autoUpdater.on("update-downloaded", (info) => {
  mainWindow.send("updateDownloaded");
  showNotification("New version Availble", "The new version has been downloaded. Restart to see changes")
});

autoUpdater.on("error", (info) => {
  console.log(info);
});

function showNotification(title, body) {
  new Notification({
    title: title,
    body: body,
    icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
  }).show();
}
