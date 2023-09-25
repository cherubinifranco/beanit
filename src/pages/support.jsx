import styles from "./styles/support.module.css";
import { Button } from "../components/button";
import { useState, useEffect } from "react";
import { sendTicket } from "../utils";

export default function SupportPage() {
  const [mailConfig, updateMailConfig] = useState("");

  useEffect(() => {
    const mailConfigLS = JSON.parse(localStorage.getItem("mailConfig")) ?? {};
    updateMailConfig(mailConfigLS);
  }, []);

  const [titleText, updateTitle] = useState(() => "");

  const handleTitleChange = (event) => {
    updateTitle(event.target.value);
  };

  const [msjeText, updateText] = useState(() => "");
  const handleTextChange = (event) => {
    updateText(event.target.value);
  };

  async function submitTicket() {
    const mailInfo = {
      mailConfig: mailConfig,
      title: titleText,
      message: msjeText,
    };

    await sendTicket(mailInfo);
  }

  return (
    <section className={styles.section}>
      <img
        className={styles.imgContainer}
        src="./assets/supportBig.png"
        alt="Support Logo"
      />

      <h1 className="title">Mensaje a  Soporte</h1>
      <div className={styles.container}>
        <select name="select" onChange={handleTitleChange}>
          <option value="Ticket - Bug Report" selected>Bug Report</option>
          <option value="Ticket - Sugerencia" >
            Sugerencia
          </option>
          <option value="Ticket - Otro">Otro</option>
        </select>
        <textarea
          placeholder="Mensaje"
          type="text"
          value={msjeText}
          onChange={handleTextChange}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          text="Volver"
          style="secondary"
          onClick={() => history.back()}
        />
        <Button text="Enviar Ticket" onClick={submitTicket} />
      </div>
    </section>
  );
}
