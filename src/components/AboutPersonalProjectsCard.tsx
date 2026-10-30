"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { Priority, ProjectHighlight, getHighlightProjects } from "@/lib/utils";
import { ExperienceAndProjectHighlightsCard } from "./ExperienceAndProjectHighlightsCard";


export function AboutPersonalProjectsCard() {
  const personalProjects: ProjectHighlight[] = getHighlightProjects(Priority.Personal);

  return (
    <div
      id="personal-projects"
      className="surface-card rounded-2xl p-5 sm:p-6 transition-all duration-300"
    >
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono-code uppercase font-medium tracking-[0.08em] text-[var(--color-secondary)] mb-1.5 sm:mb-2">
            Projects
          </p>
          <h2
            id="highlights-title"
            className="text-lg sm:text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-primary)]"
          >
            Personal Highlights
          </h2>
        </div>
        <Code2
          className="w-[18px] h-[18px] text-[var(--color-secondary)] opacity-60 shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Projects List */}
      <ul className="list-none divide-y divide-[var(--color-border)]">
        {personalProjects.map((data, index) => (
          <ExperienceAndProjectHighlightsCard key={index} index={index} data={data} />
        ))}
      </ul>
    </div>
  );
}
