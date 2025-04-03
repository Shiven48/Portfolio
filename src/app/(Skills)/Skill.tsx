"use client";
import { motion } from "framer-motion";
import React from "react";

const SimpleSkillAnimation = () => {
  const skills = [
    "React", "TypeScript", "Next.js", "TailwindCSS", 
    "Spring Boot", "Hibernate", "Drizzle", "Docker"
  ];

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <div className="w-screen h-10 flex justify-center relative bottom-96 gap-10">
      <p className="dark:text-gray-400 font-light text-xl">
            The more Curious you are the more Skills you get
      </p>
      </div>
      <motion.div
        className="absolute z-10 rounded-full bg-blue-500 w-20 h-20 flex text-black items-center bottom-64 justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.div>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * 175;
        const y = Math.sin(angle) * 175;

        return (
          <motion.div
            key={skill}
            className="absolute bg-gray-800 text-white px-4 py-2 rounded-lg bottom-64 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x, y }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ scale: 1 }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SimpleSkillAnimation;