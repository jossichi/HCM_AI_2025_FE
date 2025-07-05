import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/location/search`;

export const sendMessageToServer = async (userMessage) => {
  try {
    const response = await axios.post(API_URL, {
      user_query: userMessage,
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
export const getLocationSuggestions = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    throw error;
  }
};
export const getLocationDetails = async (locationId) => {
  try {
    const response = await axios.get(`${API_URL}/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
};
