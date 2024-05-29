"use client";
import FileInput from "@/app/components/FileInput";
import bgSummarizer from "../../assets/summarizerBg.jpg";
import Image from "next/image";
import SummarizedText from "@/app/components/SummarizedText";
import { useState } from "react";
function Summariser() {
  const [summarizedText, setSummarizedText] = useState("");
  return (
    <div className="w-full flex items-center">
      <div className="w-1/2 flex justify-center items-center">
        <FileInput summarizedText={summarizedText} setSummarizedText={setSummarizedText}/>
      </div>
      <div className="w-1/2 h-[90vh] relative flex items-center justify-center">
        <Image
          src={bgSummarizer}
          className="h-full w-full absolute bg-contain z-[-1] rounded-md"
        />
        <div className="w-[90%] h-[90%] bg-white-20 rounded-md backdrop-blur-[10px] border-white-20">
          <SummarizedText summarizedText={summarizedText}/>
        </div>
      </div>
    </div>
  );
}

export default Summariser;
