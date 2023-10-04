export const homePage = {};

export const MailSenderPage = {
  fileSelector: {
    title: "Archivo XLSX",
    alt: "Icono para seleccionar un archivo XLSX",
    inputName: "Archivo XLSX",
    firstButton: "Editar Mensaje",
    secondButton: "Enviar Emails"
  },
  errors: {
    title: "Userios con Errores",
    tableId: "Celda",
    tableMail: "Mail",
    tableError: "Error"
  },
  sendedMails: {
    title: "Mails Enviados",
    tableId: "Celda",
    tableMail: "Mail",
    tableMailId: "Mail Id"
  }
};


export const MessageTemplatePage =  {
    messageBox: {
        title: "Mensaje",
        matterPlaceholder: "Asunto",
        messagePlaceholder: "Mensaje"
    },
    messagePreview: {
        title: "Vista Previa"
    },
    buttons: {
        return: "Volver",
        variables: "Lista de Variables"
    }
}


export const SupportPage = {
    title: "Ticket de Soporte",
    optionBug: "Bug Report",
    optionSuggestion: "Segerencia",
    optionOther: "Otro",
    messagePlaceholder: "Mensaje",
    buttons : {
        return: "Volver",
        send: "Enviar Ticket" 
    }
}

export const ConfigurationPage = {
    staticVariables:{
        title: "Variables Fijas"
    },
    mailConfig: {
        title: "Configuración de Mail",
        mail: "Mail",
        password: "Contraseña de Aplicación"
    },
    dangerZone: {
        title: "Zona de peligro",
        first:{
            title: "Elimina todo",
            description: "Esto elimina la conficuración de mail, los mensajes guardados y las variables"
        }
    }
}

export const dialogInfo = {
    mailNotDefined: {
      title: "Error",
      message: "El Mail no está configurado aún. Entra a la ventana de configuración para cambiarlo.",
      type: "warning",
      buttons: ["Ok"]
    },
    messageNotDefined: {
      title: "Error",
      message: "Falta título o mensaje.",
      type: "warning",
      buttons: ["Ok"]
    },
    xlsxFileNotDefined: {
      title: "Error",
      message: "No hay un archivo XLSX seleccionado.",
      type: "warning",
      buttons: ["Ok"]
    },
    succesSendind: {
      title: "Success!",
      message: "Los Mails se están enviando. Esto puede tardar unos minutos.",
      type: "info",
      buttons: ["Ok"],
    },
    supportSucces : {
      title: "Ticket Sent",
      message: "Tu ticket de soporte se está mandando. Tendrás una respuesta tan pronto sea posible.",
      type: "info",
      buttons: ["Thanks!"],
    }
  };
  
