import { dialogInfo as lng } from "./lng/es";

export async function loadTemplateDataFromXlsx(xlsxFile) {
  if (xlsxFile == "" || xlsxFile == null || xlsxFile == undefined) {
    return false;
  }
  const loadedData = await window.electronAPI.getSampleDataXlsx(xlsxFile);

  return loadedData;
}

export function arrayToObj(array) {
  const resObj = {};
  array.forEach((el) => {
    resObj[el[0]] = el[1];
  });

  return resObj;
}
export function objToArrayOfEntries(obj) {
  const resArray = Object.keys(obj);
  return resArray;
}

export function applyTemplate(message, obj) {
  const ownVariablesLS = JSON.parse(localStorage.getItem("ownVariables")) || [];
  const ownVariables = arrayToObj(ownVariablesLS);

  const newObj = {
    ...obj,
    ...ownVariables,
  };
  for (const key in newObj) {
    const lookup = new RegExp(`{${key}}`, "g");
    const value = newObj[key];
    if (lookup.test(message)) {
      message = message.replace(lookup, value);
    }
  }
  return message;
}

export async function getDir() {
  const folderPath = await window.electronAPI.getFolder();
  if (folderPath == undefined) return "";
  return folderPath;
}
export async function getFile() {
  const filePath = await window.electronAPI.getFile();
  if (filePath == undefined) return "";
  return filePath;
}

async function verifyMailInfo(mailInfo) {
  if (
    [mailInfo.mailConfig.mail, mailInfo.mailConfig.password].some(
      (x) => x == undefined || x == ""
    )
  ) {
    await displayDialog(lng.mailNotDefined);
    return true;
  }

  if (mailInfo.xlsxFile == undefined || mailInfo.xlsxFile == "") {
    await displayDialog(lng.xlsxFileNotDefined);
    return true;
  }

  if (
    [mailInfo.title, mailInfo.message].some(
      (x) => x == undefined || x == ""
    )
  ) {
    await displayDialog(lng.messageNotDefined);
    return true;
  }

  return false;
}

export async function displayDialog(info) {
  await window.electronAPI.showDialog(info);
}

export async function sendTicket(mailInfo) {
  const skip = await verifyMailInfo(mailInfo);
  if (skip) return;

  window.electronAPI.sendTicket(mailInfo);

  await displayDialog(lng.supportSucces);
}

export async function sendMails(mailInfo) {
  const skip = await verifyMailInfo(mailInfo);
  if (skip) return;

  displayDialog(lng.succesSendind);

  const [errors, sendedMails] = await window.electronAPI.sendMailsInfo(
    mailInfo
  );

  return [errors, sendedMails];
}

export async function fetchAllData(xlsxFile) {
  const jsonData = await window.electronAPI.fetchAllData(xlsxFile);

  return jsonData;
}
