import styles from "./styles/support.module.css";
import { Button } from "../components/button";
import { useState, useEffect, useContext } from "react";
import { sendTicket } from "../utils";
import { SupportPage as lng } from "../lng/es";

export default function SupportPage() {
  const [mailConfig, updateMailConfig] = useState({ mail: "", password: "" });

  useEffect(() => {
    const mailConfigLS = JSON.parse(localStorage.getItem("mailConfig")) ?? {
      mail: "",
      password: "",
    };
    updateMailConfig(mailConfigLS);
  }, []);

  const [titleText, updateTitle] = useState(() => "Ticket - Bug Report");

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
      xlsxFile: "support",
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

      <h1 className="title">{lng.title}</h1>
      <div className={styles.container}>
        <select name="select" onChange={handleTitleChange}>
          <option value="Ticket - Bug Report" defaultChecked>
            {lng.optionBug}
          </option>
          <option value="Ticket - Sugerencia">{lng.optionSuggestion}</option>
          <option value="Ticket - Otro">{lng.optionOther}</option>
        </select>
        <textarea
          placeholder={lng.messagePlaceholder}
          type="text"
          value={msjeText}
          onChange={handleTextChange}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          text={lng.buttons.return}
          style="secondary"
          onClick={() => history.back()}
        />
        <Button text={lng.buttons.send} onClick={submitTicket} />
      </div>
    </section>
  );
}
