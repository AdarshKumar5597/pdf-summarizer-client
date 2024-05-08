"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function AuthForm({ type }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  }

  return (
    <div
      className={`z-[5] formShadow bg-gradient-to-b px-[3%] from-black to-[#53597d] ${
        type === "login" ? "h-[55%]" : "h-[75%]"
      } w-[40%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
    >
      <h1 className="p-5 w-full flex items-center justify-center font-bold text-5xl text-[#8fe9f5]">
        {type === "login" ? "Login" : "Register"}
      </h1>
      <form className="flex flex-col gap-y-4">
        {type === "register" && (
          <>
            <label className="flex flex-col  font-bold text-sm">Username
            <input className="p-3 rounded-md bg-[#646992] text-white font-semibold" />
            </label>
          </>
        )}
        <label className="flex flex-col  font-bold text-sm">Email
        <input
          type="text"
          className="p-3 rounded-md bg-[#646992] text-white font-semibold"
        />
        </label>
        <label className="flex flex-col relative font-bold text-sm">
          Password
          <input
            type={showPassword ? "text" : "password"}
            className="p-3 rounded-md bg-[#646992] text-white font-semibold"
          ></input>
          <div
            onClick={handleShowPassword}
            className="absolute top-1/2 transform -trasnlate-y-1/2 text-xl right-4 text-[#8fe9f5] cursor-pointer"
          >
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </label>
        {type === "register" && (
          <>
            <label className="flex flex-col relative font-bold text-sm">
              Confirm Password
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="p-3 rounded-md bg-[#646992] text-white font-semibold"
              />
              <div
                onClick={handleConfirmShowPassword}
                className="absolute top-1/2 transform -trasnlate-y-1/2 text-xl right-4 text-[#8fe9f5] cursor-pointer"
              >
                {!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </label>
          </>
        )}
        <button className="p-3 bg-[#8fe9f5] rounded-md font-bold text-sm">
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div className="w-full h-auto p-3">
        <p className="text-white font-bold text-sm">Already Have An Account? <span className=" cursor-pointer text-sm font-bold text-[#8fe9f5]"><Link href={type === "login" ? "/auth/register" : "/auth/login"}>{type === "login" ? "Register" :  "Login"}</Link></span></p>
      </div>
    </div>
  );
}

export default AuthForm;
