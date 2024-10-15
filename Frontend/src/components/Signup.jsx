import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Context/Context.jsx";

function Signup() {

  const {setLoggedInUser} = useContext(Context)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post(
        "/api/v1/user/register",
        userInfo,
        { withCredentials: true }
      );

      setLoggedInUser(response.data.data)
      console.log(response.data.data);
      toast.success("Signup successful", {autoClose: 1000});
      setTimeout(() => {
        navigate("/"); // Redirect to login page
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
          <h2 className="mb-6 mt-8 text-xl font-bold">Signup</h2>

          {/* Username Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Username"
              className="grow"
              {...register("username", { required: "Username is required." })}
            />
          </label>
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          {/* Email Input */}
          <label className="input input-bordered flex items-center gap-2">
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

          {/* Confirm Password Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="grow"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) => {
                  const { password } = getValues();
                  return value === password || "Passwords do not match";
                },
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}

          <div className="flex items-center justify-between">
            <p>
              Have an account?{" "}
              <Link className="text-blue-500" to="/login">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
