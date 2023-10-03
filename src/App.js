import "./App.css";
import HomePage from "./pages/home";
import MailSenderPage from "./pages/mail-sender";
import MessageTemplatePage from "./pages/message-template";
import SupportPage from "./pages/support";
import ConfigurationPage from "./pages/configuration";

import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<MailSenderPage />} />
        <Route path="/supportTicket" element={<SupportPage />} />
        <Route path="/messageTemplate" element={<MessageTemplatePage />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
