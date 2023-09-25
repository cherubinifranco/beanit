import "./App.css";
import "./App.css";
import HomePage from "./pages/home";
import MailSenderPage from "./pages/mail-sender";
import MessageTemplatePage from "./pages/message-template";
import SupportPage from "./pages/support";
import LearnPage from "./pages/learn";
import TestPage from "./pages/test";

import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/supportTicket" element={<SupportPage />} />
        <Route path="/mailSender" element={<MailSenderPage />} />
        <Route path="/messageTemplate" element={<MessageTemplatePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
