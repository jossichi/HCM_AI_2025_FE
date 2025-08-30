import axios from "axios";
import { API_URL } from "../constants";

export const uploadAgriVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  const res = await axios.post(`${API_URL}/agri/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const uploadSunVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  const res = await axios.post(`${API_URL}/sun/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
