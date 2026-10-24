"use client";

import React from "react";
import projectData from "@/../data/data.json";
import { Sparkles,GitBranch } from "lucide-react";

export function StatsBanner() {
  return (
    <div className="w-full py-8 border-y border-[var(--color-border)] bg-[var(--color-surface)]/50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Featured Highlight */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono-code text-[var(--color-secondary)]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>
            <strong className="text-[var(--color-primary)] font-semibold">
              Academic & Systems:
            </strong>{" "}
            {projectData.Academic.college_name} ({projectData.Academic.cgpa} CGPA)
          </span>
        </div>

        {/* Right: Quantifiable Stats */}
        <div className="flex items-center gap-4 text-xs font-mono-code text-[var(--color-accent)] font-semibold">
          <span className="flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" /> {projectData.projectMeta.ExperienceSection.length}+ Production Projects
          </span>
          <span className="text-[var(--color-border)]">·</span>
          {/* <span className="flex items-center gap-1.5"> */}
            {/* <Sparkles className="w-3.5 h-3.5" /> CUDA & PyTorch ML */}
          {/* </span> */}
          <span className="text-[var(--color-border)]">·</span>
          <span>{projectData.Academic.location}</span>
        </div>
      </div>
    </div>
  );
}
