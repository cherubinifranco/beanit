const { contextBridge, ipcRenderer } = require("electron");
async function sendMailsInfo(mailInfo) {
  const data = await ipcRenderer.invoke("sendMails", mailInfo);
  return data; // [[{errores}][{enviados}]]
}

async function sendTestMail(mailInfo) {
  const data = await ipcRenderer.invoke("sendTestMail", mailInfo);
  return data;
}

async function fetchAllData(xlsxFile) {
  const data = await ipcRenderer.invoke("fetchAllData", xlsxFile);
  return data; // [{data}, {data}, {data}]
}
async function getSampleDataXlsx(xlsxFile) {
  const sampleData = await ipcRenderer.invoke("getSampleData", xlsxFile);
  return sampleData; // [{variables}]
}
async function sendTicket(mailInfo) {
  const data = await ipcRenderer.invoke("sendTicket", mailInfo);
  return data; // [[{errores}][{enviados}]]
}

async function showDialog(dialogInfo) {
  await ipcRenderer.send("showDialog", dialogInfo);
}

async function getFolder() {
  return await ipcRenderer.invoke("selectDirectory");
}
async function getFile() {
  return await ipcRenderer.invoke("selectFile");
}

function maxResApp() {
  ipcRenderer.send("maxResApp");
}
function closeApp() {
  ipcRenderer.send("closeApp");
}
function minimizeApp() {
  ipcRenderer.send("minimizeApp");
}

let electronBridge = {
  fetchAllData: fetchAllData,
  getSampleDataXlsx: getSampleDataXlsx,
  sendTicket: sendTicket,
  sendMailsInfo: sendMailsInfo,
  getFolder: getFolder,
  getFile: getFile,
  showDialog: showDialog,
  sendTestMail: sendTestMail,
};

let controlAppBridge = {
  minimizeApp: minimizeApp,
  closeApp: closeApp,
  maxResApp: maxResApp,
};

contextBridge.exposeInMainWorld("electronAPI", electronBridge);
contextBridge.exposeInMainWorld("controlAppBridge", controlAppBridge);
