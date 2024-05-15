"use client"
import FormWrapper from "@/app/components/FormWrapper";
import { useState } from "react";

function LoginPage() {
  const [hoveredTiles, setHoveredTiles] = useState([]);

  const handleTileHover = (index) => {
    if (!hoveredTiles.includes(index) && hoveredTiles.length < 10) {
      setHoveredTiles((prev) => [...prev, index]);
    }
    else {
      setHoveredTiles([]);
      setHoveredTiles((prev) => [...prev, index]);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="bg-black flex flex-wrap gap-1 relative overflow-hidden">
        {[...Array(100).keys()].map((i) => (
          <div
            key={i}
            className={`bg-[#0e0c1a] tiles w-[calc(10vw-4px)] z-[1] h-[10vh] ${
              hoveredTiles.includes(i) ? "hoverAnimation" : ""
            }`}
            onMouseEnter={() => handleTileHover(i)}
          ></div>
        ))}
        <div className="h-[50vh] topToBottom w-[100vw] absolute bg-[#6f8ee9] top-0 left-0"></div>
      </div>
      <FormWrapper type={"login"} />
    </div>
  );
}

export default LoginPage;
