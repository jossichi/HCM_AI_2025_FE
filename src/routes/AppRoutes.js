import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "../pages/ChatPage";
import { ChatProvider } from "../context/ChatContext";

const AppRoutes = () => (
  <ChatProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
      </Routes>
    </Router>
  </ChatProvider>
);

export default AppRoutes;
