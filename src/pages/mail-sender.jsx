import styles from "./styles/sender.module.css";
import { Button } from "../components/button";
import { Item } from "../components/item";
import { useState, useEffect } from "react";
import { getFile, sendMails, loadTemplateDataFromXlsx } from "../utils";
import { MailSenderPage as lng } from "../lng/es";

export default function MailSenderPage() {
  const [mailConfig, updateMailConfig] = useState({});
  const [clientErrors, updateClientErrors] = useState(() => []);
  const [sendedMails, updateSendedMails] = useState(() => []);
  const [xlsxFile, updateXlsxFile] = useState(() => "");

  useEffect(() => {
    const mailConfigLS = JSON.parse(localStorage.getItem("mailConfig")) || {};
    const clientErrorsLS =
      JSON.parse(localStorage.getItem("clientErros")) || [];
    const sendedMailsLS = JSON.parse(localStorage.getItem("sendedMails")) || [];
    const xlsxFileLS = localStorage.getItem("xlsxFile") || "";
    updateXlsxFile(xlsxFileLS);
    updateMailConfig(mailConfigLS);
    updateClientErrors(clientErrorsLS);
    updateSendedMails(sendedMailsLS);
  }, []);

  async function updateXLSX() {
    const path = await getFile();
    localStorage.setItem("xlsxFile", path);
    updateXlsxFile(path);
    if (path) {
      const data = await loadTemplateDataFromXlsx(path);
      if (data) {
        localStorage.setItem("templateData", JSON.stringify(data[1]));
      }
    }
  }

  async function submitMails() {
    updateClientErrors([]);
    updateSendedMails([]);

    const title = localStorage.getItem("titleToSend");
    const message = localStorage.getItem("msjeToSend");

    const mailInfo = {
      xlsxFile: xlsxFile,
      mailConfig: mailConfig,
      title: title,
      message: message,
    };
    const data = await sendMails(mailInfo); // [errores, enviados] => as json

    if (!data) return;

    const [errors, sendedMails] = data;

    updateClientErrors(errors);
    updateSendedMails(sendedMails);
    localStorage.setItem("clientErros", JSON.stringify(errors));
    localStorage.setItem("sendedMails", JSON.stringify(sendedMails));
  }

  return (
    <main>
      <section className={styles.section}>
        <h1 className="title">{lng.fileSelector.title}</h1>
        <div className={styles.container}>
          <Item
            name={lng.fileSelector.inputName}
            icon="/assets/file.png"
            alt={lng.fileSelector.alt}
            value={xlsxFile}
            onClick={updateXLSX}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            text={lng.fileSelector.firstButton}
            style="secondary"
            type="link"
            anchor="/messageTemplate"
          />

          <Button text={lng.fileSelector.secondButton} onClick={submitMails} />
        </div>
      </section>

      <section className={styles.section}>
        <h1 className="title">{lng.errors.title}</h1>
        <div className={styles.container}>
          <Item
            type="table"
            style="bold"
            first={lng.errors.tableId}
            second={lng.errors.tableMail}
            third={lng.errors.tableError}
          />

          {clientErrors.map((client) => (
            <Item
              key={client.cellId + client.error}
              type="table"
              first={client.cellId}
              second={client.mail}
              third={client.error}
            />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h1 className="title">{lng.sendedMails.title}</h1>
        <div className={styles.container}>
          <Item
            type="table"
            style="bold"
            first={lng.sendedMails.tableId}
            second={lng.sendedMails.tableMail}
            third={lng.sendedMails.tableMailId}
          />

          {sendedMails.map((client) => (
            <Item
              key={client.cellId + client.mail}
              type="table"
              first={client.cellId}
              second={client.mail}
              third={client.mailId}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
