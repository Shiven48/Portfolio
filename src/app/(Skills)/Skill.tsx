"use client";
import { motion } from "framer-motion";
import React from "react";

const SimpleSkillAnimation = () => {
  const skills = [
    "React", "TypeScript", "Next.js", "TailwindCSS",
    "Spring Boot", "Hibernate", "Drizzle", "Docker"
  ];

  return (
    <div className="relative small-skills-layout h-64 bottom-72 translate-x-1/2 w-full items-center justify-center my-16">
      <div className="w-screen mb-48">
        <p className="font-light text-6xl small-text-props w-full relative -translate-x-1/2 bottom-8 left-4">
         <span className=" text-gray-400 small-text text-opacity-5 text-stroke-blue">
            The more Curious you are the more Skillful you can get
         </span>
        </p>
      </div>
      <motion.div
        className="absolute z-10 rounded-full bg-blue-500 w-20 h-20 flex text-black items-center justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.div>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        // Reduce radius for small screens
        const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill}
            className="absolute bg-gray-800 text-white px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x, y }}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SimpleSkillAnimation;