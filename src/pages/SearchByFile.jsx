import FileUploader from "../components/FileUploader";
import {
  searchByImage,
  searchByClip,
  analyzeVideoHighlights,
} from "../services/chatService";
import { useState } from "react";

const SearchByFile = () => {
  const [results, setResults] = useState([]);

  const handleImageSearch = async (file) => {
    const data = await searchByImage(file);
    setResults(data.results);
  };

  const handleClipSearch = async (file) => {
    const data = await searchByClip(file);
    setResults(data.results);
  };

  const handleHighlightSearch = async (file) => {
    const data = await analyzeVideoHighlights(file);
    setResults(data.results);
  };

  return (
    <div className="search-file-page">
      <h2>🔍 Tìm kiếm video bằng tệp tin</h2>

      <FileUploader
        label="📸 Tìm theo hình ảnh"
        accept="image/*"
        onSubmit={handleImageSearch}
      />

      <FileUploader
        label="🎞️ Tìm theo đoạn video clip"
        accept="video/*"
        onSubmit={handleClipSearch}
      />

      <FileUploader
        label="🌟 Phân tích điểm nổi bật trong video"
        accept="video/*"
        onSubmit={handleHighlightSearch}
      />

      {results.length > 0 && (
        <div className="results-section">
          <h3>Kết quả:</h3>
          <ul>
            {results.map((res, idx) => (
              <li key={idx}>
                <strong>🎬 Video:</strong> {res.video_name} |{" "}
                <strong>⏱️ Thời gian:</strong> {res.timestamp}s |{" "}
                <strong>Score:</strong> {res.score.toFixed(3)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchByFile;
