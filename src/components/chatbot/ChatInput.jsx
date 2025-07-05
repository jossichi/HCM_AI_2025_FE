import { useState } from "react";
import { useChat } from "../hooks/useChat";

export default function ChatInput() {
  const [text, setText] = useState("");
  const { sendMessage } = useChat();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSend} className="chat-input-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button type="submit" className="chat-send-button">
        Send
      </button>
    </form>
  );
}

