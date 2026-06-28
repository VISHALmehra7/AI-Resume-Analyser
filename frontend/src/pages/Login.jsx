import React from "react";
import { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { RiLoginCircleFill } from "react-icons/ri";
import { authStore } from "../zustand/authStore";



const Login = () => {
  const { login, isLoading } = authStore();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loginInput.email || !loginInput.password) return;
     
    try {
      await login(loginInput);
      setLoginInput({ email: "", password: "" });
    } catch (error) {}
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 flex items-center justify-center">
      <div className="flex flex-col px-4 py-2  bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 lg:px-6">
        <h1 className="text-center text-xl text-blue-600">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center pt-2 text-sm gap-5 lg:gap-6"
        >
          <input
            type="email"
            placeholder="Email"
            className="focus:outline-none  border-b border-gray-400  w-full"
            value={loginInput.email}
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="focus:outline-none  border-b border-gray-400  w-full"
            value={loginInput.password}
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full ${isLoading ? "bg-red-600" : "to-blue-600"} bg-blue-600 text-white rounded-md py-1 flex items-center justify-center lg:py-2 `}
          >
            {isLoading ? <RiLoginCircleFill /> : <IoPersonAdd />}
          </button>
        </form>
        <div className="text-gray-400 text-sm mt-4 lg:mt-6 ">
          Don't have an account ?{" "}
          <span className="text-blue-600 underline">Signup</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
