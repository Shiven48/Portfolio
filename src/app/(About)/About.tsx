"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight, Component, Server, Asterisk } from "lucide-react";
import DialogModal from "@/components/ui/dialogmodal";

const About = () => {
  return (
    <>
      <motion.div
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 200, opacity: 0 }}
        transition={{ type: "tween", duration: 2 }}
        className="text-xl text-center text-gray-400 bottom-1 absolute left-1/2 transition-all -translate-x-1/2 -z-10"
      >
        About
      </motion.div>
        {/* <h1 className="space-y-1 relative z-10 left-1/2 transition-all -translate-x-1/2 text-center text-6xl font-semibold text-gray-400">
          PASSION FUELS PURPOSE.
        </h1> */}
      <div className="flex space-y-3 sm:space-y-1 md:space-y-0 flex-col md:flex-row justify-evenly items-center mt-20 relative z-10">
        <motion.div
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          initial={{ opacity: 0.2, x: -200, y: 0 }}
          transition={{ type: "tween", duration: 1.2 }}
          viewport={{ once: true }}
          className="cursor-pointer w-3/4 md:w-1/4 h-1/6 rounded-2xl shadow-xl"
        >
          <Card className="bg-background/50 backdrop-blur-md bg-opacity-70 rounded-xl shadow-white shadow-md border border-gray-400 md:p-8 md:mb-16 hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Front-End Development</CardTitle>
              <CardDescription>Designing cool websites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Component />
                <h2 className="text-gray-600 dark:text-gray-300">
                  I can try to make put your imagination into reality
                </h2>
              </div>
            </CardContent>
            <DialogModal
              title="Front-End Development"
              check1="Integrating with APIs to fetch and display dynamic content."
              check2="Staying updated with the latest front-end technologies and trends."
              check3="Implementing interactive features like buttons, forms, and animations."
            >
              <CardFooter>
                <div className="flex items-center justify-center">
                  <h3 className="hover:animate-pulse">View more</h3>
                  <MoveRight className="w-5 ml-1 text-gray-500" />
                </div>
              </CardFooter>
            </DialogModal>
          </Card>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0.2, y: 200 }}
          transition={{ type: "tween", duration: 1.2 }}
          viewport={{ once: true }}
          className="  cursor-pointer w-3/4  md:w-1/4 h-1/6 rounded-2xl shadow-xl"
        >
          <Card className="bg-background/50 backdrop-blur-md bg-opacity-70 rounded-xl shadow-white shadow-md border border-gray-400 md:p-8 md:mb-16  hover:-translate-y-1">
            <CardHeader className="">
              <CardTitle>Back-end development</CardTitle>
              <CardDescription>Handling your data and API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ">
                <Server />
                <h2 className="text-gray-600 dark:text-gray-300">
                  Handling API calls or Putting user data into databases
                </h2>
              </div>
            </CardContent>
            <DialogModal
              title="Back-end development"
              check1="Implementing user authentication and authorization systems."
              check2="Building APIs to enable communication between front-end and back-end systems."
              check3="Integrating third-party services and libraries into the back-end infrastructure."
            >
              <CardFooter>
                <div className="flex items-center justify-center">
                  {" "}
                  <h3 className="hover:animate-pulse">View more</h3>
                  <MoveRight className="w-5 ml-1 text-gray-500 " />
                </div>
              </CardFooter>
            </DialogModal>
          </Card>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          initial={{ opacity: 0.2, x: 200, y: 0 }}
          transition={{ type: "tween", duration: 1.2 }}
          viewport={{ once: true }}
          className="  cursor-pointer w-3/4  md:w-1/4 h-1/6 rounded-2xl shadow-xl"
        >
          <Card className="bg-background/50 backdrop-blur-md bg-opacity-70 rounded-xl shadow-white shadow-md border border-gray-400 md:p-8 md:mb-16 hover:-translate-y-1">
            <CardHeader className="">
              <CardTitle>Full-Stack Development</CardTitle>
              <CardDescription>Creating Websites to scale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ">
                <Asterisk />
                <h2 className="text-gray-600 dark:text-gray-300">
                  Fully-fledged client and server interactive app
                </h2>
              </div>
            </CardContent>
            <DialogModal
              title="Full-Stack Development"
              check1="Building complete web applications from initial concept to deployment."
              check2="Ensuring consistent design and user experience across the entire application."
              check3="Implementing and maintaining databases, data storage, and retrieval."
            >
              <CardFooter>
                <div className="flex items-center justify-center">
                  {" "}
                  <h3 className="hover:animate-pulse">View more</h3>
                  <MoveRight className="w-5 ml-1 text-gray-500 " />
                </div>
              </CardFooter>
            </DialogModal>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default About;
