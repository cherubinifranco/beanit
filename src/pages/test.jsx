import styles from "./styles/sender.module.css";
import { Button } from "../components/button";
import { Item } from "../components/item";
import { useState, useEffect } from "react";
import { fetchAllData, loadTemplateDataFromXlsx } from "../utils";

export default function TestPage() {
  const [xlsxFile, updateXlsxFile] = useState("");
  const [xlsxData, updateXlsxData] = useState("");
  const [templateData, updateTemplateData] = useState("no data");
  useEffect(() => {
    const xlsxDataLS = JSON.parse(localStorage.getItem("xlsxData")) ?? [];
    const xlsxFileLS = localStorage.getItem("xlsxFile") ?? "";
    updateXlsxFile(xlsxFileLS);
    updateXlsxData(xlsxDataLS);
  }, []);

  const updateData = async () => {
    const data = await fetchAllData(xlsxFile);
    updateXlsxData(data);
  };

  const getTemplateData = async () => {
    const data = await loadTemplateDataFromXlsx(xlsxFile);
    if (data) {
      updateTemplateData(data);
    }
  };

  return (
    <div>
      <h1>FILE: {xlsxFile}</h1>

      <p>{JSON.stringify(xlsxData)}</p>
      <Button onClick={updateData} />

      <h1>Template Data</h1>

      <p>{JSON.stringify(templateData)}</p>
      <Button text="templateData" onClick={getTemplateData} />
    </div>
  );
}
