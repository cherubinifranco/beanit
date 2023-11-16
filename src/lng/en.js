export const HomePage = {
  title: "MAS Tolls Manager",
  sendMails: "Send Mails",
  sendReports: "Send Reports"
};

export const MailSenderPage = {
  fileSelector: {
    title: "File Selector",
    alt: "Icon to select an XLSX File",
    inputName: "XLSX File",
    firstButton: "Edit Message",
    secondButton: "Send Emails",
  },
  errors: {
    title: "Users with errors",
    tableId: "Cell",
    tableMail: "Mail",
    tableError: "Error",
  },
  sendedMails: {
    title: "Sended Mails",
    tableId: "Cell",
    tableMail: "Mail",
    tableMailId: "Mail Id",
  },
};

export const ReportSenderPage = {
  fileSelector: {
    title: "Files Selector",
    alt: "Icon to select an XLSX File",
    minAmount: "Min Amount",
    xlsx: "XLSX File",
    pdfFolder: "PDF Folder",
    invoiceFolder: "Invoice Folder",
    firstButton: "Edit Message",
    lastSend: "Last Send:",
    secondButton: "Send Reports",
  },
  errors: {
    title: "Users with errors",
    tableId: "Cell",
    tableMail: "Mail",
    tableError: "Error",
  },
  sendedMails: {
    title: "Sended Mails",
    tableId: "Cell",
    tableMail: "Mail",
    tableMailId: "Mail Id",
  },
};

export const MessageTemplatePage = {
  messageBox: {
    title: "Message",
    matterPlaceholder: "Matter",
    messagePlaceholder: "Message",
  },
  messagePreview: {
    title: "Preview",
  },
  buttons: {
    return: "Save and Return",
    variables: "List of Variables",
  },
};

export const SupportPage = {
  title: "Support Ticket",
  optionBug: "Bug Report",
  optionSuggestion: "Suggestion",
  optionOther: "Other",
  messagePlaceholder: "Message",
  buttons: {
    return: "Return",
    send: "Send Ticket",
  },
};

export const ConfigurationPage = {
  staticVariables: {
    title: "Static Variables",
  },
  mailConfig: {
    title: "Mail Configuration",
    mail: "Mail",
    password: "App-Password",
    from: "Sender Title"
  },
  dangerZone: {
    title: "Danger Zone",
    first: {
      title: "Delete All Data",
      description:
        "This deletes mail configuration, message presets and variables.",
    },
  },
};

export const dialogInfo = {
  senderTitleHow:{
    title: "Help",
    message: "This is the name displayed when you send a mail. It usually is the company name" ,
     type: "info",
    buttons: ["Ok"],
  },
  mailHow:{
    title: "Help",
    message:"You need to set up an application password to enable sending emails from applications other than Google's.\nThe common password will result in an error when trying to send emails.",
    type: "info",
    buttons: ["Ok"],
  },
  mailNotDefined: {
    title: "Error",
    message: "Mail isn't configurated yet. Go to Configuration to do it",
    type: "warning",
    buttons: ["Ok"],
  },
  messageNotDefined: {
    title: "Error",
    message: "The title or the message is missing",
    type: "warning",
    buttons: ["Ok"],
  },
  xlsxFileNotDefined: {
    title: "Error",
    message: "No XLSX File Selected",
    type: "warning",
    buttons: ["Ok"],
  },
  succesSendind: {
    title: "Success!",
    message: "Mails are being sent, this could take a few minutes.",
    type: "info",
    buttons: ["Ok"],
  },
  supportSucces: {
    title: "Ticket Sent",
    message:
      "Your support ticket has been sent. You will have a response as soon as possible",
    type: "info",
    buttons: ["Thanks!"],
  },
  pdfError: {
    title: "Error",
    message: "No PDF folder selected",
    type: "info",
    buttons: ["Ok"],
  },
  facturasError: {
    title: "Error",
    message: "No Invoice folder selected",
    type: "info",
    buttons: ["Ok"],
  },
};
