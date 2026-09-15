import { ComponentsAndColor } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ProjectData from "@/../data/data.json"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Component_Color_Mapping:ComponentsAndColor = {
  Navbar: "bg-[#4bc5ce]",
  About: "bg-red-500",
  Skill: "bg-green-500", 
  Project: "bg-pink-500",
} as const;

export interface Socials {
  platform: string;
  badge: string;
  url: string;
  tagline: string;
  signal: string;
  base: string;
  details: {
    profile: string;
    status: string;
  };
}

export interface Blogs {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  role: string;
  description: string[];
  problemStatement: string;
  isAccessibleByUrl: boolean;
  url: string;
}

export enum Priority {
  Experience = 'ExperienceSection',
  Personal = 'PersonalSection'
}

export const getRotatingItems = (): Socials[] => {
  return ProjectData.socials.map((social: Socials) => {
    return {
      platform: social.platform,
      badge: social.badge,
      url: social.url,
      tagline: social.tagline,
      signal: social.signal,
      base: social.base,
      details: social.details
    }
  })
}

export const getBlogs = (): Blogs[] => {
  const blogs = [...ProjectData.blogs].slice(0, 3) as Blogs[];
  return blogs;
}

export const getProjects = (priority?: Priority): Project[] => {
  let usedPrio:Priority = Priority.Experience;

  if(!priority){
    usedPrio = Priority.Experience;
  } else if(priority === Priority.Experience) {
    usedPrio = Priority.Experience;
  } else if(priority === Priority.Personal) {
    usedPrio = Priority.Personal;
  }

  const filterArray = ProjectData.projectMeta[usedPrio];
  return ProjectData.projects.filter((p: Project) => filterArray.includes(p.id));
}