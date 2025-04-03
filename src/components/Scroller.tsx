"use client";
import { useEffect, useState } from "react";

const Scroll = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrolledArea =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrolledArea / height) * 100;
    setPercentage(Math.max(0, Math.min(100, scrollPercentage))); // Clamp between 0 and 100
  };

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="w-full h-2 p-0 m-0">
        <div
          className="h-1 bg-red-400 transition-all duration-200 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scroll;