import axios from "axios";
import { API_URL } from "../constants";
const BASE_URL = `${API_URL}/location`;

// =============== TEXT QUERY ===============
export const sendMessageToServer = async (userMessage) => {
  try {
    const response = await axios.post(`${BASE_URL}/search`, {
      user_query: userMessage,
      input_type: "video_name",
      input_reference: "text_input",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi message:", error);
    throw error;
  }
};

export const chatService = {
  sendMessage: async (userMessage) => {
    const response = await sendMessageToServer(userMessage);
    return response;
  },
};

// =============== IMAGE SEARCH ===============
export const searchByImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("query", ""); // optional

  const res = await axios.post(`${BASE_URL}/search/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// =============== CLIP SEARCH ===============
export const searchByClip = async (clipFile) => {
  const formData = new FormData();
  formData.append("file", clipFile);

  const res = await axios.post(`${BASE_URL}/search/clip`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// =============== VIDEO HIGHLIGHT ANALYSIS ===============
export const analyzeVideoHighlights = async (videoFile, videoName = "") => {
  const formData = new FormData();
  formData.append("file", videoFile);
  formData.append("video_name", videoName); // optional

  const res = await axios.post(`${BASE_URL}/analyze/highlight`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
