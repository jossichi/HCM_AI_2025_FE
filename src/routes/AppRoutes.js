import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "../pages/ChatPage";
import { ChatProvider } from "../context/ChatContext";
import SearchByFile from "../pages/SearchByFile";
import UploadVideo from "../pages/UploadVideo";
const AppRoutes = () => (
  <ChatProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ChatInterface />} />{" "}
        <Route path="/file-search" element={<SearchByFile />} />{" "}
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  </ChatProvider>
);

export default AppRoutes;
