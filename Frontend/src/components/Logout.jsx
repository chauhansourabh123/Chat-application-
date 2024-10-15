import React, { useContext } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context.jsx"

function Logout() {
  const {setLoggedInUser} = useContext(Context)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");

      toast("Logout Successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TbLogout2 onClick={handleLogout} className="cursor-pointer text-4xl " />
  );
}

export default Logout;
