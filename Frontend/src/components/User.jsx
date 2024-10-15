import React, { useContext } from "react";
import useStore from "../zustand/zustand.js";
import { SocketContext } from "../Context/SocketContext.jsx";

function User({ data }) {
  const { selectedConversation, setSelectedConversation } = useStore();
  const isSelected = selectedConversation?._id === data._id;
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(data._id);
  
  
  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setSelectedConversation(data);
  };

  return (
    <div
      onClick={handleClick}
      className={`mt-1 duration-200 cursor-pointer hover:bg-slate-800`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick(e)}
      aria-pressed={isSelected}
    >
      <div className="px-8 py-3 flex gap-x-4 items-center">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full relative">
            <img src={`${data.avatar? data.avatar:"./profile.png"}`} alt={`${data.username}'s profile`} />
            {isOnline && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-600 rounded-full border border-white"></span>
            )}
          </div>
        </div>
        <div>
          <p className="font-bold capitalize">{data.username}</p>
          <p>{data.email}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
