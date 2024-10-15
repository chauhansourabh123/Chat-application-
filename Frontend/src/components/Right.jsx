import React, { useContext, useEffect, useRef, useState } from "react";
import ChatUser from "./ChatUser.jsx";
import Messages from "./Messages.jsx";
import SendMessage from "./SendMessage.jsx";
import { FaBars } from "react-icons/fa";

function Right() {
  return (
    <div className="w-full h-screen bg-slate-900 relative">
      <label
        htmlFor="my-drawer"
        className="btn btn-ghost drawer-button md:hidden absolute left-5"
      >
        <FaBars className="text-3xl"/>
      </label>

      <ChatUser />

      <Messages />

      {/* if no user selected then it will be showed */}
      {/* <div className="text-center mt-60">
        <p>Welcome! nick chauhan</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          amet, dolores{" "}
        </p>
      </div> */}

      <SendMessage />
    </div>
  );
}

export default Right;
