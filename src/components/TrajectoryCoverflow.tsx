"use client";

import React, { useState, useEffect } from "react";
import projectData from "@/../data/data.json";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { getProjects, Project } from "@/lib/utils";

export function TrajectoryCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const filteredProjects: Project[] = getProjects(); 

  // 5.0s auto rotation timer
  useEffect(() => {
    if (isPaused || filteredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, filteredProjects.length]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const currentProject = filteredProjects[activeIndex] || filteredProjects[0];

  return (
    <section id="trajectory" className="w-full py-16 md:py-24 transition-colors">
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

          {/* Filter / Filter Pills */}
          {/* <div className="flex items-center gap-1.5 p-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] self-start sm:self-auto">
            {(["all", "experience", "personal"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setFilter(mode);
                  setActiveIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all capitalize ${
                  filter === mode
                    ? "bg-[var(--color-cta)] text-[var(--color-cta-text)] font-semibold shadow-sm"
                    : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {mode === "all" ? "All Systems" : mode}
              </button>
            ))}
          </div> */}
        </div>

        {/* 3D Coverflow Carousel Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative py-8 min-h-[460px] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Coverflow Cards Container */}
          <div className="w-full flex items-center justify-center relative perspective-[1200px]">
            <div className="w-full max-w-4xl flex items-center justify-center gap-4 sm:gap-6 relative min-h-[380px]">
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
                      scale: isCenter ? 1.15 : 0.88,
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
                    <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
                      {/* Top Card Badge & Meta */}
                      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
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
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                              title="Open project URL"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1 font-medium">
                          {item.role}
                        </p>
                      </div>

                      {/* Problem Statement Box */}
                      <div className="rounded-xl p-3 bg-[var(--color-background)] border border-[var(--color-border)] text-xs font-mono-code space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-wider block">
                          PROBLEM STATEMENT & ARCHITECTURE
                        </span>
                        <p className="text-[var(--color-primary)] font-medium">
                          {item.problemStatement}
                        </p>
                      </div>

                      {/* Detailed Description */}
                      <div className="text-xs sm:text-sm text-[var(--color-secondary)] space-y-1.5 font-normal leading-relaxed">
                        {item.description.map((desc, dIdx) => (
                          <p key={dIdx} className="line-clamp-3">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {/* Bottom Footer Details */}
                      <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono-code">
                        <div className="flex items-center gap-2 text-[var(--color-secondary)]">
                          <Terminal className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                          <span>Interactive Trajectory Node</span>
                        </div>

                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline"
                          >
                            Explore Artifact <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-[var(--color-secondary)]">
                            Internal Architecture
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Prev / Next + Timer Indicator + Dots */}
          <div className="w-full max-w-xl flex items-center justify-between pt-8 px-4 z-40">
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
                    onClick={() => setActiveIndex(i)}
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
      </div>
    </section>
  );
}
