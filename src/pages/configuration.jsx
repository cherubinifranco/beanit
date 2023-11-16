import styles from "./styles/configuration.module.css";
import { Button } from "../components/button";
import { Item } from "../components/item";
import { useState, useEffect } from "react";
import { displayDialog } from "../utils";
import { ConfigurationPage as lng } from "../lng/en";
import { dialogInfo as dialog } from "../lng/en";

// This is a future home page, but is not necessary for the moment.

export default function ConfigurationPage() {
  const [ownVariables, updateOwnVariables] = useState([]);
  const [nameV, updateNameV] = useState("");
  const [showPassword, updateShowPassword] = useState(false);
  const [mailInfo, updateMailInfo] = useState({
    mail: "",
    password: "",
    from: "",
  });

  useEffect(() => {
    const ownVariablesLS =
      JSON.parse(localStorage.getItem("ownVariables")) || [];
    const mailInfoLS = JSON.parse(localStorage.getItem("mailConfig")) || {};
    updateOwnVariables(ownVariablesLS);
    updateMailInfo(mailInfoLS);
  }, []);

  const addVariable = (event) => {
    event.preventDefault()
    if (nameV == "") return;
    const exists = ownVariables.some((el) => el[0] == nameV);
    if (exists) return;
    updateOwnVariables((oldArray) => [...oldArray, [nameV, ""]]);
    updateNameV("");
  };

  const deleteVariable = (event, index) => {
    const res = [
      ...ownVariables.slice(0, index),
      ...ownVariables.slice(index + 1),
    ];
    updateOwnVariables(res);
    localStorage.setItem("ownVariables", JSON.stringify(res));
  };

  const handleVariableChange = (event, index, name) => {
    const value = event.target.value;
    const newOwnVariables = ownVariables.map((component, i) => {
      if (i === index) {
        return [name, value];
      } else {
        return component;
      }
    });
    updateOwnVariables(newOwnVariables);
    localStorage.setItem("ownVariables", JSON.stringify(newOwnVariables));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    updateNameV(value);
  };

  const handleMailInfoChange = (event, section) => {
    const value = event.target.value;
    const newMailInfo = {
      mail: mailInfo.mail,
      password: mailInfo.password,
      from: mailInfo.from,
    };
    newMailInfo[section] = value;
    updateMailInfo(newMailInfo);
    localStorage.setItem("mailConfig", JSON.stringify(newMailInfo));
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className="title center">{lng.staticVariables.title}</h1>
        {ownVariables.map((el, index) => (
          <Item
            key={"variable" + index}
            type="input-button"
            title="Delete variable"
            name={el[0]}
            value={el[1]}
            icon="assets/close.png"
            onChange={() => handleVariableChange(event, index, el[0])}
            onClick={() => deleteVariable(event, index)}
            alt="Delete Variable Icon"
          />
        ))}
        <Item
          type="input-submit"
          name=""
          icon="assets/more-accent.png"
          value={nameV}
          onChange={handleInputChange}
          onClick={addVariable}
          title="Add Variable"
          placeholder="Variable Name"
        />
      </section>

      <section className={styles.container}>
        <h1 className="title center">{lng.mailConfig.title}</h1>
        <Item
          type="input-button"
          name={lng.mailConfig.from}
          icon="assets/question.png"
          alt="Delete Variable Icon"
          onClick={() => displayDialog(dialog.senderTitleHow)}
          value={mailInfo.from}
          onChange={() => handleMailInfoChange(event, "from")}
        />
        <Item
          type="input-button"
          title="How this works"
          name={lng.mailConfig.mail}
          value={mailInfo.mail}
          icon="assets/question.png"
          alt="Delete Variable Icon"
          onChange={() => handleMailInfoChange(event, "mail")}
          onClick={() => displayDialog(dialog.mailHow)}
        />
        <Item
          type="input-button"
          showPassword={showPassword}
          title={showPassword ? "Hide Password" : "Show Password"}
          name={lng.mailConfig.password}
          value={mailInfo.password}
          icon={showPassword ? "assets/eye.png" : "assets/eye-open.png"}
          alt="Delete Variable Icon"
          onChange={() => handleMailInfoChange(event, "password")}
          onClick={() => updateShowPassword((current) => !current)}
        />
      </section>
    </main>
  );
}
