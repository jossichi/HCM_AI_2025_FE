import { useChat } from "../../context/ChatContext";
import { useState, useRef, useEffect } from "react";
import ChatCard from "../chat/ChatCard";
import "./../assets/chatinterface.scss";
import {
  searchByImage,
  searchByClip,
  analyzeVideoHighlights,
} from "../../services/chatService";

const ChatInterface = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const chatEndRef = useRef(null);

  // Lắng nghe drag & drop toàn màn hình
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragEnter = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Tạo preview file
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Submit chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    setLoading(true);

    try {
      if (file) {
        const fileType = file.type;
        const url = URL.createObjectURL(file);
        const type = fileType.startsWith("image/") ? "image" : "video";

        await sendMessage({ type, url });

        let data = {};
        if (type === "image") {
          data = await searchByImage(file);
        } else {
          const isShort = file.size < 10 * 1024 * 1024;
          data = isShort
            ? await searchByClip(file)
            : await analyzeVideoHighlights(file);
        }

        if (data?.results?.length > 0) {
          await sendMessage({ type: "media-results", results: data.results });
        }
      }

      if (input.trim()) {
        await sendMessage(input.trim());
        setInput("");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }

    setFile(null);
    setPreviewUrl("");
    setLoading(false);
  };

  return (
    <div className={`chat-container ${isDragging ? "drag-active" : ""}`}>
      <header className="chat-header">🤖 AI Trợ Lý – Video Search</header>

      <section className="chat-body">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === "user" ? "user" : "bot"}`}>
              {msg.type === "image" ? (
                <img src={msg.url} alt="User upload" className="chat-media" />
              ) : msg.type === "video" ? (
                <video src={msg.url} controls className="chat-media" />
              ) : msg.type === "media-results" ? (
                <div className="bot-results">
                  {msg.results.map((res, i) => (
                    <div key={i}>
                      {res.frame_name && <div>🖼️ Frame: {res.frame_name}</div>}
                      <ChatCard result={res} />
                    </div>
                  ))}
                </div>
              ) : msg.sender === "bot" && Array.isArray(msg.text) ? (
                msg.text.map((r, i) =>
                  typeof r === "string" ? (
                    <div key={i}>{r}</div>
                  ) : (
                    <div key={i}>
                      {r.frame_name && <div>🖼️ Frame: {r.frame_name}</div>}
                      <ChatCard result={r} />
                    </div>
                  )
                )
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-area">
          {previewUrl && file && (
            <div className="preview-container">
              {file.type.startsWith("image/") ? (
                <img src={previewUrl} alt="preview" />
              ) : (
                <video src={previewUrl} controls />
              )}
            </div>
          )}

          <label htmlFor="file-upload" className="file-upload-label">
            ＋
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const selected = e.target.files[0];
              if (selected) setFile(selected);
            }}
            className="file-input"
          />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
            placeholder="Nhập câu hỏi hoặc chọn tệp..."
          />
          <button type="submit" className="chat-button" disabled={loading}>
            {loading ? "⏳" : "Gửi"}
          </button>
        </form>
      </section>

      {isDragging && (
        <div className="drag-overlay">
          <div className="drag-text">📂 Thả file vào bất kỳ đâu để tải lên</div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
