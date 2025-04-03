import { ComponentsAndColor } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Component_Color_Mapping:ComponentsAndColor = {
  Navbar: "bg-[#4bc5ce]",
  About: "bg-red-500",
  Skill: "bg-green-500", 
  Project: "bg-pink-500",
} as const;
