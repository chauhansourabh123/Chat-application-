import React, { useContext } from "react";
import { Context } from "../Context/Context";

function Message({ data }) {

  const { loggedInUser } = useContext(Context);
  const isSender = data.senderId === loggedInUser._id;

  return (
    <div>
      <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
        <div className={`chat-bubble ${isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
          {data.message}
        </div>
      </div>
    </div>
  );
}

export default Message;
