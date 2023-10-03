const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");





function applyTemplate(message, entry, ownVariables) {
  const newObj = {
    ...entry,
    ...ownVariables,
  };

  for (const key in newObj) {
    const lookup = new RegExp(`{${key}}`, "g");
    const lookup2 = new RegExp(`\n`, "g");
    const value = newObj[key];
    if (lookup.test(message)) {
      message = message.replace(lookup, value);
      message = message.replace(lookup2, "<br />");
    }
  }
  return message;
}

const pushErrors = (errorsArray, cellId, mail, error) => {
  errorsArray.push({ cellId, mail, error });
};

async function sendMailsToClients(clientData, mailContent, ownVariables) {
  // Transporter config
  const SERVICE = mailContent.mailConfig.service || "gmail";
  const HOST = mailContent.mailConfig.host || "smtp.gmail.com";
  const MAIL = mailContent.mailConfig.mail;
  const PASSWORD = mailContent.mailConfig.password;

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false,
    service: SERVICE,
    auth: {
      user: MAIL,
      pass: PASSWORD,
    },
  });

  const errores = [];
  const sendedMails = [];

  for (const entry of clientData) {
    let skip = false;
    const mail =
      entry.Email ||
      entry.email ||
      entry.Mail ||
      entry.mail ||
      entry.Correo ||
      entry.correo ||
      "";
    const cellId = "A" + entry.xlsxCellId;

    // This is made with "skip" to give room in case of expansion in error checking and details

    if (mail == "") {
      pushErrors(errores, cellId, mail, "Mail no definido");
      skip = true;
    }

    if (skip) {
      continue;
    }

    let content = applyTemplate(mailContent.message, entry, ownVariables);

    let mailOptions = {
      from: MAIL,
      to: mail,
      subject: mailContent.title,
      html: content,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      sendedMails.push({ cellId: cellId, mail: mail, mailId: info.messageId });
    } catch (error) {
      pushErrors(
        errores,
        cellId,
        mail,
        "Error de email. Verificar dirección y reintentar"
      );
    }
  }
  return [errores, sendedMails];
}

module.exports = { sendMailsToClients };
