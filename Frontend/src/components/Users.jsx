import React from "react";
import User from "./User";
import "../index.css";
import useGetAllUsers from "../Context/getAllUsers.jsx";

function Users() {
  const { allUsers, loading, error } = useGetAllUsers(); // Destructure the data from the hook

  if (loading) {
    return <div>Loading users...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  if (!allUsers || allUsers.length === 0) {
    return <div>No users found.</div>; // Handle case where there are no users
  }

  return (
    <div className="px-1 mt-4">
      <h1 className="bg-slate-800 px-5 py-2 rounded-lg font-bold text-white">
        Users
      </h1>
      <div className="hide-scrollbar mt-4 max-h-[70vh] overflow-y-scroll">
        {allUsers.map((user) => (
          <User key={user._id} data={user} /> // Pass user data to User component
        ))}
      </div>
    </div>
  );
}

export default Users;
