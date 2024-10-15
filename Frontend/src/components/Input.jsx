import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useStore from "../zustand/zustand.js";
import useGetAllUsers from "../Context/getAllUsers.jsx"

function Input() {
  const [search, setSearch] = useState('')
  const { setSelectedConversation} = useStore()
  const {allUsers} = useGetAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchedUser = allUsers.find((user)=> {
      if(user.username.toLowerCase() === search.toLowerCase()){
        return user;
      }
      else{
        return null
      }
    })
    if(!searchedUser) return;
    setSelectedConversation(searchedUser)
    setSearch("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-4 space-x-3">
        <label className="flex items-center gap-2 p-1 rounded-xl bg-slate-800 w-[80%]">
          <input
            type="text"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            className="bg-transparent rounded-md grow outline-none p-2 font-semibold text-lg"
            placeholder="Search"
          />
        </label>
        <button type="submit">
          <FaSearch className="text-5xl rounded-full p-2 hover:bg-slate-900" />
        </button>
      </div>
    </form>
  );
}

export default Input;
