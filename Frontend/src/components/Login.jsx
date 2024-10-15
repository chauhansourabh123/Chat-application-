import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Context/Context.jsx";

function Login() {
  const { setLoggedInUser } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        "/api/v1/user/login",
        userInfo,
        { withCredentials: true }
      );

      setLoggedInUser(response.data.data);
      toast.success("Login successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="sm:w-96 w-full border border-slate-400 p-4 rounded-xl">
        <h1 className="text-2xl text-center tracking-wider font-bold">
          Chat<span className="text-green-600">App</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="mb-6 mt-8 text-xl font-bold">Login</h2>

          {/* Email Input */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="grow"
              {...register("email", { required: "Email is required." })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          {/* Password Input */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="grow"
              {...register("password", { required: "Password is required." })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <div className="flex items-center justify-between">
            <p>
              New User?{" "}
              <Link className="text-blue-700" to="/register">
                Signup
              </Link>
            </p>
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold px-4 py-2 rounded-xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
