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