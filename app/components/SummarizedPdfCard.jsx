import React from "react";
import pdfIcon from "@/app/assets/pdf.png";
import Image from "next/image";
import { FaShare } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";

const SummarizedPdfCard = ({ pdf, user }) => {
  const convertToPDF = async () => {
    const doc = new jsPDF();
    const text = pdf.summarizedContent;
    const lines = doc.splitTextToSize(text, 180); // Split text into lines that fit the page width
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let cursorY = margin;

    lines.forEach((line, index) => {
      if (cursorY + 10 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += 10; // Move cursorY for next line
    });

    doc.save(`${pdf.summarizedName}`);
  };

  const openPdf = () => {
    const doc = new jsPDF();
    const text = pdf.summarizedContent;
    const lines = doc.splitTextToSize(text, 180); // Split text into lines that fit the page width
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let cursorY = margin;

    lines.forEach((line) => {
      if (cursorY + 10 > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += 10;
    });

    // Generate the PDF as a blob
    const pdfBlob = doc.output("blob");

    // Create a new Blob URL
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Open the Blob URL in a new tab
    window.open(blobUrl, "_blank");
  };

  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle5">
            <Image
              src={pdfIcon}
              alt="pdf"
              width={40}
              height={40}
              objectFit="cover"
            />
          </span>
        </div>
        <div className="glass"></div>
        <div className="content">
          <span className="title">{pdf.summarizedName}</span>
          <span className="text">
            Created From: {pdf.originalName} <br />
            Created By: {user.username} <br />
            Created At: {pdf.createdAt.substring(0, 10)}
          </span>
        </div>
        <div className="bottom">
          <div className="social-buttons-container">
            <button className="social-button .social-button1" title="share">
              <FaShare color="#00894D" />
            </button>
            <button className="social-button .social-button2" title="open">
              <MdOutlineArrowOutward color="#00894D" className=" font-bold" onClick={openPdf}/>
            </button>
            <button className="social-button .social-button2" title="download">
              <IoMdDownload
                color="#00894D"
                className=" font-bold"
                onClick={convertToPDF}
              />
            </button>
          </div>
          <div className="view-more">
            <button className="view-more-button">View more</button>
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizedPdfCard;
