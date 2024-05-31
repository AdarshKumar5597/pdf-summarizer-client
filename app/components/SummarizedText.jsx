"use client";
import jsPDF from "jspdf";
import React from "react";
import { MdPictureAsPdf } from "react-icons/md";

const SummarizedText = ({ summarizedText, summarizedPdf }) => {
  const convertToPDF = async () => {
    const doc = new jsPDF();
    doc.text(summarizedText, 10, 10);
    doc.save(`${summarizedPdf.summarizedName}`);
  };

  return (
    <div className="h-full w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="w-full h-[10%] font-bold text-lg">SUMMARY</h1>
        {summarizedText && (
          <MdPictureAsPdf
            className="h-[20px] w-[20px] cursor-pointer"
            title="Download"
            onClick={convertToPDF}
          />
        )}
      </div>
      <p className="w-full h-[90%] font-body overflow-y-scroll max-h-[90%]">
        {summarizedText ? summarizedText : "Upload a pdf file to summarize"}
      </p>
    </div>
  );
};

export default SummarizedText;
