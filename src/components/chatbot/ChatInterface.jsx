import { useChat } from "../../context/ChatContext";
import { useState, useRef, useEffect } from "react";
import ChatCard from "../chat/ChatCard";
import "./../assets/chatinterface.scss";

const ChatInterface = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">🤖 AI Trợ Lý – Video Search</header>

      <main className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}>
            {msg.sender === "bot" && Array.isArray(msg.text) ? (
              msg.text.map((r, i) =>
                typeof r === "string" ? (
                  <div key={i}>{r}</div>
                ) : (
                  <ChatCard key={i} result={r} />
                )
              )
            ) : (
              <div>{msg.text}</div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <form onSubmit={handleSubmit} className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Nhập câu hỏi..."
        />
        <button type="submit" className="chat-button">
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
