import React, { useState } from "react";
import useStore from "../zustand/zustand.js";
import axios from "axios";

function useSendMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedConversation, setMessages } = useStore();

  const sendMessages = async (message) => {
    setLoading(true);
    setError(null);

    try {
      if (!selectedConversation || !selectedConversation._id) return;

      const res = await axios.post(
        `/api/v1/message/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );
      
      setMessages(res.data.data)
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessages, loading, error };
}

export default useSendMessages;
