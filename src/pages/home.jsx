import styles from "./styles/home.module.css";
import { Button } from "../components/button";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [lastSend, updateLastSend] = useState("");

  useEffect(() => {
    const lastSendLS = localStorage.getItem("lastSend") ?? "To be Send";
    updateLastSend(lastSendLS);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.beanIt}>Bean It</h1>
        <img src="./logo.png" className={styles.imgContainer} />
        <div className={styles.horizontalLine}></div>
        <div className="row-container">
          <Button text="Aprender a usar" style="secondary" type="link" anchor="/learn" />
          <Button text="Enviar Mails" type="link" anchor="/mailSender" />
          <Button text="TEST" type="link" anchor="/test" />
        </div>
      </div>
    </main>
  );
}
