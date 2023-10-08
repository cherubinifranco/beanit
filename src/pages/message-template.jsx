import styles from "./styles/message-template.module.css";
import { Button } from "../components/button";
import { useState, useEffect } from "react";
import {
  applyTemplate,
  displayDialog,
  loadTemplateDataFromXlsx,
} from "../utils";
import { MessageTemplatePage as lng } from "../lng/es";

export default function MessageTemplatePage() {
  const [presetSelected, updatePresetSelected] = useState(
    localStorage.getItem("presetSelected") ?? 1
  );
  const [xlsxFile, updatexlsxFile] = useState("");
  const [msjeText, updateText] = useState("");
  const [titleText, updateTitle] = useState("");
  const [templateData, updateTemplateData] = useState({
    noFilters: "noFilters",
  });

  useEffect(() => {
    const xlsxFileLS = localStorage.getItem("xlsxFile") ?? "";
    const titleTextLS =
      localStorage.getItem(`presetTitle${presetSelected}`) ?? "";

    const msjeTextLS =
      localStorage.getItem(`presetMsje${presetSelected}`) ?? "";
    const templateDataLS = JSON.parse(localStorage.getItem("templateData")) ?? {};
    updateTemplateData(templateDataLS);
    updatexlsxFile(xlsxFileLS);
    updateTitle(titleTextLS);
    updateText(msjeTextLS);
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

  const openVariables = async () => {
    await loadVariables();
    const ownVariablesLS = JSON.parse(localStorage.getItem("ownVariables")) || {}
    const newObj = {...templateData, ...ownVariablesLS}
    await displayDialog({
      title: "Variables Cargadas",
      message: `Las variables cargadas son: ${Object.keys(newObj).join(
        ", "
      )}.\nPara utilizar las variables hay que encerrarlas en llaves. Ej: {Email}\nXLSX cargado: ${
        xlsxFile ? xlsxFile : "Todavía no se selecciono ningun archivo"
      }`,
      type: "info",
      buttons: ["Ok"],
    });
  };

  const loadVariables = async () => {
    const data = await loadTemplateDataFromXlsx(xlsxFile);
    if (data) {
      localStorage.setItem("templateData", JSON.stringify(data[1]));
      updateTemplateData(data[1]);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className="title">{lng.messageBox.title}</h1>
        <div className={styles.box}>
          <input
            type="text"
            placeholder={lng.messageBox.matterPlaceholder}
            className="other-left-input"
            value={titleText}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder={lng.messageBox.messagePlaceholder}
            type="text"
            value={msjeText}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className={styles.container}>
        <h1 className="title">{lng.messagePreview.title}</h1>
        <div className={styles.box}>
          <textarea type="text" value={previewMessage} readOnly />
        </div>
      </section>
      <section className={styles.buttons}>
        <Button text={lng.buttons.return} style="secondary" onClick={handleBack} />
        <Button
          text={lng.buttons.variables}
          style="secondary"
          onClick={openVariables}
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
