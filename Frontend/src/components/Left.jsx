import React from "react";
import Input from "./Input";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="h-screen bg-black flex flex-col">
      <Input />
      <div className="flex-grow overflow-y-hidden"> 
      <Users/>
      </div>
      <div className="bg-black p-4">
        <Logout />
      </div>
    </div>
  );
}

export default Left;