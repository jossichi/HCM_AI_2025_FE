import { createContext, useContext, useState } from "react";
import { sendMessageToServer } from "../services/chatService";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    const userMsg = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await sendMessageToServer(message);

      const botMsg = {
        sender: "bot",
        text:
          response?.results?.length > 0
            ? response.results
            : ["Không có kết quả phù hợp."],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: ["Đã xảy ra lỗi, vui lòng thử lại."] },
      ]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
