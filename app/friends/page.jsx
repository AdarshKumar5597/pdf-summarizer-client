"use client";
import FirendsSidebar from "@/app/components/FirendsSidebar";
import FriendAnimation from "@/app/assets/friendAnimationWithoutBg.json";
import Lottie from "lottie-react";
import { useState } from "react";

function Friends() {
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  return (
    <div className={`flex w-full h-[90vh]`}>
      <div className={`w-[70%] flex justify-center items-center p-10`}>
        <div className={`h-full w-full ${ addFriendOpen && "blur-sm" }`}>
          <Lottie animationData={FriendAnimation} loop={true} className="friendAnimation"/>
        </div>
      </div>
      <div className="w-[30%] flex justify-end items-center px-5">
        <FirendsSidebar addFriendOpen={addFriendOpen} setAddFriendOpen={setAddFriendOpen}/>
      </div>
    </div>
  );
}

export default Friends;
 