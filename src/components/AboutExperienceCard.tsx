"use client";

import React from "react";
import { Priority, ProjectHighlight, getHighlightProjects } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import { ExperienceAndProjectHighlightsCard } from "./ExperienceAndProjectHighlightsCard";

export function AboutExperienceCard() {
  const experiences: ProjectHighlight[] = getHighlightProjects(Priority.Experience);

  return (
    <div 
      id="professional-experience"
      className="surface-card rounded-2xl p-5 sm:p-6 transition-all duration-300"
    >
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono-code uppercase font-medium tracking-[0.08em] text-[var(--color-secondary)] mb-1.5 sm:mb-2">
            CAREER
          </p>
          <h2
            id="highlights-title"
            className="text-lg sm:text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-primary)]"
          >
            Professional Experience
          </h2>
        </div>
        <Briefcase className="w-4 h-4 text-[var(--color-secondary)] opacity-50" />
      </div>

      {/* Timeline Items */}
      <ul className="list-none divide-y divide-[var(--color-border)]">
        {experiences.map((exp, index) => (
         <ExperienceAndProjectHighlightsCard key={index} index={index} data={exp} />
        ))}
      </ul>
    </div>
  );
}
