"use client";

import React from "react";
import { getProjects, Priority, Project } from "@/lib/utils";
import { ExternalLink, Code2 } from "lucide-react";

export function AboutPersonalProjectsCard() {
  const personalProjects: Project[] = getProjects(Priority.Personal);

  return (
    <div id="personal-projects" className="surface-card rounded-2xl p-5 sm:p-7 space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
            PROJECTS
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-primary)]">
            Personal Highlights
          </h2>
        </div>
        <Code2 className="w-4 h-4 text-[var(--color-secondary)] opacity-50" />
      </div>

      {/* Timeline Items */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-[var(--color-border)]/60">
        {personalProjects.map((proj) => (
          <div key={proj.id} className="relative flex items-start gap-4 group pl-0.5">
            {/* Timeline Dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-surface)] border-2 border-emerald-500 flex items-center justify-center shrink-0 z-10 mt-1 shadow-xs">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                    {proj.title}
                  </h3>
                  {/* <span className="text-xs font-mono-code text-emerald-500 dark:text-emerald-400 font-semibold">
                    ({proj.role})
                  </span> */}
                </div>

                {proj.isAccessibleByUrl && proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[var(--color-secondary)] hover:text-emerald-500 transition-colors self-start"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>

              {/* Subtitle / Problem Statement */}
              {proj.problemStatement && (
                <p className="text-[11px] font-mono-code text-[var(--color-secondary)] leading-normal">
                  Objective: {proj.problemStatement}
                </p>
              )}

              {/* Bullet Points */}
              <ul className="space-y-1 pt-0.5">
                {proj.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-[13px] text-[var(--color-secondary)] flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-emerald-500 mt-1 shrink-0 text-xs">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
