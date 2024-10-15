import React, { useContext, useEffect } from "react";
import Left from "../Left";
import Right from "../Right";
import { Context } from "../../Context/Context.jsx";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const { loggedInUser } = useContext(Context);

  useEffect(() => {
    if (!loggedInUser) {
      toast.info("Log in to access this page.", {
        autoClose: 1000,
      });
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="drawer md:drawer-open h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex">
        <Right />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" bg-base-200 text-base-content">
          <Left />
        </ul>
      </div>
    </div>
  );
}

export default Home;
