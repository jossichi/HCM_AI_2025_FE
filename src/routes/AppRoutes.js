import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "../pages/ChatPage";
import { ChatProvider } from "../context/ChatContext";
import SearchByFile from "../pages/SearchByFile";

const AppRoutes = () => (
  <ChatProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ChatInterface />} />{" "}
        <Route path="/file-search" element={<SearchByFile />} />
      </Routes>
    </Router>
  </ChatProvider>
);

export default AppRoutes;
