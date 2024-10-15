import React, { useContext, useState } from "react";
import { Context } from "../Context/Context.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

export function DefaultSpinner() {
  return <Spinner />;
}

function Profile() {
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const [profileImage, setProfileImage] = useState(
    loggedInUser.avatar || "./profile.png"
  );
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(loggedInUser.username || "");

  const handleClick = () => {
    document.querySelector("#form input").click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      setLoading(true);
      try {
        const response = await axios.post(
          "/api/v1/user/changeProfileImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoggedInUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "/api/v1/user/changeUsername",
        {
          username: newUsername,
        },
        { withCredentials: true }
      );
      setLoggedInUser(response.data.data);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating username:", error);
      setLoading(false);
    }
  };

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-4">
      <div className="px-4 py-2 bg-blue-800 rounded-lg flex items-center gap-2 w-40">
        <FaArrowLeft />
        <Link to="/" className="">
          Go to home
        </Link>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="border border-white rounded-lg bg-slate-800 w-96 flex flex-col items-center p-4">
          {loading ? (
            <DefaultSpinner className="animate-spin h-12 w-12" />
          ) : (
            <div className="relative">
              <img
                className="w-24 h-24 object-cover object-top rounded-full"
                src={loggedInUser.avatar || "./profile.png"}
                alt=""
              />
              <FaPlusCircle
                className="text-3xl absolute bottom-0 right-0 cursor-pointer text-white"
                onClick={handleClick}
              />
              <form hidden id="form" encType="multipart/form-data">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleChange}
                />
              </form>
            </div>
          )}

          <div className="mt-10 w-full">
            <div className="border border-slate-700 rounded-lg px-2 py-1 mt-2 flex items-center justify-between">
              {isEditing ? (
                <form
                  onSubmit={handleUsernameSubmit}
                  className="flex items-center gap-16"
                >
                  <input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    className="bg-slate-700 text-white px-2 py-1 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white bg-slate-600 rounded-lg px-4 py-1"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h2 className="font-semibold capitalize text-lg tracking-wider">
                    {loggedInUser.username}
                  </h2>
                  <MdEdit
                    className="hover:bg-black p-1 text-3xl rounded-full cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  />
                </>
              )}
            </div>
            <h2 className="font-semibold border border-slate-700 rounded-lg px-2 py-1 mt-2 text-lg tracking-wider">
              {loggedInUser.email}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
