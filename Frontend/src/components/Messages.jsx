import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../Context/useGetMessages.jsx";
import UseGetSocketMessage from "../Context/UseGetSocketMessage.jsx";

function Messages() {
  const { messages, loading, error } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!Array.isArray(messages) || messages.length === 0) {
    return <div className="text-center mt-60">Say hi to start the conversation</div>;
  }

  return (
    <div className="mt-6 h-[80vh] overflow-y-auto px-4 py-12">
      <UseGetSocketMessage />
      {messages.map((message, index) => (
        <Message key={`${message._id}-${index}`} data={message} />
      ))}
      <div ref={lastMessageRef}></div>
    </div>
  );
}

export default Messages;
