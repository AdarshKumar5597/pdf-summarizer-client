"use client";
import React, { useEffect, useState } from "react";
import SummarizedPdfCard from "../components/SummarizedPdfCard";
import { useSelector } from "react-redux";

const SummarizedPdfs = () => {
  const { user } = useSelector((state) => state.auth);
  const [summarizedPdfs, setSummarizedPdfs] = useState([]);

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
  return (
    <div className="w-[100vw] h-[90vh] flex bg-black">
      <div className="container flex flex-wrap justify-evenly gap-5 p-5 w-full h-full max-h-[90vh] overflow-y-scroll">
        {
            summarizedPdfs.map((pdf, index) => (
                <SummarizedPdfCard key={index} pdf={pdf} user={user}/>
            ))
        }
      </div>
    </div>
  );
};

export default SummarizedPdfs;
