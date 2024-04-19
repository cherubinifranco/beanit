import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ModalSimple from "../components/ModalSimple";
import { QuestionIcon, Eye, EyeS, BackIcon } from "../components/Icons";
import { sendTestMail } from "../utils";

const TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  LOADING: "loading",
};

export default function ConfiguracionPage() {
  const [mailInfo, updateMailInfo] = useState({ mail: "", password: "" });
  const [showPassword, updateShowPassword] = useState(false);
  const [helpModal, updateHelpModal] = useState(false);
  const [showModal, updateModal] = useState(false);
  const [content, updateContent] = useState(<></>);
  const [modalType, updateModalType] = useState("warning");

  useEffect(() => {
    const mailConfigLS = JSON.parse(localStorage.getItem("mailConfig")) ?? {
      mail: "",
      password: "",
    };
    updateMailInfo(mailConfigLS);
  }, []);

  const toggleModal = (title, type) => {
    updateContent(title);
    updateModalType(type);
    updateModal(true);
  };

  const handleMailInfoChange = (event, section) => {
    const value = event.target.value;
    const newMailInfo = {
      mail: mailInfo.mail,
      password: mailInfo.password,
    };
    newMailInfo[section] = value;
    updateMailInfo(newMailInfo);
    localStorage.setItem("mailConfig", JSON.stringify(newMailInfo));
  };

  async function sendTest(event) {
    const title = localStorage.getItem("titleToSend");
    const message = localStorage.getItem("msjeToSend");
    const xlsxFile = localStorage.getItem("xlsxFile");
    const files = JSON.parse(localStorage.getItem("files")) || []

    const newMailInfo = {
      xlsxFile,
      mailConfig: mailInfo,
      title,
      message,
      files
    };

    toggleModal("Se está enviando el mail de prueba", TYPES.LOADING);

    const data = await sendTestMail(newMailInfo);

    if (typeof data == "string") {
      toggleModal(data, TYPES.WARNING);
      return;
    }

    // data = [[errors], [sended]]
    data[0].length >= 1
      ? toggleModal(
          "Ocurrio un error al enviar el mail, verificar configuración",
          TYPES.WARNING
        )
      : toggleModal("Se envio con exito el mail de prueba", TYPES.SUCCESS);
  }

  return (
    <div>
      <button
        type="button"
        className="flex gap-3 py-2.5 px-5 w-32 text-sm font-bold rounded-lg bg-accent2 text-white hover:bg-accent"
        onClick={() => history.back()}
      >
        {BackIcon}
        Volver
      </button>

      <div className="w-[700px] rounded-lg mt-9">
        <h1 className="text-white font-semibold bg-extracontent p-3 rounded-t-lg">
          Configuración de mail
        </h1>
        <div className="flex flex-col bg-content gap-2 py-2 rounded-b-lg">
          <div className="flex justify-between items-center">
            <label className="border-r border-border w-44 pl-4 text-white font-semibold tracking-wide text-sm">
              Mail
            </label>
            <input
              type="text"
              className="w-full m-1 bg-transparent text-extra2 indent-2"
              value={mailInfo.mail}
              onChange={() => handleMailInfoChange(event, "mail")}
            />
            <button
              type="button"
              className="p-1 mr-2 text-extra2 rounded cursor-pointer hover:bg-border hover:text-white"
              onClick={() => updateHelpModal((current) => !current)}
            >
              {QuestionIcon}
            </button>
          </div>
          <div className="w-full border-t border-border"></div>
          <div className="flex justify-between items-center">
            <label className="border-r border-border w-44 pl-4 text-white font-semibold tracking-wide text-sm">
              Contraseña App
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full m-1 bg-transparent text-extra2 indent-2"
              value={mailInfo.password}
              onChange={() => handleMailInfoChange(event, "password")}
            />
            <button
              type="button"
              className="p-1 mr-2 text-extra2 rounded cursor-pointer hover:bg-border hover:text-white"
              onClick={() => updateShowPassword((current) => !current)}
              title={showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            >
              {showPassword ? EyeS : Eye}
            </button>
          </div>
        </div>
        <button
          type="button"
          className="my-3 py-2.5 px-5 me-2 mb-2 w-48 text-center text-sm font-bold rounded-lg border bg-accent2 text-mainbg border-blue-600 text-white hover:bg-accent"
          onClick={sendTest}
        >
          Envio de prueba
        </button>
        {helpModal && (
          <Modal
            onExit={updateHelpModal}
            title={<h1 className="p-2">Uso del correo</h1>}
          >
            <div className="p-4 flex flex-col gap-2">
              <h1>
                Para poder enviar correos usando la aplicacion se necesita una
                contraseña de aplicacion de Gmail. Para conseguirla se deben
                seguir los siguientes pasos.
              </h1>
              <ul className="list-decimal">
                <li className="m-3">
                  <p className="py-2">
                    Dirigirse a "myaccount.google.com", luego a la seccion de
                    "Seguridad"
                  </p>
                  <img
                    className="px-2 w-full"
                    src="./assets/help1.png"
                    alt="Help"
                  />
                </li>
                <li className="m-3">
                  <p className="py-2">
                    Se ingresa en "Verificación en 2 pasos", en caso de no
                    tenerlo activo se debe activar
                  </p>
                  <img
                    className="px-2 w-full"
                    src="./assets/help2.png"
                    alt="Help"
                  />
                </li>
                <li className="m-3">
                  <p className="py-2">
                    Se baja hasta la ultima opcion que dice "Contraseñas de
                    aplicaciones"
                  </p>
                  <img
                    className="px-2 w-full"
                    src="./assets/help3.png"
                    alt="Help"
                  />
                </li>
                <li className="m-3">
                  <p className="py-2">
                    Al entrar se puede nombrar a la aplicacion que se le va a
                    asignar la contraseña para poder monitorear el uso
                  </p>
                  <img
                    className="px-2 w-full"
                    src="./assets/help4.png"
                    alt="Help"
                  />
                </li>
                <li className="m-3">
                  <p className="py-2">
                    Una vez ingresado un nombre, se revela la contraseña
                    asociada y esa es la contraseña que se va a usar en esta
                    aplicacion
                  </p>
                  <img
                    className="px-2 w-full"
                    src="./assets/help5.png"
                    alt="Help"
                  />
                </li>
              </ul>
              <p className="text-center">
                Esta aplicacion no almacena ningun tipo de dato.
              </p>
              <p className="text-center">
                Toda información que se guarda se hace de manera local, por lo
                que fuera de la computadora donde este no se puede acceder.
              </p>
            </div>
          </Modal>
        )}
        {showModal && (
        <ModalSimple title={content} onExit={updateModal} type={modalType} />
      )}
      </div>
    </div>
  );
}
