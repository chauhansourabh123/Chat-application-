import React, { useEffect, useState } from "react";
import useStore from "../zustand/zustand.js";
import axios from "axios";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversation } = useStore();

  useEffect(() => {
    const getData = async () => {
      if (!selectedConversation || !selectedConversation._id) return;

      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/message/get/${selectedConversation._id}`, {
          withCredentials: true,
        });
        
        setMessages(res.data.data);
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred while fetching messages.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [setMessages, selectedConversation]);

  return { messages, loading, error };
}

export default useGetMessages;
