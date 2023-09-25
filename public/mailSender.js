const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");


function applyTemplate ( message, obj ) {
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
  const mes = meses[date.getMonth()]

  obj.mes = mes;

  for ( const key in obj ) {
    const lookup = new RegExp (`{${key}}`, 'g' );
    const lookup2 = new RegExp (`\n`, 'g' );
    const value = obj[key];
    if ( lookup.test ( message ) ) {
        message = message.replace ( lookup, value)
        message = message.replace ( lookup2, "<br />")
    }
  }
  return message;
}

const pushErrors = (errorsArray, mail,  error) =>{
  errorsArray.push({mail, error})
}

async function sendMailsToClients (clientData, mailContent){

  
  // Transporter config
  const SERVICE = mailContent.mailConfig.service;
  const MAIL = mailContent.mailConfig.mail;
  const PASSWORD = mailContent.mailConfig.password;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
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
    const mail = entry.Email || entry.email || entry.Mail || entry.mail || entry.Correo || entry.correo
    const userId = mail + 2;

    // This is made with "skip" to give room in case of expansion in error checking and details

    if(mail == ""){
      pushErrors(errores, mail, "Mail no definido")
      skip = true;
    }

    if(skip){
      continue
    }
    
    let content = applyTemplate(mailContent.message, entry);

    let mailOptions = {
      from: MAIL,
      to: mail,
      subject: mailContent.title,
      html: content
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      sendedMails.push({id: userId, mail:mail, mailId: info.messageId});
    } catch (error) {
      errores.push({
        mail: mail,
        error: "Error de email. Verificar dirección y reintentar",
      });
    }
  }
  return [errores, sendedMails];
}



module.exports = { sendMailsToClients };
