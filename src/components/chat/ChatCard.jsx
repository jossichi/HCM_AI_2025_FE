import styles from "../../assets/chatcard.module.scss";
import { motion } from "framer-motion";

const ChatCard = ({ result }) => {
  return (
    <motion.div
      className={`${styles.chatBubble} bot`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}>
      <div className={styles.avatar}>🤖</div>
      <div className={styles.message}>
        Tôi đã tìm thấy trong video <strong>{result.video_name}</strong> tại{" "}
        <strong>
          {typeof result.timestamp === "number"
            ? result.timestamp.toFixed(2)
            : result.timestamp}
          s
        </strong>
        , khung hình <code>{result.frame_name}</code> với điểm tương đồng{" "}
        <strong>{result.score?.toFixed(2) ?? "N/A"}</strong>.
        <br />
        📝 OCR:{" "}
        <em>
          {Array.isArray(result.ocr_texts) && result.ocr_texts.length > 0
            ? result.ocr_texts
                .map(
                  (t, i) =>
                    `${t.text} (conf: ${t.confidence.toFixed(2)}) [x:${
                      t.bbox.x
                    }, y:${t.bbox.y}, w:${t.bbox.width}, h:${t.bbox.height}]`
                )
                .join("; ")
            : "(không có OCR)"}
        </em>
        <br />
        🔊 Âm thanh: {result.audio_text || "—"}
        <br />
        🧍 Đối tượng phát hiện:{" "}
        {Array.isArray(result.objects) && result.objects.length > 0 ? (
          <ul>
            {result.objects.map((obj, i) => (
              <li key={i}>
                {obj.label} ({obj.confidence.toFixed(2)}) [x:{obj.bbox.x}, y:
                {obj.bbox.y}, w:{obj.bbox.width}, h:{obj.bbox.height}]
              </li>
            ))}
          </ul>
        ) : (
          "Không có"
        )}
      </div>
    </motion.div>
  );
};

export default ChatCard;
