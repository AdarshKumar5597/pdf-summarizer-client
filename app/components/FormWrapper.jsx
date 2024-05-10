"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

function AuthForm({ type }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    if (type === "register") {
      if (data.password !== data.confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        return;
      } else {
        setConfirmPasswordError("");
      }
    }
    console.log(data);
    try {
      let response = await fetch(`http://localhost:4000/api/v1/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();

      if (result.success) {
        console.log(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log("error while submitting form", error);
      console.error(error);
    }
  };

  return (
    <div
      className={`z-[5] formShadow bg-gradient-to-b px-[3%] from-black to-[#53597d] ${
        type === "login" ? "h-[55%]" : "h-[75%]"
      } w-[40%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
    >
      <h1 className="p-5 w-full flex items-center justify-center font-bold text-5xl text-[#8fe9f5]">
        {type === "login" ? "Login" : "Register"}
      </h1>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        {type === "register" && (
          <>
            <label className="flex flex-col  font-bold text-sm">
              Username
              <input
                name="username"
                type="text"
                className="p-3 rounded-md bg-[#646992] text-white font-semibold"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                })}
              />
            </label>
          </>
        )}
        <label className="flex flex-col  font-bold text-sm">
          Email
          <input
            type="text"
            name="email"
            className="p-3 rounded-md bg-[#646992] text-white font-semibold"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg text-red-600 text-xs font-semibold">
              Email is required.
            </p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg text-red-600 text-xs font-semibold">
              Email is not valid.
            </p>
          )}
        </label>
        <label className="flex flex-col relative font-bold text-sm">
          Password
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="p-3 rounded-md bg-[#646992] text-white font-semibold"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          ></input>
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg text-red-600 text-xs font-semibold">Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg text-red-600 text-xs font-semibold">
              Password should be at-least 6 characters.
            </p>
          )}
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
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                className="p-3 rounded-md bg-[#646992] text-white font-semibold"
              />
              {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                <p className="errorMsg text-red-600 text-xs font-semibold">Confirm Password is required.</p>
              )}
              {errors.confirmPassword && errors.confirmPassword.type === "minLength" && (
                <p className="errorMsg text-red-600 text-xs font-semibold">
                  Confirm Password should be at-least 6 characters.
                </p>
              )}
              {confirmPasswordError && <p className="errorMsg text-red-600 text-xs font-semibold">{confirmPasswordError}</p>}
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
        <p className="text-white font-bold text-sm">
          Already Have An Account?{" "}
          <span className=" cursor-pointer text-sm font-bold text-[#8fe9f5]">
            <Link href={type === "login" ? "/auth/register" : "/auth/login"}>
              {type === "login" ? "Register" : "Login"}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;