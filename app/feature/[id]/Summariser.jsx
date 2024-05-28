import FileInput from "@/app/components/FileInput";
import bgSummarizer from "../../assets/summarizerBg.jpg";
import Image from "next/image";
import SummarizedText from "@/app/components/SummarizedText";
function Summariser() {
  return (
    <div className="w-full flex items-center">
      <div className="w-1/2 flex justify-center items-center">
        <FileInput />
      </div>
      <div className="w-1/2 h-[90vh] relative flex items-center justify-center">
        <Image
          src={bgSummarizer}
          className="h-full w-full absolute bg-contain z-[-1] rounded-md"
        />
        <div className="w-[90%] h-[90%] bg-white-20 rounded-md backdrop-blur-[10px] border-white-20">
          <SummarizedText />
        </div>
      </div>
    </div>
  );
}

export default Summariser;
