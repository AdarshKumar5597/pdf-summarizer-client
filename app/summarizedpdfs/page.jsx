"use client";
import React, { useEffect, useState } from "react";
import SummarizedPdfCard from "../components/SummarizedPdfCard";
import { useSelector } from "react-redux";
import FirendsSidebar from "../components/FirendsSidebar";

const SummarizedPdfs = () => {
  const { user } = useSelector((state) => state.auth);
  const [summarizedPdfs, setSummarizedPdfs] = useState([]);
  const [sharePdf, setSharePdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState({});

  async function fetchSummarizedPdfs() {
    console.log("User in summarizedPdfs: ", user);
    try {
      let response = await fetch(
        `http://localhost:4000/getSummarizedPdfByUserId`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            userId: user?._id,
          },
        }
      );

      let result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSummarizedPdfs().then((result) => {
      setSummarizedPdfs(result.data);
    });
  }, []);

  console.log("sharePdf: ", sharePdf);

  return (
    <div className={`w-[100vw] h-[90vh] flex bg-black relative`}>
      <div
        className={`container flex flex-wrap justify-evenly gap-5 p-5 w-full h-full max-h-[90vh]  ${
          sharePdf ? "blur-sm overflow-y-hidden" : "overflow-y-scroll"
        }`}
      >
        {summarizedPdfs.map((pdf, index) => (
          <SummarizedPdfCard
            key={index}
            pdf={pdf}
            user={user}
            setSharePdf={setSharePdf}
            setSelectedPdf={setSelectedPdf}
          />
        ))}
      </div>

      {sharePdf && (
        <div className="absolute top-0 right-[5vw]">
          <FirendsSidebar setSharePdf={setSharePdf} sharePdf={sharePdf} selectedPdf={selectedPdf} />
        </div>
      )}
    </div>
  );
};

export default SummarizedPdfs;
