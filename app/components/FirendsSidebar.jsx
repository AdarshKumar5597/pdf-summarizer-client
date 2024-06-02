"use client";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddFriend from "./AddFriend";
import { useSelector } from "react-redux";
import Loader from "@/app/assets/loader.gif"

const FirendsSidebar = () => {
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [onPendingMode, setOnPendingMode] = useState(false);
  const [onAllFriendsMode, setOnAllFriendsMode] = useState(true);
  const [onSearchMode, setOnSearchMode] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [isSearchFieldDirty, setIsSearchFieldDirty] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [ruser, setUser] = useState({
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

    const allFriendsUrl = "http://localhost:4000/api/v1/friend/getFriends";

    await fetch(allFriendsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Uemail: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          setAllFriends(data.data);
        }
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
    console.log("Add Friend Opened");
    setAddFriendOpen(!addFriendOpen);
  };

  const getPendingRequests = async () => {
    await fetch("http://localhost:4000/api/v1/friend/getFriendRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Uemail: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          setPendingRequests(data.data);
        }
      });
  };

  useEffect(() => {
    if (onPendingMode) {
      getPendingRequests();
    }
  }, [onPendingMode]);

  const handlePendingFriendsButtonClick = () => {
    setOnAllFriendsMode(false);
    setOnPendingMode(true);
    setOnSearchMode(false);
  };

  const handleSearchButtonClick = () => {
    setOnAllFriendsMode(false);
    setOnPendingMode(false);
    setOnSearchMode(true);
  };

  const handleAcceptFriendRequest = async (email) => {
    await fetch("http://localhost:4000/api/v1/friend/acceptRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Uemail: user.email, Femail: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
        }
      });
    window.location.reload();
  };

  const handleRejectFriendRequest = async (email) => {
    await fetch("http://localhost:4000/api/v1/friend/rejectRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Uemail: user.email, Femail: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
        }
      });
    window.location.reload();
  };

  const handleSearchFriendsChange =  (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setIsSearchFieldDirty(false);
      setSearchFriends([]);
      return;
    }
    setIsSearchFieldDirty(true);
    setSearchFriends(
      allFriends.filter((friend) =>
        friend.username.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }

  const imageLoader = () => {
    return <Image src={Loader} alt="User Avatar" height={40} width={40} />;
  }

  return (
    <div className="relative">
      {addFriendOpen && (
        <div className="absolute top-[10%] left-[-100%] z-[10]">
          <AddFriend setAddFriendOpen={setAddFriendOpen} />
        </div>
      )}
      <div
        className={`w-[20vw] h-full flex flex-col border border-white rounded-t-3xl rounded-b-3xl relative ${
          addFriendOpen && "blur-sm"
        }`}
      >
        <div className="h-[10%] w-full flex items-center justify-between bg-[#1E1F21] p-3 rounded-t-3xl">
          <div className="bg-[#131314] p-2 rounded-full flex items-center justify-center">
            <FaUserFriends
              onClick={() => {
                setOnAllFriendsMode(true);
                setOnPendingMode(false);
                setOnSearchMode(false);
              }}
              className="hover:scale-150 duration-200 transition-all"
            />
          </div>
          <div className="flex p-2 justify-evenly gap-5 items-center">
            <IoMdPersonAdd
              onClick={handleAddFriendOpen}
              className=" hover:scale-150 duration-200 transition-all"
            />
            <LuTimerReset
              onClick={handlePendingFriendsButtonClick}
              className=" hover:scale-150 duration-200 transition-all"
            />
            <FaMagnifyingGlass
              className=" hover:scale-110"
              onClick={handleSearchButtonClick}
            />
          </div>
        </div>

        <div className="h-[65vh] max-h-[65vh] flex flex-col bg-[#19191C] overflow-y-scroll">
          {!onPendingMode &&
            !onSearchMode &&
            allFriends.map((friend, index) => (
              <div key={index}>
                <div className="flex p-5 gap-3 items-center">
                  <div className="rounded-full">
                    <Image
                      src={ruser.avatar || Loader}
                      objectFit="cover"
                      height={40}
                      width={40}
                      alt="User Avatar"
                      // loader={imageLoader}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-white text-sm">{friend.username}</p>
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
          {onPendingMode &&
            pendingRequests.length > 0 &&
            pendingRequests.map((pendingUser, index) => (
              <div key={index}>
                <div className="flex p-5 gap-3 items-center">
                  <div className="rounded-full">
                    <Image
                      src={ruser.avatar}
                      objectFit="cover"
                      height={40}
                      width={40}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-start">
                    <p className="text-white text-sm">{pendingUser.username}</p>
                    <div className="flex gap-5">
                      <button
                        className="sendMessage text-white text-xs bg-green-500 hover:bg-green-900 p-1 rounded-lg font-bold font-body px-2"
                        onClick={() =>
                          handleAcceptFriendRequest(pendingUser.email)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="sendMessage text-white text-xs bg-red-600 hover:bg-red-900 p-1 rounded-lg font-bold font-body px-2"
                        onClick={() =>
                          handleRejectFriendRequest(pendingUser.email)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" bg-gradient-to-r from-blue-800 via-green-400 to-blue-500 h-[2px] w-[90%] mx-auto"></div>
              </div>
            ))}
          {onPendingMode && pendingRequests.length === 0 && (
            <div className="flex justify-center items-center h-[50%]">
              <p className="text-white text-lg">No Pending Requests</p>
            </div>
          )}

          {onSearchMode && (
            <div className="flex justify-center items-center p-3 flex-col">
              <sub className=" text-gray-500 font-semibold self-start ml-4 mt-2">
                Search Friends
              </sub>
              <input
                type="text"
                className="input-field text-[#3ebc3e] text-sm font-body px-1 py-2 outline-none border-b-[2px] border-[#2C8C60] font-semibold"
                onChange={handleSearchFriendsChange}
              />
              {
                isSearchFieldDirty && searchFriends.length === 0 && (
                  <div className="flex justify-center items-center h-[50%]">
                    <p className="text-white text-lg">No Friends Found</p>
                  </div>
                )
              }
              {
                searchFriends.length > 0 && searchFriends.map((friend, index) => (
                  <div key={index}>
                    <div className="flex p-5 gap-3 items-center">
                      <div className="rounded-full">
                        <Image
                          src={ruser.avatar}
                          objectFit="cover"
                          height={40}
                          width={40}
                          alt="User Avatar"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-white text-sm">{friend.username}</p>
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
                ))
              }
            </div>
          )}
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
