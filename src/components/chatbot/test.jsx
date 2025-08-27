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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    setLoading(true);

    try {
      if (file) {
        const fileType = file.type;
        let data = {};
        if (fileType.startsWith("image/")) {
          data = await searchByImage(file);
        } else if (fileType.startsWith("video/")) {
          const isShort = file.size < 10 * 1024 * 1024;
          data = isShort
            ? await searchByClip(file)
            : await analyzeVideoHighlights(file);
        }
        setResults(data.results || []);
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
    <div className="chat-container">
      <header className="chat-header">🤖 AI Trợ Lý – Video Search</header>

      <section className="chat-body">
        <div className="chat-messages">
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
          ))}{" "}
          {results.length > 0 && (
            <div className="message bot">
              <div className="bot-results">
                <div className="result-grid">
                  {results.map((res, idx) => (
                    <div key={idx} className="result-card">
                      <div className="title">🎬 {res.video_name}</div>
                      <div>
                        ⏱️ <strong>Thời gian:</strong> {res.timestamp}s
                      </div>
                      <div>
                        📊 <strong>Score:</strong> {res.score?.toFixed(3)}
                      </div>
                      {res.frame_name && <div>🖼️ Frame: {res.frame_name}</div>}
                      {res.audio_text && (
                        <div className="text-italic">🗣️ "{res.audio_text}"</div>
                      )}
                      {res.ocr_texts && <div>📄 OCR: {res.ocr_texts}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default ChatInterface;
