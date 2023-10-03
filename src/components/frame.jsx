import styles from "./styles/frame.module.css";

export function Frame() {
  const handleMinimize = () => {
    window.controlAppBridge.minimizeApp();
  };
  const handleMaxRes = () => {
    window.controlAppBridge.maxResApp();
  };
  const handleClose = () => {
    window.controlAppBridge.closeApp();
  };
  return (
    <nav className={styles.frameContainer}>
      <div>
        <a title="Home" href="#/" className={styles.topBtn}>
          <img
            src="./assets/home.png"
            alt="Frame Icon to go to the home page"
          />
        </a>
        <a href="#/configuration" className={styles.topBtn} title="Configuration">
          <img src="./assets/gear.png" alt="" />
        </a>
        <a
          href="#/supportTicket"
          title="Support Ticket"
          className={styles.topBtn}
        >
          <img src="./assets/support.png" alt="Frame Icon to issue a ticket" />
        </a>
      </div>
      <div>
        <button
          className={styles.topBtn}
          title="Minimize"
          onClick={handleMinimize}
        >
          <img
            src="./assets/minimize.png"
            alt="Frame Icon to minimize the app"
          />
        </button>
        <button
          className={styles.topBtn}
          title="Fullscreen"
          onClick={handleMaxRes}
        >
          <img
            src="./assets/restore.png"
            alt="Frame Icon to toggle fullscreen"
          />
        </button>
        <button className={styles.topBtn} title="Close" onClick={handleClose}>
          <img src={"./assets/close.png"} alt="Frame Icon to close the app" />
        </button>
      </div>
    </nav>
  );
}
