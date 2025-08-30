import { useState } from "react";
import styles from "../../assets/chatcard.module.scss";
import { motion, AnimatePresence } from "framer-motion"; // Thêm AnimatePresence

// === Helpers (Giữ nguyên) ===
const getVideoUrlWithTimestamp = (videoName, timestamp) => {
  const videoUrl = `http://localhost:8000/video/${videoName}.mp4`;
  return `${videoUrl}#t=${timestamp}`;
};

const decodeFrameHashToImage = (frameHash, videoName) => {
  if (!frameHash || !videoName) return null;
  if (frameHash.startsWith("data:image")) {
    return frameHash;
  }
  const cleanFrameName = frameHash.replace(/\.jpg$/i, "");
  return `http://localhost:8000/frames/${videoName}/${cleanFrameName}.jpg`;
};

// === Component chính ===
const ChatCard = ({ result }) => {
  const [activeTab, setActiveTab] = useState("ocr");
  // NEW: State để quản lý việc hiển thị video
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const frameSrc = decodeFrameHashToImage(result.frame_name, result.video_name);
  const videoUrl = getVideoUrlWithTimestamp(
    result.video_name,
    result.timestamp
  );

  // NEW: Hàm để bật/tắt video
  const toggleVideoPlayer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  // ... (Các component con OcrTab, ObjectsTab, AudioTab giữ nguyên) ...
  const OcrTab = () => (
    <div className={styles.tabContent}>
      {Array.isArray(result.ocr_texts) && result.ocr_texts.length > 0 ? (
        <ul className={styles.dataList}>
          {result.ocr_texts.map((t, i) => (
            <li key={i}>
              <span className={styles.dataText}>"{t.text}"</span>
              <span className={styles.dataConfidence}>
                Độ chính xác: {(t.confidence * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noData}>Không tìm thấy văn bản.</p>
      )}
    </div>
  );

  const ObjectsTab = () => (
    <div className={styles.tabContent}>
      {Array.isArray(result.objects) && result.objects.length > 0 ? (
        <ul className={styles.dataList}>
          {result.objects.map((obj, i) => (
            <li key={i}>
              <span className={styles.dataLabel}>{obj.label}</span>
              <div className={styles.confidenceBar}>
                <div
                  style={{ width: `${obj.confidence * 100}%` }}
                  className={styles.confidenceFill}
                />
              </div>
              <span className={styles.dataConfidence}>
                {(obj.confidence * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noData}>Không phát hiện đối tượng nào.</p>
      )}
    </div>
  );

  const AudioTab = () => (
    <div className={styles.tabContent}>
      <p className={styles.audioText}>
        {result.audio_text || "Không có nội dung âm thanh tại thời điểm này."}
      </p>
    </div>
  );

  return (
    <motion.div
      className={styles.chatCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className={styles.avatar}>🤖</div>

      {/* NEW: Thêm một div bọc ngoài để quản lý layout dọc */}
      <div className={styles.mainContent}>
        {/* Container 2 cột hiện tại */}
        <div className={styles.cardContainer}>
          {/* === CỘT TRÁI: HÌNH ẢNH === */}
          <div className={styles.visualColumn}>
            {frameSrc && (
              <img
                src={frameSrc}
                alt="Matching frame"
                className={styles.frameImage}
                loading="lazy"
                onClick={toggleVideoPlayer} // Nhấn vào ảnh cũng có thể mở video
                title="Nhấn để xem video"
              />
            )}
          </div>

          {/* === CỘT PHẢI: THÔNG TIN === */}
          <div className={styles.infoColumn}>
            {/* --- Phần tóm tắt --- */}
            <div className={styles.summarySection}>
              <p className={styles.summaryItem}>
                🎬 <strong>Video:</strong> {result.video_name}
              </p>
              <p className={styles.summaryItem}>
                ⏱️ <strong>Thời gian:</strong>{" "}
                {result.timestamp?.toFixed(2) ?? "N/A"}s
              </p>
              <p className={styles.summaryItem}>
                🎯 <strong>Tương đồng:</strong>{" "}
                {result.score?.toFixed(2) ?? "N/A"}
              </p>
              {/* NEW: Nút để mở/đóng video player */}
              <button
                onClick={toggleVideoPlayer}
                className={styles.watchVideoButton}>
                {isVideoVisible ? "Ẩn Video" : "▶️ Xem Video"}
              </button>
            </div>

            {/* --- Phần Tabs --- */}
            <div className={styles.tabs}>
              {/* ... (Các nút tab giữ nguyên) ... */}
              <button
                className={`${styles.tabButton} ${
                  activeTab === "ocr" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("ocr")}>
                📝 Văn bản (OCR)
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "objects" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("objects")}>
                🧍 Đối tượng
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "audio" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("audio")}>
                🔊 Âm thanh
              </button>
            </div>

            {/* --- Nội dung của Tab --- */}
            {activeTab === "ocr" && <OcrTab />}
            {activeTab === "objects" && <ObjectsTab />}
            {activeTab === "audio" && <AudioTab />}
          </div>
        </div>

        {/* NEW: Khu vực hiển thị Video Player */}
        <AnimatePresence>
          {isVideoVisible && (
            <motion.div
              className={styles.videoPlayerSection}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <video
                className={styles.videoPlayer}
                src={videoUrl}
                controls
                autoPlay
                muted // Nên muted để không làm phiền người dùng
                playsInline
                poster={frameSrc} // Hiển thị frame trong lúc video tải
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatCard;
