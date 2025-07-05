import styles from "../../assets/chatcard.module.scss";

const ChatCard = ({ result }) => {
  return (
    <div className={`${styles.card} dark`}>
      <div className={styles.section}>
        <strong>🎞 Frame:</strong> <span>{result.frame_name}</span>
      </div>
      <div className={styles.section}>
        <strong>🕐 Timestamp:</strong> <span>{result.timestamp}</span>
      </div>
      <div className={styles.section}>
        <strong>🎯 Score:</strong>{" "}
        <span>{result.score?.toFixed(2) ?? "N/A"}</span>
      </div>
      <div className={styles.section}>
        <strong>🔊 Audio:</strong> <span>{result.audio_text}</span>
      </div>
      <div className={styles.section}>
        <strong>🔠 OCR:</strong> <span>{result.ocr_text}</span>
      </div>
      <div className={styles.section}>
        <strong>🎬 Segment:</strong> <span>{result.video_segment}</span>
      </div>
      <div className={styles.objects}>
        <strong>🧍 Detected Objects:</strong>
        <ul>
          {result.objects.map((obj, i) => (
            <li key={i}>
              {obj.label} ({obj.confidence.toFixed(2)}) –{" "}
              <code>
                bbox: x={obj.bbox.x}, y={obj.bbox.y}, w={obj.bbox.width}, h=
                {obj.bbox.height}
              </code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatCard;
