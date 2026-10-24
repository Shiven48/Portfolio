import { ComponentsAndColor } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ProjectData from "@/../data/data.json"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const endpoint:string = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

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

export type CaseStudies = Blogs;

export interface Project {
  id: number;
  title: string;
  role: string;
  description: string[];
  problemStatement: string;
  isAccessibleByUrl: boolean;
  url: string;
  caseStudyUrl?: string | null;
  highlights: string[] | null;
  isCaseStudyAvailable: boolean;
}

export enum Priority {
  Experience = 'ExperienceSection',
  Personal = 'PersonalSection'
}

export const getSocials = (): Socials[] => {
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

export interface CategoryConfig {
  key: string;
  name: string;
  dotColor: string;
  lineBorder: string;
  badgeStyle: string;
  skills: string[];
}

interface CategoryPreset {
  name: string;
  dotColor: string;
  lineBorder: string;
  badgeStyle: string;
}

const CATEGORY_PRESETS: Record<string, CategoryPreset> = {
  programming: {
    name: "PROGRAMMING",
    dotColor: "#22c55e",
    lineBorder: "border-emerald-500",
    badgeStyle: "bg-emerald-500/15 border-emerald-500/35 text-emerald-600 dark:text-emerald-400",
  },
  cloud: {
    name: "CLOUD & DEVOPS",
    dotColor: "#38bdf8",
    lineBorder: "border-sky-500",
    badgeStyle: "bg-sky-500/15 border-sky-500/35 text-sky-600 dark:text-sky-400",
  },
  web: {
    name: "WEB DEVELOPMENT",
    dotColor: "#a855f7",
    lineBorder: "border-purple-500",
    badgeStyle: "bg-purple-500/15 border-purple-500/35 text-purple-600 dark:text-purple-400",
  },
  ai: {
    name: "AI & MACHINE LEARNING",
    dotColor: "#3b82f6",
    lineBorder: "border-blue-500",
    badgeStyle: "bg-blue-500/15 border-blue-500/35 text-blue-600 dark:text-blue-400",
  },
  persistence: {
    name: "DATA & PERSISTENCE",
    dotColor: "#f97316",
    lineBorder: "border-amber-500",
    badgeStyle: "bg-amber-500/15 border-amber-500/35 text-amber-600 dark:text-amber-400",
  },
};

const FALLBACK_PALETTES: CategoryPreset[] = [
  {
    name: "",
    dotColor: "#ec4899",
    lineBorder: "border-pink-500",
    badgeStyle: "bg-pink-500/15 border-pink-500/35 text-pink-600 dark:text-pink-400",
  },
  {
    name: "",
    dotColor: "#14b8a6",
    lineBorder: "border-teal-500",
    badgeStyle: "bg-teal-500/15 border-teal-500/35 text-teal-600 dark:text-teal-400",
  },
  {
    name: "",
    dotColor: "#eab308",
    lineBorder: "border-yellow-500",
    badgeStyle: "bg-yellow-500/15 border-yellow-500/35 text-yellow-600 dark:text-yellow-400",
  },
  {
    name: "",
    dotColor: "#6366f1",
    lineBorder: "border-indigo-500",
    badgeStyle: "bg-indigo-500/15 border-indigo-500/35 text-indigo-600 dark:text-indigo-400",
  },
];

export const getCategoryConfig = (): CategoryConfig[] => {
  if (!ProjectData.skills || typeof ProjectData.skills !== "object") {
    return [];
  }

  const skillEntries = Object.entries(ProjectData.skills as Record<string, unknown>);

  return skillEntries.map(([key, rawSkills], index) => {
    const normalizedKey = key.toLowerCase().trim();
    const preset = CATEGORY_PRESETS[normalizedKey];
    const fallback = FALLBACK_PALETTES[index % FALLBACK_PALETTES.length];

    const safeSkills: string[] = Array.isArray(rawSkills)
      ? rawSkills.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      : [];

    return {
      key,
      name: preset?.name || key.toUpperCase(),
      dotColor: preset?.dotColor || fallback.dotColor,
      lineBorder: preset?.lineBorder || fallback.lineBorder,
      badgeStyle: preset?.badgeStyle || fallback.badgeStyle,
      skills: safeSkills,
    };
  });
};

export interface AssetMeta {
  id: number;
  title: string;
  path: string;
  type: string;
  width?: string | number;
  height?: string | number;
  project: string;
}

export const getHomePageAssets = (): AssetMeta[] => {
  if (Array.isArray(ProjectData.assets)) {
    return ProjectData.assets as AssetMeta[];
  }
  if (ProjectData.assets && typeof ProjectData.assets === "object" && "assetmeta" in ProjectData.assets) {
    const assetsObj = ProjectData.assets as { assetmeta?: AssetMeta[]; homeassets?: number[] };
    if (assetsObj.assetmeta && assetsObj.homeassets) {
      return assetsObj.assetmeta.filter((a) => assetsObj.homeassets?.includes(a.id));
    }
  }
  return [];
};

export const getProjectAssets = (query: string): AssetMeta[] => {
  if (!query) return [];
  const normalized = query.toLowerCase().trim();
  const allAssets: AssetMeta[] = Array.isArray(ProjectData.assets)
    ? (ProjectData.assets as AssetMeta[])
    : (ProjectData.assets as { assetmeta?: AssetMeta[] })?.assetmeta || [];

  return allAssets.filter(
    (a) => a.project?.toLowerCase() === normalized || normalized.includes(a.project?.toLowerCase() || "")
  );
};

export const loadAssets = (companyName: string): AssetMeta[] => {
  return getProjectAssets(companyName);
};

export interface InternalCaseStudy extends Project {
  ref: number;
  detailedProblemStatement: string;
  detailedSolution: string[];
  timeline?: string;
  roleDetails?: string;
  techStack: string[];
  challenges: string[];
}

export enum queryType {
  silentguard = "silentguard",
}

export const getCaseStudyByProject = (query: queryType): InternalCaseStudy | null => {
  if (!query) {
    console.error("No project id provided");
    return null;
  }

  const normalized = query.toLowerCase().trim();
  const projectFound: Project | undefined = ProjectData.projects.find(
    (project: Project) =>
      project.title.toLowerCase() === normalized ||
      (project.caseStudyUrl && project.caseStudyUrl.toLowerCase().endsWith(`/${normalized}`)) ||
      (project.caseStudyUrl && project.caseStudyUrl.toLowerCase() === `/experience/${normalized}`)
  );
  if (!projectFound) {
    console.error("No project found with title: ", query);
    return null;
  }
  const internalCaseStudy = ProjectData.internalCaseStudy[query];
  if (!internalCaseStudy) {
    console.error("No ref found for project: ", query);
    return null;
  }
  const finalInternalCaseStudy: InternalCaseStudy = {
    ...projectFound,
    ...internalCaseStudy
  }
  return finalInternalCaseStudy;
};