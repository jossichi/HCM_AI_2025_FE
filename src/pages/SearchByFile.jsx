import FileUploader from "../components/FileUploader";
import {
  searchByImage,
  searchByClip,
  analyzeVideoHighlights,
} from "../services/chatService";
import { useState } from "react";
import ChatCard from "../components/chat/ChatCard";

const SearchByFile = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (file, method) => {
    setLoading(true);
    try {
      let data = {};
      if (method === "image") data = await searchByImage(file, query);
      if (method === "clip") data = await searchByClip(file);
      if (method === "highlight") data = await analyzeVideoHighlights(file);
      setResults(data.results || []);
    } catch (error) {
      console.error("❌ Search failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-center">
        🔍 Tìm kiếm nội dung video bằng tệp tin
      </h2>

      {/* Input query */}
      <div className="text-center">
        <input
          type="text"
          placeholder="Nhập từ khóa (OCR / audio / object)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FileUploader
          label="📸 Tìm theo hình ảnh"
          accept="image/*"
          onSubmit={(file) => handleSearch(file, "image")}
        />
        <FileUploader
          label="🎞️ Tìm theo đoạn video clip"
          accept="video/*"
          onSubmit={(file) => handleSearch(file, "clip")}
        />
        <FileUploader
          label="🌟 Phân tích điểm nổi bật"
          accept="video/*"
          onSubmit={(file) => handleSearch(file, "highlight")}
        />
      </div>

      {loading && (
        <div className="text-center text-blue-500 text-lg animate-pulse">
          ⏳ Đang xử lý...
        </div>
      )}

      {/* === Hiển thị kết quả bằng ChatCard === */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((res, idx) => (
            <ChatCard key={idx} result={res} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchByFile;
