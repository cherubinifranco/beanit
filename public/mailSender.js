const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");

function applyTemplate(message, obj, ownVariables) {
  const newObj = {
    ...obj,
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
  errorsArray.push({ cellId: cellId, mail, error });
};

async function sendMailsToClients(clientData, mailContent, ownVariables) {
  // Transporter config
  const SERVICE = mailContent.mailConfig.service || "gmail";
  const HOST = mailContent.mailConfig.host || "smtp.gmail.com";
  const MAIL = mailContent.mailConfig.mail;
  const PASSWORD = mailContent.mailConfig.password;
  const ExtraFile = mailContent.extraFile;
  
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

  const errors = [];
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
      pushErrors(errors, cellId, mail, "Mail no definido");
      skip = true;
    }

    if (skip) {
      continue;
    }

    let content = applyTemplate(mailContent.message, entry, ownVariables);

    let mailOptions = {
      from: `MAS INGENIERIA <${mail}>`,
      to: mail,
      subject: mailContent.title,
      html: content,
      attachments: [
        {
          path: ExtraFile,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      sendedMails.push({ cellId: cellId, mail: mail, mailId: info.messageId });
    } catch (error) {
      pushErrors(
        errors,
        cellId,
        mail,
        "Error de email. Verificar dirección y reintentar"
      );
    }
  }
  return [errors, sendedMails];
}



module.exports = { sendMailsToClients };
