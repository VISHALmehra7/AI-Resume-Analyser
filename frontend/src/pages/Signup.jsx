import React from "react";
import { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { RiLoginCircleFill } from "react-icons/ri";

import { authStore } from "../zustand/authStore.js";

const Signup = () => {
  const { signup, isLoading } = authStore();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!signupInput.name || !signupInput.email || !signupInput.password)
      return;
    try {
      await signup(signupInput);
      setSignupInput({ name: "", email: "", password: "" });
    } catch (error) {}
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100 flex items-center justify-center">
      <div className="flex flex-col px-4 py-2  bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 lg:px-6">
        <h1 className="text-center text-xl text-blue-600">Signup</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center pt-2 text-sm gap-5 lg:gap-6"
        >
          <input
            type="text"
            placeholder="Name"
            className="focus:outline-none  border-b border-gray-400 focus:border-b focus:border-blue-400 w-full"
            value={signupInput.name}
            onChange={(e) =>
              setSignupInput({ ...signupInput, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="focus:outline-none  border-b border-gray-400  w-full"
            value={signupInput.email}
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="focus:outline-none  border-b border-gray-400  w-full"
            value={signupInput.password}
            onChange={(e) =>
              setSignupInput({ ...signupInput, password: e.target.value })
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
          Already have an account ?{" "}
          <span className="text-blue-600 underline">Login</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
