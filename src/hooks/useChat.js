import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const useChat = () => useContext(ChatContext);
