"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline, IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import goddess from "@/app/assets/danmachiGoddes-removebg.png";
import Image from "next/image";
import { GiCrossMark } from "react-icons/gi";
import { IoSendOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const AddFriend = ({ setAddFriendOpen }) => {
  const [friendFound, setFriendFound] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);

  const onCrossClickEffect = () => {
    let cross = document.querySelector(".cross");

    cross.classList.add("animate-spin");
    cross.style.color = "#FFD700";

    setTimeout(() => {
      cross.classList.remove("animate-spin");
      cross.style.color = "#2C8C60";
      setAddFriendOpen(false);
    }, 500);
  };

  const sendEffect = () => {
    let sendReq = document.querySelector(".sendReq");

    sendReq.style.boxShadow = "0 0 10px red";

    setTimeout(() => {
      sendReq.style.boxShadow = "none";
    }, 200);
  };

  const onSubmit = async (data) => {
    let loadingToastId = toast.loading("Searching Friend...");
    try {
      data = { ...data, Uemail: user?.email };

      await fetch("http://localhost:4000//api/v1/friend/searchFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            loadingToastId.dismiss();
            toast.success("Friend Found");
            setFriendFound(data.data);
          } else {
            loadingToastId.dismiss();
            toast.error(data.msg);
          }
        });
    } catch (error) {
      loadingToastId.dismiss();
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="w-[30vw] h-[40vh] p-5 bg-[#1A1F2A] rounded-lg relative border-[2px] border-[#2C8C60] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
      <form
        className="flex items-start h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[30%] flex items-center justify-center h-full">
          <Image
            src={goddess}
            className="absolute h-[90%] w-[90%] left-[-40%] goddess drop-shadow-[#2C8C60]"
          />
        </div>

        <div className="flex flex-col items-center justify-evenly w-[70%]">
          <div className="flex w-full justify-between">
            <h1 className="font-bold text-3xl font-body text-white">
              Add Friends
            </h1>
            <GiCrossMark
              color="#2C8C60"
              onClick={onCrossClickEffect}
              className="cross"
            />
          </div>

          <sub className=" text-gray-500 font-semibold self-start ml-4 mt-2">
            Enter your friend's Email
          </sub>

          <label htmlFor="friendEmail" className="flex flex-col gap-2 w-[90%]">
            <p></p>
            <input
              type="email"
              name="Femail"
              className="bg-inherit text-[#3ebc3e] text-sm font-body px-1 py-2 outline-none border-b-[2px] border-[#2C8C60] font-semibold"
              {...register("fEmail", {
                required: "This field is required",
              })}
            />
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg text-red-600 text-xs font-semibold">
                Email is not valid.
              </p>
            )}

            <button className=" p-2 bg-[#2C8C60] rounded-md text-white font-bold font-body">
              Find
            </button>
          </label>

          { friendFound &&
            <div className="w-[20vw] border-[2px] border-[#2C8C60] rounded-md p-5 absolute bottom-5 left-12 flex items-center justify-between">
              <p className="max-w-[12vw] flex items-center text-white font-body font-semibold overflow-x-scroll whitespace-nowrap scrollbar-hide">
                {
                    friendFound?.username
                }
              </p>
              <div className="flex gap-5">
                <IoSendOutline
                  className="text-red-600 rotate-[-45deg] sendReq"
                  onClick={sendEffect}
                 />
                <IoMdCloseCircleOutline className="h-5 w-5" />
              </div>
            </div>
          }
        </div>
      </form>

      <div className="w-[100px] h-[100px] absolute bottom-[-5%] right-[-5%] rounded-full bg-[#2C8C60] flex justify-center items-center">
        <IoMdPersonAdd color="white" className="h-[30%] w-[30%]" />
      </div>
    </div>
  );
};

export default AddFriend;
