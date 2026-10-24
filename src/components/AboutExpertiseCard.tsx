"use client";

import React, { useState, useEffect } from "react";
import { SkillPatternType } from "./ThemeCustomizer";
import { Layers, Filter, ListTree } from "lucide-react";
import { getCategoryConfig, type CategoryConfig } from "@/lib/utils";

export function AboutExpertiseCard() {
  const [skillPattern, setSkillPattern] = useState<SkillPatternType>("default");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-skill-pattern") as SkillPatternType;
    if (saved && ["default", "filterable", "hierarchy"].includes(saved)) {
      setSkillPattern(saved);
    }

    const handlePatternChange = (e: Event) => {
      const customEvent = e as CustomEvent<SkillPatternType>;
      if (customEvent.detail) {
        setSkillPattern(customEvent.detail);
      }
    };

    window.addEventListener("skill-pattern-change", handlePatternChange);
    return () => {
      window.removeEventListener("skill-pattern-change", handlePatternChange);
    };
  }, []);

  const changePattern = (newPattern: SkillPatternType) => {
    setSkillPattern(newPattern);
    localStorage.setItem("portfolio-skill-pattern", newPattern);
    window.dispatchEvent(
      new CustomEvent("skill-pattern-change", { detail: newPattern })
    );
  };

  const categories: CategoryConfig[] = getCategoryConfig();

  return (
    <div id="expertise" className="surface-card rounded-2xl p-5 sm:p-7 space-y-5 transition-all duration-300">
      {/* Card Header with In-Card View Switcher Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[var(--color-border)]">
        <div>
          <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
            EXPERTISE
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-primary)]">
            Technical Skills
          </h2>
        </div>

        {/* View Layout Switcher Pills */}
        <div className="flex items-center gap-1 p-0.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg self-start sm:self-auto">
          <button
            onClick={() => changePattern("default")}
            className={`px-2 py-1 text-[10px] font-mono-code rounded-md transition-all flex items-center gap-1 ${
              skillPattern === "default"
                ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-semibold shadow-xs border border-[var(--color-border)]"
                : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            }`}
            title="Inline Rows View"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Icon Tiles</span>
          </button>

          <button
            onClick={() => changePattern("filterable")}
            className={`px-2 py-1 text-[10px] font-mono-code rounded-md transition-all flex items-center gap-1 ${
              skillPattern === "filterable"
                ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-semibold shadow-xs border border-[var(--color-border)]"
                : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            }`}
            title="Filterable Cloud View"
          >
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">Filterable Cloud</span>
          </button>

          <button
            onClick={() => changePattern("hierarchy")}
            className={`px-2 py-1 text-[10px] font-mono-code rounded-md transition-all flex items-center gap-1 ${
              skillPattern === "hierarchy"
                ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-semibold shadow-xs border border-[var(--color-border)]"
                : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
            }`}
            title="Hierarchical Bento View"
          >
            <ListTree className="w-3 h-3" />
            <span className="hidden sm:inline">Bento Blocks</span>
          </button>
        </div>
      </div>

      {/* Pattern 1: Default Inline Rows (Ditto as Screenshot 1 & 2) */}
      {skillPattern === "default" && (
        <div className="space-y-3 pt-0.5">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-b-0"
            >
              {/* Category Indicator with Colored Dot */}
              <div className="flex items-center gap-2 w-full sm:w-40 shrink-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.dotColor }}
                />
                <span className="text-[11px] font-mono-code font-bold tracking-wider text-[var(--color-primary)] uppercase">
                  {cat.name}
                </span>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-[var(--color-primary)] font-mono-code">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="hover:text-[var(--color-accent)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pattern 2: Filterable Cloud (Ditto as Screenshot 3 & 4) */}
      {skillPattern === "filterable" && (
        <div className="space-y-4 pt-0.5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategoryFilter("all")}
              className={`px-3 py-1 rounded-full text-[11px] font-mono-code transition-all border ${
                activeCategoryFilter === "all"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold shadow-xs"
                  : "border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] bg-[var(--color-background)]/50"
              }`}
            >
              All Skills
            </button>

            {categories.map((cat) => {
              const isSelected = activeCategoryFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() =>
                    setActiveCategoryFilter(isSelected ? "all" : cat.key)
                  }
                  className={`px-3 py-1 rounded-full text-[11px] font-mono-code transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 font-semibold shadow-xs"
                      : "border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] bg-[var(--color-background)]/50"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cat.dotColor }}
                  />
                  <span>{cat.name.charAt(0) + cat.name.slice(1).toLowerCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Cloud of Skills */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {categories.flatMap((cat) =>
              cat.skills.map((skill) => {
                const isHighlighted =
                  activeCategoryFilter === "all" ||
                  activeCategoryFilter === cat.key;

                return (
                  <span
                    key={`${cat.key}-${skill}`}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono-code border transition-all duration-200 cursor-default ${
                      isHighlighted
                        ? `${cat.badgeStyle} shadow-xs scale-100 opacity-100`
                        : "border-[var(--color-border)]/40 bg-[var(--color-background)]/40 text-[var(--color-secondary)]/40 opacity-40 scale-95"
                    }`}
                  >
                    {skill}
                  </span>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Pattern 3: Hierarchical Bento Blocks (Ditto as Screenshot 5) */}
      {skillPattern === "hierarchy" && (
        <div className="space-y-3 pt-0.5">
          {categories.map((cat) => {
            const topSkills = cat.skills.slice(0, 3);
            const subSkills = cat.skills.slice(3);

            return (
              <div
                key={cat.key}
                className={`border-l-2 ${cat.lineBorder} pl-3 py-1 border-b border-[var(--color-border)]/40 last:border-b-0 space-y-0.5`}
              >
                {/* Category Small Caps */}
                <div className="text-[10px] font-mono-code uppercase font-semibold tracking-wider text-[var(--color-secondary)]">
                  {cat.name}
                </div>

                {/* Top/Primary Skills Bold */}
                <div className="text-xs font-bold text-[var(--color-primary)] font-mono-code">
                  {topSkills.join(", ")}
                </div>

                {/* Sub-skills with Middle Dots */}
                {subSkills.length > 0 && (
                  <div className="text-[11px] text-[var(--color-secondary)] font-mono-code">
                    {subSkills.join(" · ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
