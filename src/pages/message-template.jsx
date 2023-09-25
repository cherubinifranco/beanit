import styles from "./styles/message-template.module.css";
import { Button } from "../components/button";
import { useState, useEffect } from "react";
import {
  applyTemplate,
  displayDialog,
  loadTemplateDataFromXlsx,
} from "../utils";

export default function MessageTemplatePage() {
  const [presetSelected, updatePresetSelected] = useState(
    localStorage.getItem("presetSelected") ?? 1
  );
  const [xlsxFile, updatexlsxFile] = useState("");
  const [msjeText, updateText] = useState("");
  const [titleText, updateTitle] = useState("");
  const [templateData, updateTemplateData] = useState(() => "");

  useEffect(() => {
    const xlsxFileLS = localStorage.getItem("xlsxFile") ?? "";
    const titleTextLS =
      localStorage.getItem(`presetTitle${presetSelected}`) ?? "";

    const msjeTextLS =
      localStorage.getItem(`presetMsje${presetSelected}`) ?? "";

    updatexlsxFile(xlsxFileLS);
    updateTitle(titleTextLS);
    updateText(msjeTextLS);
    loadVariables();
  }, []);

  const loadPreset = (event) => {
    const value = event.target.value;
    localStorage.setItem("presetSelected", value);
    const titleTextLS = localStorage.getItem(`presetTitle${value}`) ?? "";
    const msjeTextLS = localStorage.getItem(`presetMsje${value}`) ?? "";
    updateTitle(titleTextLS);
    updateText(msjeTextLS);
    updatePresetSelected(value);
  };

  let previewMessage = applyTemplate(msjeText, templateData);
  const handleChange = (event) => {
    const value = event.target.value;
    updateText(value);
    localStorage.setItem(`presetMsje${presetSelected}`, value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    updateTitle(value);
    localStorage.setItem(`presetTitle${presetSelected}`, value);
  };

  const handleBack = () => {
    localStorage.setItem("msjeToSend", msjeText);
    localStorage.setItem("titleToSend", titleText);
    history.back();
  };

  const loadVariables = async () => {
    const newTemplateData = await loadTemplateDataFromXlsx(xlsxFile);
    if (newTemplateData) {
      updateTemplateData(newTemplateData);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className="title">Mensaje</h1>
        <div className={styles.box}>
          <input
            type="text"
            placeholder="Asunto"
            className="other-left-input"
            value={titleText}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Mensaje"
            type="text"
            value={msjeText}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className={styles.container}>
        <h1 className="title">Vista Previa</h1>
        <div className={styles.box}>
          <textarea type="text" value={previewMessage} readOnly />
        </div>
      </section>
      <section className={styles.buttons}>
        <Button text="Volver" style="secondary" onClick={handleBack} />
        <Button
          text="Lista de Variables"
          style="secondary"
          onClick={() =>
            displayDialog({
              title: "Variables Cargadas",
              message: `Las variables cargadas son: ${Object.keys(
                templateData
              ).join(
                ", "
              )}, diaHoy, mesHoy.\nPara utilizar las variables hay que encerrarlas en llaves. Ej: {Email}\nXLSX cargado: ${xlsxFile ? xlsxFile : "Todavía no se selecciono ningun archivo"}`,
              type: "info",
              buttons: ["Ok"],
            })
          }
        />
      </section>
      <section className={styles.buttons}>
        <div>
          <label
            htmlFor="preset1"
            className={presetSelected == 1 ? styles.selected : ""}
          >
            1
          </label>
          <label
            htmlFor="preset2"
            className={presetSelected == 2 ? styles.selected : ""}
          >
            2
          </label>
          <label
            htmlFor="preset3"
            className={presetSelected == 3 ? styles.selected : ""}
          >
            3
          </label>
          <label
            htmlFor="preset4"
            className={presetSelected == 4 ? styles.selected : ""}
          >
            4
          </label>
        </div>
        <fieldset>
          <input
            type="radio"
            value={1}
            id="preset1"
            name="preset"
            onChange={loadPreset}
            checked={presetSelected == 1}
          />
          <input
            type="radio"
            value={2}
            id="preset2"
            name="preset"
            onChange={loadPreset}
            checked={presetSelected == 2}
          />
          <input
            type="radio"
            value={3}
            id="preset3"
            name="preset"
            onChange={loadPreset}
            checked={presetSelected == 3}
          />
          <input
            type="radio"
            value={4}
            id="preset4"
            name="preset"
            onChange={loadPreset}
            checked={presetSelected == 4}
          />
        </fieldset>
      </section>
    </main>
  );
}
