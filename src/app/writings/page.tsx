"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "../(Header)/Navbar";
import { ContactSection } from "@/components/ContactSection";
import {
  ArrowUpRight,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Blogs, getAllBlogs, getCaseStudies, Project } from "@/lib/utils";

export default function WritingsPage() {
  const caseStudies: Project[] = getCaseStudies();
  const allBlogs: Blogs[] = getAllBlogs();

  // Stacked deck state for mobile / small screens (< sm)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const isLocked = useRef(false);
  const touchStartX = useRef<number | null>(null);

  // Desktop carousel state for case studies (>= sm)
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  const handleNext = useCallback(() => {
    if (isLocked.current || caseStudies.length <= 1) return;
    isLocked.current = true;
    const prev = activeIndex;
    const next = (prev + 1) % caseStudies.length;

    setExitingIndex(prev);
    setActiveIndex(next);
    setAnimKey((k) => k + 1);

    setTimeout(() => {
      setExitingIndex(null);
      isLocked.current = false;
    }, 600);
  }, [activeIndex, caseStudies.length]);

  const handlePrev = useCallback(() => {
    if (isLocked.current || caseStudies.length <= 1) return;
    setExitingIndex(null);
    setActiveIndex((prev) =>
      prev === 0 ? caseStudies.length - 1 : prev - 1
    );
    setAnimKey((k) => k + 1);
  }, [caseStudies.length]);

  const handleJump = useCallback(
    (index: number) => {
      if (isLocked.current || index === activeIndex) return;
      setExitingIndex(null);
      setActiveIndex(index);
      setAnimKey((k) => k + 1);
    },
    [activeIndex]
  );

  // 5.0s auto rotation timer for mobile stacked deck
  useEffect(() => {
    if (isPaused || caseStudies.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, caseStudies.length, handleNext]);

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

  // Responsive items-per-view calculation for desktop
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxCaseStudyIndex = Math.max(0, caseStudies.length - itemsPerView);

  // Keep carouselIndex bounded if screen resizes
  useEffect(() => {
    if (carouselIndex > maxCaseStudyIndex) {
      setCarouselIndex(maxCaseStudyIndex);
    }
  }, [maxCaseStudyIndex, carouselIndex]);

  const handlePrevCaseStudy = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCaseStudy = () => {
    setCarouselIndex((prev) => Math.min(maxCaseStudyIndex, prev + 1));
  };

  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-background)]">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex-1">
        {/* Page Header */}
        <header className="mb-12 md:mb-16 pb-8 border-b border-[var(--color-border)]">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
              Writings
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-secondary)] leading-relaxed">
              In-depth technical case studies, systems architecture breakdowns, and research on low-latency inference, real-time telemetry, and reliable software engineering.
            </p>
          </div>
        </header>

        <section aria-labelledby="case-studies-heading" className="mb-16 md:mb-20">
          {/* Section Heading without buttons */}
          <div className="pb-6 mb-8 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-mono-code font-bold tracking-widest text-[var(--color-accent)] uppercase">
                FEATURED SYSTEMS
              </span>
            </div>
            <h2
              id="case-studies-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-primary)]"
            >
              Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1">
              Deep architectural dives into production systems, edge ML pipelines, and diagnostic infrastructure.
            </p>
          </div>

          {/* Mobile Stacked Deck Design (< sm breakpoint) */}
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
            aria-label="Case Studies Deck"
          >
            {/* Stacked Cards Container: All cards share 1 grid cell */}
            <div className="grid grid-cols-1 pb-7 overflow-hidden">
              {caseStudies.map((item, index) => {
                const total = caseStudies.length;
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
                      {/* Main Title & Role */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl font-bold tracking-tight text-[var(--color-primary)]">
                            {item.title}
                          </h3>
                          {item.caseStudyUrl ? (
                            <Link
                              href={item.caseStudyUrl}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline shrink-0"
                            >
                              Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : null}
                        </div>
                        <p className="text-xs text-[var(--color-secondary)] font-mono-code mt-0.5 font-medium">
                          {item.role}
                        </p>
                      </div>

                      {/* Problem Statement Highlighted in Amber with Left Accent */}
                      {item.problemStatement && (
                        <div className="p-3 rounded-lg bg-amber-500/10 border-l-2 border-l-amber-500 border-y border-r border-amber-500/20 text-xs font-mono-code leading-relaxed">
                          <span className="font-semibold text-amber-500 tracking-wider uppercase text-[10px] block mb-1">
                            PROBLEM
                          </span>
                          <p className="text-xs leading-relaxed text-[var(--color-primary)]">
                            {item.problemStatement}
                          </p>
                        </div>
                      )}

                      {/* Detailed Description */}
                      <div className="text-xs text-[var(--color-secondary)] space-y-1 font-normal leading-relaxed">
                        {Array.isArray(item.description) ? (
                          item.description.map((desc, dIdx) => (
                            <p key={dIdx} className="line-clamp-2">
                              {desc}
                            </p>
                          ))
                        ) : (
                          <p className="line-clamp-2">{item.description}</p>
                        )}
                      </div>

                      {/* Highlights: 2x2 Structured Grid (Max 4 tags) */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {item.highlights.slice(0, 4).map((highlight, idx) => (
                            <span
                              key={idx}
                              title={highlight}
                              className="text-[11px] font-mono-code font-medium py-1.5 px-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center text-[var(--color-secondary)] hover:border-[var(--color-accent)]/40 transition-colors truncate"
                            >
                              {highlight}
                            </span>
                          ))}
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
                aria-label="Previous case study"
                className="w-10 h-10 shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                className="flex-1 grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${caseStudies.length}, minmax(0, 1fr))`,
                }}
              >
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleJump(i)}
                    aria-label={`Show case study ${i + 1}`}
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
                aria-label="Next case study"
                className="w-10 h-10 shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Status caption */}
            <div className="flex justify-between items-center text-[10px] font-mono-code text-[var(--color-secondary)] mt-2 px-1">
              <span>{isPaused ? "PAUSED (HOVER/TOUCH)" : "AUTOPLAY · 5.0s"}</span>
              <span>
                {activeIndex + 1} / {caseStudies.length}
              </span>
            </div>
          </div>

          {/* Desktop Carousel Track (>= sm breakpoint) */}
          <div className="hidden sm:block relative px-0 sm:px-1">
            {/* Carousel Viewport & Slider Track */}
            <div className="overflow-hidden w-full rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out mx-auto gap-[24px]"
              >
                {caseStudies.map((study) => (
                  <div
                    key={study.id}
                    className="flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(itemsPerView - 1) * 32}px) / ${itemsPerView})`,
                    }}
                  >
                    <Link
                      href={study.caseStudyUrl || "#"}
                      className="group flex flex-col h-full surface-card surface-card-hover rounded-2xl p-5 justify-between border border-[var(--color-border)] hover:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none transition-all duration-200"
                    >
                      <div className="space-y-3">
                        {/* Top Row: Role + LIVE Badge + Clickable Indicator Arrow */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5">
                              {study.role}
                            </span>
                          </div>

                          {/* Distinct link indicator showing card has a destination page */}
                          <div className="flex items-center gap-1 text-[11px] font-mono-code text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0">
                            <span className="font-medium">Read</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>

                        {/* Case Study Title */}
                        <h3 className="text-lg font-bold tracking-tight text-[var(--color-primary)] transition-colors leading-snug">
                          {study.title}
                        </h3>

                        {/* Problem Statement Highlighted in Amber with Left Accent */}
                        {study.problemStatement && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border-l-2 border-l-amber-500 border-y border-r border-amber-500/20 text-xs font-mono-code leading-relaxed">
                            <span className="font-semibold text-amber-500 tracking-wider uppercase text-[10px] block mb-1">
                              PROBLEM
                            </span>
                            <p className="text-xs leading-relaxed">
                              {study.problemStatement}
                            </p>
                          </div>
                        )}

                        {/* Summary Description */}
                        <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-2">
                          {Array.isArray(study.description)
                            ? study.description.join(" ")
                            : study.description}
                        </p>

                        {/* Highlights: 2x2 Structured Grid (Max 4 tags) */}
                        {study.highlights && study.highlights.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {study.highlights.slice(0, 4).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="flex items-center justify-center gap-2 text-[11px] font-mono-code font-medium py-1.5 px-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center group-hover:border-[var(--color-accent)]/40 transition-colors truncate"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: BLOGS (3xN Grid, Vertically Scrollable)
            - 3-column responsive grid (3xN)
            - Clean editorial cards matching homepage style
           ========================================================================= */}
        <section aria-labelledby="blogs-heading" className="pt-8 border-t border-[var(--color-border)]">
          <div className="pb-6 mb-8 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-mono-code font-bold tracking-widest text-[var(--color-accent)] uppercase">
                PUBLICATIONS & ESSAYS
              </span>
            </div>
            <h2
              id="blogs-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-primary)]"
            >
              Articles & Publications
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1">
              Deep dives into systems programming, machine learning, and software design.
            </p>
          </div>

          {/* 3xN Responsive Grid for Blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs.map((post, idx) => (
              <div
                key={idx}
                className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[var(--color-accent)] transition-all duration-200 group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  {/* Top Tag & Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5">
                      {post.tag || "Article"}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono-code text-[var(--color-secondary)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date || "2026"}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime || "5m"}
                      </span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-lg font-bold tracking-tight text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Post Description */}
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[var(--color-secondary)]">Read post</span>
                  <a
                    href={post.url || "#"}
                    className="inline-flex items-center gap-1 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] font-semibold transition-colors"
                  >
                    View <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ContactSection />
    </main>
  );
}
