"use client";

import React from "react";
import projectData from "@/../data/data.json";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

export function AboutAcademicCard() {
  const academic = projectData.Academic;
  if (!academic) return null;

  return (
    <div id="academic" className="surface-card rounded-2xl p-5 sm:p-7 space-y-5 transition-all duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
            EDUCATION
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-primary)]">
            Academic Background
          </h2>
        </div>
        <GraduationCap className="w-4 h-4 text-[var(--color-secondary)] opacity-50" />
      </div>

      {/* Academic Content Block */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-xl bg-[var(--color-background)]/50 border border-[var(--color-border)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
              {academic.course}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold border border-[var(--color-accent)]/30">
              Undergraduate
            </span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-[var(--color-primary)]">
            {academic.college_name}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-secondary)] font-mono-code pt-0.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{academic.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{academic.duration}</span>
            </div>
          </div>
        </div>

        {/* CGPA Score Badge */}
        {academic.cgpa && (
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] self-start sm:self-center shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase font-mono-code text-[var(--color-secondary)]">Cumulative GPA</span>
              <span className="text-xs font-bold font-mono-code text-[var(--color-primary)]">
                {academic.cgpa} / 10.0
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
