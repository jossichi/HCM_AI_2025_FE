export const parseAudio = (file) => {
  // Giả lập xử lý file âm thanh
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
