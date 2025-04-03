"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LeafyGreen, MoveDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
const Herobody = () => {
  return (
    <>
      <div
        id="home"
        className="w-full mt-10 md:mt-0 md:h-[80vh] sm:h-[60vh] flex flex-col-reverse sm:flex-row space-y-10 md:space-y-0 "
      >
        <div className="sm:w-1/2 flex flex-col items-center justify-center space-y-1">
          <h3 className="md:text-5xl mt-10 sm:text-4xl text-3xl font-semibold">
            Shiven Royal👋
          </h3>
          <div className="flex items-center justify-center space-x-1 mb-10 md:mb-0 sm:mb-5 ">
            <h5 className="w-24 font-extralight h-0.5 bg-gray-400 "></h5>
            <h4 className="md:text-lg">Fullstack Developer</h4>
          </div>
          <div className="space-y-7">
            <p className="text-white dark:text-gray-400 font-light ">
              Learning to solve problems and be helpful to others with coding{" "}
              <br className="md:hidden" /> and designing using{" "}
              <br className="hidden md:block" /> awesome technologies.I also
              love to explore <br /> be it life,places or coding.
            </p>
            <Button className="hover:bg-secondary hover:border-black hover:bg-gray-400 hover:text-black border borfer duration-150 transition ease-out">
              <a href="#contact" className="flex items-center">
                <h3 >Wanna Contact?</h3>
                <LeafyGreen className="ml-2 h-6 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="sm:w-1/2 md:h-[80vh] h-[30vh] flex items-center justify-center mb-10 md:mb-0">
          <Image 
          className="md:mt-32 image mb-6 md:mb-0"
          width={250}
          height={250}
          src="/images/prof.png"
          alt="PFP"
        />
        </div>
      </div>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 1 }}
        initial={{ y: 200, opacity: 0.2 }}
        className="flex items-center mt-20 md:mt-0  sm:mt-4   justify-center  space-x-2 "
      >
        <div className="flex justify-center md:h-16 border-4 h-14  border-primary md:w-8 w-8 rounded-full">
          <div className="w-0.5 h-3 mt-2 animate-bounce md:border-4 border-2 border-primary"></div>
        </div>
        <div className="flex items-center">
          Scroll down <MoveDown className="mr-2 h-4 w-4 animate-pulse" />
        </div>
      </motion.div>
    </>
  );
};

export default Herobody;
