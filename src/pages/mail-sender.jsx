import styles from "./styles/sender.module.css";
import { Button } from "../components/button";
import { Item } from "../components/item";
import { useState, useEffect } from "react";
import { getFile, sendMails } from "../utils";

export default function MailSenderPage() {
  const [mailConfig, updateMailConfig] = useState({});
  const [clientErrors, updateClientErrors] = useState(() => []);
  const [sendedMails, updateSendedMails] = useState(() => []);
  const [xlsxFile, updateXlsxFile] = useState(() => "");

  useEffect(() => {
    const mailConfigLS = JSON.parse(localStorage.getItem("mailConfig")) ?? {};
    const clientErrorsLS = JSON.parse(localStorage.getItem("clientErros")) ?? [];
    const sendedMailsLS = JSON.parse(localStorage.getItem("sendedMails")) ?? [];
    const xlsxFileLS = localStorage.getItem("xlsxFile") ?? "";
    updateXlsxFile(xlsxFileLS);
    updateMailConfig(mailConfigLS);
    updateClientErrors(clientErrorsLS)
    updateSendedMails(sendedMailsLS)
  }, []);

  async function updateXLSX() {
    const path = await getFile();
    localStorage.setItem("xlsxFile", path);
    updateXlsxFile(path);
  }

  async function submitMails() {
    const title = await localStorage.getItem("titleToSend");
    const message = await localStorage.getItem("msjeToSend");

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
    localStorage.setItem("clientErros", JSON.stringify(errors))
    localStorage.setItem("sendedMails", JSON.stringify(sendedMails))
  }

  return (
    <main>
      <section className={styles.section}>
        <h1 className="title">Mail sender</h1>
        <div className={styles.container}>
          <Item
            name="Archivo XLSX"
            icon="/assets/file.png"
            alt="ICONO para seleccionar archivo XLSX"
            value={xlsxFile}
            onClick={updateXLSX}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            text="Editar Mensaje"
            style="secondary"
            type="link"
            anchor="/messageTemplate"
          />
          
          <Button text="Enviar Mails" onClick={submitMails} />
        </div>
      </section>

      <section className={styles.section}>
        <h1 className="title">Usuarios con errores</h1>
        <div className={styles.container}>
          <Item
            type="table"
            style="bold"
            first="Celda"
            second="Correo"
            third="Error"
          />

          {clientErrors.map((client) => (
            <Item
              key={client.id + client.error}
              type="table"
              first={client.id}
              second={client.mail}
              third={client.error}
            />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h1 className="title">Correos Enviados</h1>
        <div className={styles.container}>
          <Item
            type="table"
            style="bold"
            first="Celda"
            second="Correo"
            third="Mail Id"
          />

          {sendedMails.map((client) => (
            <Item
              key={client.id + client.mail}
              type="table"
              first={client.id}
              second={client.mail}
              third={client.mailId}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
