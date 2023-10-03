export const homePage = {};

export const MailSenderPage = {
  fileSelector: {
    title: "File Selector",
    alt: "Icon to select an XLSX File",
    inputName: "XLSX File",
    firstButton: "Edit Message",
    secondButton: "Send Emails"
  },
  errors: {
    title: "Users with errors",
    tableId: "Cell",
    tableMail: "Mail",
    tableError: "Error"
  },
  sendedMails: {
    title: "Sended Mails",
    tableId: "Cell",
    tableMail: "Mail",
    tableMailId: "Mail Id"
  }
};


export const MessageTemplatePage =  {
    messageBox: {
        title: "Message",
        matterPlaceholder: "Matter",
        messagePlaceholder: "Message"
    },
    messagePreview: {
        title: "Preview"
    },
    buttons: {
        return: "Return",
        variables: "List of Variables"
    }
}


export const SupportPage = {
    title: "Support Ticket",
    optionBug: "Bug Report",
    optionSuggestion: "Suggestion",
    optionOther: "Other",
    messagePlaceholder: "Message",
    buttons : {
        return: "Return",
        send: "Send Ticket" 
    }
}

export const ConfigurationPage = {
    staticVariables:{
        title: "Static Variables"
    },
    mailConfig: {
        title: "Mail Configuration",
        mail: "Mail",
        password: "App-Password"
    },
    dangerZone: {
        title: "Danger Zone",
        first:{
            title: "Delete All Data",
            description: "This deletes mail configuration, message presets and variables."
        }
    }
}