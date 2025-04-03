"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import ReactMarkdown with SSR disabled
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

const experiences = [
  {
    title: "Frontend Development",
    type: "Personal Project",
    period: "Feb 2025 - Present",
    description: `-Worked on the core frontend of the website using React.js , material UI , typescript , \n\n -Learned lazy loading of components in react(lodash) \n\n  \n\n  -global state using zustand and useContext \n\n
    \n\n-used zod for securing environment variables \n\n -Used UI libraries like ShadCN and modifiying them as needed. `,
    color: "bg-primary",
  },
  {
    title: "Full Stack Development",
    type: "Personal Project",
    period: "Feb 2025 - Present",
    description: `Contributed heavily in making the backend of the application ,\n\n -Made reliable apis and parsed the content to get the necessary values.\n\n -Used a single Schema design to generalize all the medias \n\n -Support multiple social medias \n\n -Used ORM like drizzle to generate quesries faster and more reliable \n\n -Used langchain for creating embeddings of media for personalised recommendation and Searching\n\n`,
    color: "bg-primary",
  },
];

const ExperienceCard = ({
  title,
  type,
  period,
  description,
  index,
  color,
}: {
  title: string;
  type: string;
  period: string;
  description: string;
  index: number;
  color: string;
}) => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
      scale: 0.9,
      rotateY: -10,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.2 } }}
      className={`${color} shadow-xl rounded-lg p-6 mb-8 w-5/6 ${
        index % 2 === 0 ? "ml-auto" : "mr-auto"
      } relative z-10 cursor-pointer overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-90 z-0"
        whileHover={{ opacity: 0.95, transition: { duration: 0.2 } }}
      />
      <motion.div className="relative z-10">
        <motion.h3
          variants={contentVariants}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {title}
        </motion.h3>
        <motion.h4
          variants={contentVariants}
          className="text-xl font-semibold text-gray-700 mb-1"
        >
          {type}
        </motion.h4>
        <motion.p
          variants={contentVariants}
          className="text-md text-gray-600 mb-3"
        >
          {period}
        </motion.p>
        <motion.div variants={contentVariants} className="text-gray-700">
          <ReactMarkdown>{description}</ReactMarkdown>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const TimelineDot = ({ index }: { index: number }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full z-20 shadow-lg"
  >
    <motion.div
      className="w-full h-full rounded-full bg-white"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
    />
  </motion.div>
);

const AnimatedTimeline = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleY }}
      className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary origin-top z-0"
    />
  );
};

const AnimatedExperiencePortfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#f8fafc] dark:bg-[#0f172a] py-16">
      <div className="max-w-4xl mx-auto px-8 pb-4">
        <motion.div
          id="career"
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 0, opacity: 0 }}
          transition={{ type: "tween", duration: 3 }}
          viewport={{ once: true }}
          className="text-xl text-center"
        >
          My Career Journey
        </motion.div>
        <div className="text-center space-y-1 pb-6">
          <h1 className="text-center text-4xl md:text-5xl sm:text-5xl font-semibold capitalize md:mt-0">
            Staying with the problems long enough
          </h1>
          <p className="text-gray-500">not intelligent, just persistent</p>
        </div>

        <div className="relative">
          <AnimatedTimeline />
          {experiences.map((exp, index) => (
            <React.Fragment key={index}>
              <ExperienceCard {...exp} index={index} />
              <TimelineDot index={index} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedExperiencePortfolio;