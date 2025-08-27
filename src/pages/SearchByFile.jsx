import FileUploader from "../components/FileUploader";
import {
  searchByImage,
  searchByClip,
  analyzeVideoHighlights,
} from "../services/chatService";
import { useState } from "react";

const SearchByFile = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (file, method) => {
    setLoading(true);
    try {
      let data = {};
      if (method === "image") data = await searchByImage(file);
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

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg p-4 border border-gray-100">
              <div className="font-semibold text-lg text-gray-700 mb-1">
                🎬 {res.video_name}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                ⏱️ <strong>Thời gian:</strong> {res.timestamp}s
              </div>
              <div className="text-sm text-gray-600 mb-1">
                📊 <strong>Score:</strong> {res.score?.toFixed(3)}
              </div>
              {res.frame_name && (
                <div className="text-sm text-gray-500 truncate">
                  🖼️ Frame: {res.frame_name}
                </div>
              )}
              {res.audio_text && (
                <p className="mt-2 text-sm italic text-gray-500">
                  🗣️ "{res.audio_text}"
                </p>
              )}
              {res.ocr_texts && (
                <p className="mt-1 text-sm text-gray-500">
                  📄 OCR: {res.ocr_texts}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchByFile;
