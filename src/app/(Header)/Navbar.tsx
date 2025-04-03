"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, Twitter, LinkedinIcon, File } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sm:flex hidden w-full h-full items-center rounded-2xl z-50 justify-between backdrop-blur-sm px-6 py-2 border border-white bg-black bg-opacity-70 ">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage 
                src="https://github.com/Shiven48.png" 
                alt="PFP" 
                width={3}
                height={3}
              />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black mt-2 border text-gray-400 border-l-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <a
                className="flex items-center justify-center hover:text-white"
                target="_blank"
                href="https://github.com/Shiven48"
              >
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <a
                className="flex items-center justify-center hover:text-white"
                target="_blank"
                href="https://x.com/Shiven1484625"
              >
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <a
                className="flex items-center justify-center hover:text-white"
                target="_blank"
                href="https://www.linkedin.com/in/sheven-royal-47bb71328/"
              >
                <LinkedinIcon className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h3 className="text-white">Shiven Royal</h3>
      </div>

      {/* Center - Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li className="hover:text-gray-400 text-white">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-gray-400 text-white">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-gray-400 text-white">
          <a href="#skills">Skills</a>
        </li>
        <li className="hover:text-gray-400 text-white">
          <a href="#projects">Projects</a>
        </li>
        <li className="hover:text-gray-400 text-white">
          <a href="#contact">Contact</a>
        </li>
      </ul>
        <a 
        href="#contact"
        className="bg-gray-200 h-6 text-black hover:bg-[#4bc5ce] rounded-sm w-32 flex justify-center">
          Let's Connect
        </a>
    </nav>
  );
};

export default Navbar;