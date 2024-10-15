import React, { useContext } from "react";
import useStore from "../zustand/zustand.js";
import { SocketContext } from "../Context/SocketContext.jsx";

function ChatUser() {
  const { selectedConversation } = useStore();
  const {onlineUsers} = useContext(SocketContext)
  const isOnline = onlineUsers.includes(selectedConversation?._id)

  return (
    <div className="flex items-center justify-center w-full bg-slate-700">
      {selectedConversation ? (
        <div className="px-8 py-3 flex gap-x-4 items-center">
          <div className={`avatar ${isOnline? "online": "offline"}`}>
            <div className="w-14 rounded-full">
              <img src="./profile.png" alt="User Avatar" />
            </div>
          </div>
          <div>
            <p className="font-bold capitalize">
              {selectedConversation.username || "User"}
            </p>
            <span>{isOnline ? "Online": "Offline"}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatUser;
