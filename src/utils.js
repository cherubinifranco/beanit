const date = new Date();
const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];
const mes = meses[date.getMonth()];
const dia = dias[date.getDay()];

const basicTemplateData = {
  mesHoy: mes,
  diaHoy: dia,
};

export async function loadTemplateDataFromXlsx(xlsxFile) {
  if (xlsxFile == "" || xlsxFile == null || xlsxFile == undefined) {
    return false;
  }

  const loadedData = await window.electronAPI.getSampleDataXlsx(xlsxFile);

  return loadedData;
}

export function applyTemplate(message, obj) {
  const newObj = {
    ...obj,
    ...basicTemplateData,
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
    Object.values(mailInfo).some((x) => x == "" || x == undefined || x == null)
  ) {
    await window.electronAPI.showDialog({
      title: "Error",
      message: "Recorda que debes completar todos los campos",
      type: "warning",
      buttons: ["Ok"],
    });

    return true;
  } else {
    await window.electronAPI.showDialog({
      title: "En proceso",
      message: "Los mails se estan enviando, esto puede tardar unos minutos",
      type: "info",
      buttons: ["Ok"],
    });
    return false;
  }
}

export async function displayDialog(info) {
  await window.electronAPI.showDialog(info);
}

export async function sendTicket(mailInfo) {
  if (
    Object.values(mailInfo).some((x) => x == "" || x == undefined || x == null)
  ) {
    await window.electronAPI.showDialog({
      title: "Error",
      message: "Recorda que debes completar todos los campos",
      type: "warning",
      buttons: ["Ok"],
    });

    return;
  }

  window.electronAPI.sendTicket(mailInfo);

  await window.electronAPI.showDialog({
    title: "Ticket Enviado",
    message:
      "Tu solicitud de soporte fue enviada correctamente, te mandaremos una respuesta tan pronto sea posible",
    type: "info",
    buttons: ["Genial"],
  });
}

export async function sendMails(mailInfo) {
  const skip = await verifyMailInfo(mailInfo);
  if (skip) return;

  const [errors, sendedMails] = await window.electronAPI.sendMailsInfo(
    mailInfo
  );

  return [errors, sendedMails];
}

export async function fetchAllData(xlsxFile) {
  const jsonData = await window.electronAPI.fetchAllData(xlsxFile);

  return jsonData;
}
