"use client";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddFriend from "./AddFriend";

const FirendsSidebar = () => {
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [user, setUser] = useState({
    avatar: "",
    first_name: "",
    last_name: "",
    employment: { title: "" },
    address: { city: "" },
    email: "",
    dob: "",
    gender: "",
  });

  const getUser = async () => {
    const url = "https://random-data-api.com/api/v2/users?response_type=json";

    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const onButtonClickEffect = (index) => {
    const sendMessageButton = document.querySelector(
      "#button" + index.toString()
    );
    sendMessageButton.classList.remove("bg-[#4169E1]");
    sendMessageButton.classList.add("bg-white");
    sendMessageButton.classList.add("text-black");
    setTimeout(() => {
      sendMessageButton.classList.add("bg-[#4169E1]");
      sendMessageButton.classList.remove("bg-white");
      sendMessageButton.classList.remove("text-black");
    }, 200);
  };

    const handleAddFriendOpen = () => {
        setAddFriendOpen(!addFriendOpen);
    }

  return (
    <div className="relative">
      { addFriendOpen &&
        <div className="absolute top-[10%] left-[-100%] z-[10]">
          <AddFriend setAddFriendOpen={setAddFriendOpen}/>
        </div>
      }
      <div className={`w-[20vw] h-full flex flex-col border border-white rounded-t-3xl rounded-b-3xl relative ${addFriendOpen && "blur-sm"}`}>
        <div className="h-[10%] w-full flex items-center justify-between bg-[#1E1F21] p-3 rounded-t-3xl">
          <div className="bg-[#131314] p-2 rounded-full flex items-center justify-center">
            <FaUserFriends />
          </div>
          <div className="flex p-2 justify-evenly gap-5 items-center">
            <IoMdPersonAdd onClick={handleAddFriendOpen}/>
            <LuTimerReset />
            <FaMagnifyingGlass />
          </div>
        </div>

        <div className="h-[90%] max-h-[65vh] flex flex-col bg-[#19191C] overflow-y-scroll">
          {Array.from(Array(10).keys()).map((keys, index) => (
            <div key={index}>
              <div className="flex p-5 gap-3 items-center">
                <div className="rounded-full">
                  <Image
                    src={user.avatar}
                    objectFit="cover"
                    height={40}
                    width={40}
                    alt="User Avatar"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <p className="text-white text-sm">{user.first_name}</p>
                  <button
                    id={"button" + index.toString()}
                    className="sendMessage text-white text-xs bg-[#4169E1] p-1 rounded-lg font-bold font-body px-2"
                    onClick={() => onButtonClickEffect(index)}
                  >
                    Send a message
                  </button>
                </div>
              </div>
              <div className=" bg-gradient-to-r from-blue-800 via-green-400 to-blue-500 h-[2px] w-[90%] mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="h-[10%] w-full flex items-center justify-between bg-[#1E1F21] p-3 rounded-b-3xl">
          <button className="bg-white rounded-lg p-1 flex items-center gap-1 justify-center text-black text-sm font-semibold font-body px-4">
            <IoMdCloseCircleOutline className="h-5 w-5" />
            <p>Close</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirendsSidebar;
