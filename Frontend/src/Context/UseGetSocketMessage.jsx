import React, { useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext.jsx";
import useStore from "../zustand/zustand.js";
import audio from "../../public/audio.mp3"

function UseGetSocketMessage() {
  const { socket } = useContext(SocketContext);
  const { setMessages } = useStore();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages(newMessage);
      const notification = new Audio(audio)
      notification.play()
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
      
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessages]);
}

export default UseGetSocketMessage;
