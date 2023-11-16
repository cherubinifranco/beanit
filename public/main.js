const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const { sendReportsToClients, sendMailsToClients } = require("./mailSender");
const { fetchDataFromXLSX, fetchSampleDataFromXLSX } = require("./fetchData");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minHeight: 500,
    minWidth: 520,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const windowURL = false
    ? `file://${path.join(__dirname, "../build/index.html")}`
    : "http://localhost:3000/";

  win.loadURL(windowURL);
  ipcMain.on("closeApp", () => {
    win.close();
  });
  ipcMain.on("maxResApp", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("minimizeApp", () => {
    win.minimize();
  });

  ipcMain.on("showDialog", async (event, dialogInfo) => {
    dialog.showMessageBox(win, dialogInfo);
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
    let temp = await win.webContents.executeJavaScript(
      'localStorage.getItem("ownVariables");',
      true
    );
    if (temp == undefined) temp = "[]";
    const ownVariables = {};
    const ownVariablesLS = JSON.parse(temp);
    ownVariablesLS.forEach((el) => (ownVariables[el[0]] = el[1]));
    const data = await sendMailsToClients(clientData, mailInfo, ownVariables);
    return data;
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
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
