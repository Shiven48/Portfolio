"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import projectData from "@/../data/data.json";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { AssetMeta, getHomePageAssets, getProjects, Project } from "@/lib/utils";

interface NoteProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Note: React.FC<NoteProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <div className="space-y-1">
        <span className="block font-mono-code text-[10px] font-semibold uppercase tracking-wider text-amber-500">
          {title}
        </span>
        <p className="font-mono-code text-xs leading-relaxed text-[var(--color-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export function TrajectoryCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const isLocked = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const filteredProjects: Project[] = getProjects(); 
  const homeAssets: AssetMeta[] = getHomePageAssets();

  const handleNext = useCallback(() => {
    if (isLocked.current || filteredProjects.length <= 1) return;
    isLocked.current = true;
    const prev = activeIndex;
    const next = (prev + 1) % filteredProjects.length;

    setExitingIndex(prev);
    setActiveIndex(next);
    setAnimKey((k) => k + 1);

    setTimeout(() => {
      setExitingIndex(null);
      isLocked.current = false;
    }, 600);
  }, [activeIndex, filteredProjects.length]);

  const handlePrev = useCallback(() => {
    if (isLocked.current || filteredProjects.length <= 1) return;
    setExitingIndex(null);
    setActiveIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
    setAnimKey((k) => k + 1);
  }, [filteredProjects.length]);

  const handleJump = useCallback(
    (index: number) => {
      if (isLocked.current || index === activeIndex) return;
      setExitingIndex(null);
      setActiveIndex(index);
      setAnimKey((k) => k + 1);
    },
    [activeIndex]
  );

  // 5.0s auto rotation timer
  useEffect(() => {
    if (isPaused || filteredProjects.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, filteredProjects.length, handleNext]);

  // Pause when the tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const getStackedCardStyle = (state: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      gridArea: "1 / 1",
      transformOrigin: "50% 100%",
      transition:
        "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
    };

    switch (state) {
      case "active":
        return {
          ...base,
          transform: "none",
          opacity: 1,
          zIndex: 4,
          boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.45)",
        };
      case "n1":
        return {
          ...base,
          transform: "translateY(14px) scale(0.95)",
          opacity: 0.6,
          zIndex: 3,
        };
      case "n2":
        return {
          ...base,
          transform: "translateY(28px) scale(0.9)",
          opacity: 0.3,
          zIndex: 2,
        };
      case "exit":
        return {
          ...base,
          transform: "translateX(-115%) rotate(-6deg)",
          opacity: 0,
          zIndex: 5,
        };
      case "hidden":
      default:
        return {
          ...base,
          transform: "translateY(40px) scale(0.85)",
          opacity: 0,
          zIndex: 1,
        };
    }
  };

  return (
    <section id="trajectory" className="w-full py-12 md:py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-4 border-b border-[var(--color-border)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-mono-code font-bold tracking-widest text-[var(--color-accent)] uppercase">
                TRAJECTORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)]">
              Where the systems shipped
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1">
              Production engineering, applied machine learning, and core systems.
            </p>
          </div>
        </div>

        {/* Stacked Deck Design (Small devices & Mobile / < sm breakpoint) */}
        <div
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onPointerDown={(e) => {
            touchStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) > 40) {
              if (dx < 0) {
                handleNext();
              } else {
                handlePrev();
              }
            }
          }}
          onPointerCancel={() => {
            touchStartX.current = null;
          }}
          className="block sm:hidden w-full max-w-[440px] mx-auto py-4 select-none touch-pan-y"
          aria-roledescription="carousel"
          aria-label="Projects Deck"
        >
          {/* Stacked Cards Container: All cards share 1 grid cell */}
          <div className="grid grid-cols-1 pb-7 overflow-hidden">
            {filteredProjects.map((item, index) => {
              const total = filteredProjects.length;
              let state = "hidden";
              if (index === exitingIndex) {
                state = "exit";
              } else {
                const offset = (index - activeIndex + total) % total;
                state = ["active", "n1", "n2"][offset] || "hidden";
              }
              const isActive = state === "active";

              return (
                <article
                  key={item.id}
                  style={getStackedCardStyle(state)}
                  aria-hidden={!isActive}
                  className={`stacked-card col-start-1 row-start-1 p-5 rounded-[18px] border transition-shadow duration-300 ${
                    isActive
                      ? "surface-card border-[var(--color-accent)] pointer-events-auto"
                      : "surface-card border-[var(--color-border)] pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col justify-between h-full space-y-3">
                    {/* Top Card Badge & Meta */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive
                              ? "bg-[var(--color-accent)] animate-pulse"
                              : "bg-[var(--color-secondary)]"
                          }`}
                        />
                        <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--color-accent)]">
                          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.isAccessibleByUrl && (
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-medium">
                            LIVE
                          </span>
                        )}
                        <span className="text-[11px] font-mono-code text-[var(--color-secondary)]">
                          {projectData.projectMeta.ExperienceSection.includes(item.id)
                            ? "Industry"
                            : "Project"}
                        </span>
                      </div>
                    </div>

                    {/* Main Title & Role */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-[var(--color-primary)]">
                          {item.title}
                        </h3>
                        {item.isCaseStudyAvailable && item.caseStudyUrl ? (
                          <a
                            href={item.caseStudyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline shrink-0"
                          >
                            Case Study <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-[var(--color-secondary)] shrink-0">
                            No Case Study Available
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-secondary)] font-mono-code mt-0.5 font-medium">
                        {item.role}
                      </p>
                    </div>

                    {/* Problem Statement Box */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border-l-2 border-l-amber-500 border-y border-r border-amber-500/20 text-xs font-mono-code leading-relaxed">
                      <span className="font-semibold text-amber-500 tracking-wider uppercase text-[10px] block mb-1">
                        PROBLEM
                      </span>
                      <p className="text-xs leading-relaxed">
                        {item.problemStatement}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <div className="text-xs text-[var(--color-secondary)] space-y-1 font-normal leading-relaxed">
                      {item.description.map((desc, dIdx) => (
                        <p key={dIdx} className="line-clamp-2">
                          {desc}
                        </p>
                      ))}
                    </div>

                    {/* Tags / Highlights Chips */}
                    {item.highlights && item.highlights.length > 0 ? (
                      <div className="grid grid-rows-2 grid-cols-2 gap-1.5 pt-0.5">
                        {item.highlights.slice(0, 4).map((tag, tIdx) => (
                          <div
                            key={tIdx}
                            title={tag}
                            className="flex items-center gap-1.5 min-w-0 px-2 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[10px] sm:text-[11px] font-mono-code text-[var(--color-secondary)]"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0 opacity-75" />
                            <span className="truncate">{tag}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] sm:text-xs text-[var(--color-secondary)] line-clamp-2 font-normal leading-relaxed">
                        {item.description[0]}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Controls Bar: Prev / Bars / Next */}
          <div className="flex items-center gap-3 mt-3 px-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-10 h-10 shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              className="flex-1 grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${filteredProjects.length}, minmax(0, 1fr))`,
              }}
            >
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleJump(i)}
                  aria-label={`Show project ${i + 1}`}
                  className="relative h-1 w-full rounded-full bg-[var(--color-border)] overflow-hidden cursor-pointer p-0 border-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  {i === activeIndex && (
                    <span
                      key={`stacked-fill-${i}-${animKey}`}
                      className="stacked-bar-fill absolute inset-0 bg-[var(--color-accent)] origin-left"
                      style={{
                        animation: "stackedDeckFill 5s linear forwards",
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="w-10 h-10 shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Status caption */}
          <div className="flex justify-between items-center text-[10px] font-mono-code text-[var(--color-secondary)] mt-2 px-1">
            <span>{isPaused ? "PAUSED (HOVER/TOUCH)" : "AUTOPLAY · 5.0s"}</span>
            <span>
              {activeIndex + 1} / {filteredProjects.length}
            </span>
          </div>
        </div>

        {/* 3D Coverflow Carousel Stage (Large screens >= sm) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden sm:flex relative py-6 sm:py-8 min-h-[520px] sm:min-h-[550px] flex-col justify-center items-center overflow-hidden"
        >
          {/* Coverflow Cards Container */}
          <div className="w-full flex items-center justify-center relative perspective-[1200px]">
            <div className="w-full max-w-4xl flex items-center justify-center gap-4 sm:gap-6 relative min-h-[430px] sm:min-h-[450px]">
              {filteredProjects.map((item, index) => {
                const total = filteredProjects.length;
                // Calculate distance relative to active index
                let offset = (index - activeIndex) % total;
                if (offset < -Math.floor(total / 2)) offset += total;
                if (offset > Math.floor(total / 2)) offset -= total;

                const isCenter = offset === 0;
                const isLeft = offset === -1 || (offset === total - 1 && total === 2);
                const isRight = offset === 1 || (offset === -(total - 1) && total === 2);
                const isVisible = Math.abs(offset) <= 1;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      scale: isCenter ? 1.04 : 0.88,
                      x: isCenter ? 0 : isLeft ? "-45%" : "45%",
                      rotateY: isCenter ? 0 : isLeft ? 14 : -14,
                      zIndex: isCenter ? 40 : 10,
                      opacity: isCenter ? 1 : 0.40,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`absolute w-[92%] sm:w-[540px] md:w-[600px] cursor-pointer rounded-2xl border transition-shadow duration-300 ${
                      isCenter
                        ? "surface-card border-[var(--color-accent)] shadow-2xl z-30"
                        : "surface-card border-[var(--color-border)] shadow-md z-10 hover:opacity-75"
                    }`}
                  >
                    <div className="p-5 sm:p-6 flex flex-col justify-between h-full space-y-3">
                      {/* Top Card Badge & Meta */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCenter
                                ? "bg-[var(--color-accent)] animate-pulse"
                                : "bg-[var(--color-secondary)]"
                            }`}
                          />
                          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--color-accent)]">
                            0{item.id} · {item.role}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.isAccessibleByUrl && (
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-medium">
                              LIVE
                            </span>
                          )}
                          <span className="text-[11px] font-mono-code text-[var(--color-secondary)]">
                            {projectData.projectMeta.ExperienceSection.includes(item.id)
                              ? "Industry"
                              : "Project"}
                          </span>
                        </div>
                      </div>

                      {/* Main Title & Role */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                            {item.title}
                          </h3>
                          {item.isCaseStudyAvailable && item.caseStudyUrl ? (
                          <a
                            href={item.caseStudyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline"
                          >
                            Case Study <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-[var(--color-secondary)]">
                            No Case Study Available
                          </span>
                        )}
                        </div>
                        <p className="text-xs text-[var(--color-secondary)] font-mono-code mt-0.5 font-medium">
                          {item.role}
                        </p>
                      </div>

                      {/* Problem Statement Box */}
                      <div className="rounded-xl p-2.5 sm:p-3 bg-[var(--color-background)] border border-[var(--color-border)] text-xs font-mono-code space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-wider block">
                          PROBLEM STATEMENT
                        </span>
                        <p className="text-[var(--color-primary)] font-small">
                          {item.problemStatement}
                        </p>
                      </div>

                      {/* Detailed Description */}
                      <div className="text-xs sm:text-sm text-[var(--color-secondary)] space-y-1 font-normal leading-relaxed">
                        {item.description.map((desc, dIdx) => (
                          <p key={dIdx} className="line-clamp-2">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {/* Tags / Highlights Matrix */}
                      {item.highlights && item.highlights.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1.5 w-full pt-0.5">
                          {item.highlights.slice(0, 4).map((tag, tIdx) => (
                            <div
                              key={tIdx}
                              title={tag}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[11px] font-mono-code text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-accent)]/50 transition-colors overflow-hidden"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 opacity-75" />
                              <span className="truncate">{tag}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-[var(--color-secondary)] line-clamp-2 font-normal leading-relaxed">
                          {item.description[0]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Prev / Next + Timer Indicator + Dots */}
          <div className="w-full max-w-xl flex items-center justify-between pt-6 sm:pt-8 px-4 z-40">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots & Timer status */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleJump(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-6 bg-[var(--color-accent)]"
                        : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-secondary)]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono-code text-[var(--color-secondary)]">
                {isPaused ? "PAUSED (HOVER)" : "AUTOPLAY · 5.0s"} ({activeIndex + 1}/{filteredProjects.length})
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auto rotate note for the cards */}
        <Note
          title="Note"
          description="Hover over the card to pause the rotation. Move away to resume it."
          icon={Info}
        />
      </div>
    </section>
  );
}
