import React from "react";

const Chatbot = () => {
  return (
    <div className=" h-[87vh] w-full bg-[#000] flex">
      <div className="w-[20%] flex flex-col h-full items-center">
        <div className="h-[calc(10%-2px)]"></div>
        <div className="h-[2px] bg-[#2A2F38] w-[90%] rounded-md"></div>
        <div className="h-[80%]"></div>
        <div className="h-[2px] bg-[#2A2F38] w-[90%] rounded-md"></div>
        <div className="h-[calc(10%-2px)]"></div>
      </div>
      <div className="w-[80%] px-2">
        <div className="rounded-r-md bg-[#2B2D31] w-full h-full flex flex-col items-center">
          <div className="h-[calc(10%-2px)]"></div>
          <div className="h-[2px] bg-[#000] w-[97%] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
