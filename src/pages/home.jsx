import styles from "./styles/home.module.css";
import { Button } from "../components/button";
import { useState, useEffect } from "react";

// This is a future home page, but is not necessary for the moment.

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.beanIt}>Bean It</h1>
        <img src="./logo.png" className={styles.imgContainer} />
        <div className={styles.horizontalLine}></div>
        <div className="row-container">
          <Button text="Enviar Mails" type="link" anchor="/mailSender" />
        </div>
      </div>
      <section className={styles.dangerZone + " " + styles.container}>
        <h1 className={styles.dangerTitle + " title"}>
          {lng.dangerZone.title}
        </h1>

        <div className={styles.item}>
          <div>
            <h1>{lng.dangerZone.first.title}</h1>
            <p>{lng.dangerZone.first.description}</p>
          </div>
          <Button
            text="Delete"
            style="danger"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          />
        </div>
      </section>
    </main>
  );
}
