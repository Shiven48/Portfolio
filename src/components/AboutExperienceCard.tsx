"use client";

import React from "react";
import { getProjects, Priority, Project } from "@/lib/utils";
import { ExternalLink, Briefcase } from "lucide-react";

export function AboutExperienceCard() {
  const experiences: Project[] = getProjects(Priority.Experience);

  return (
    <div id="experience" className="surface-card rounded-2xl p-5 sm:p-7 space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
            CAREER
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-primary)]">
            Professional Experience
          </h2>
        </div>
        <Briefcase className="w-4 h-4 text-[var(--color-secondary)] opacity-50" />
      </div>

      {/* Timeline Items */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-[var(--color-border)]/60">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex items-start gap-4 group pl-0.5">
            {/* Timeline Dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-accent)] flex items-center justify-center shrink-0 z-10 mt-1 shadow-xs">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono-code text-[var(--color-accent)] font-semibold">
                    @ {exp.title}
                  </span>
                </div>

                {exp.isAccessibleByUrl && exp.url && (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors self-start"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>

              {/* Subtitle / Problem Statement */}
              {exp.problemStatement && (
                <p className="text-[11px] font-mono-code text-[var(--color-secondary)] leading-normal">
                  Focus: {exp.problemStatement}
                </p>
              )}

              {/* Bullet Points */}
              <ul className="space-y-1 pt-0.5">
                {exp.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-[13px] text-[var(--color-secondary)] flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-[var(--color-accent)] mt-1 shrink-0 text-xs">•</span>
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
