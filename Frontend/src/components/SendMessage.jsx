import React, { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { Context } from "../Context/Context.jsx";
import useSendMessages from "../Context/useSendMessages.jsx";
import { Link } from "react-router-dom";

function SendMessage() {
  const { sendMessages } = useSendMessages();
  const { loggedInUser } = useContext(Context);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessages(message);
    setMessage(""); // Clear the input after sending
  };

  return (
    <div className="absolute flex justify-between gap-4 bottom-0 py-3 px-1 left-0 bg-slate-800 w-full">
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <label className="flex items-center gap-2 rounded-xl lg:w-[60%] w-full">
            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none bg-gray-800 border w-full border-gray-600 p-2 rounded-md grow outline-none"
              placeholder="Type your message"
            />
          </label>
          <button type="submit">
            <MdSend
              className={`lg:text-5xl text-3xl rounded-md lg:p-2 opacity-50 hover:bg-slate-900`}
            />
          </button>
        </div>
      </form>
      <div className="flex items-center">
        <Link to="/profile">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={`${
              loggedInUser.avatar ? loggedInUser.avatar : "./profile.png"
            }`}
            alt=""
          />
        </Link>
        <span className="capitalize text-xs">{loggedInUser.username}</span>
      </div>
    </div>
  );
}

export default SendMessage;
