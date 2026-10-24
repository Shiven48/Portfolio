"use client";

import React, { useState, useEffect } from "react";
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

  // Carousel state for case studies
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  // Responsive items-per-view calculation: 1 for mobile, 2 for tablet, 3 for desktop
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

          {/* Carousel Container with Side Navigation Buttons */}
          <div className="relative px-0 sm:px-1">
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
                                className="text-[11px] font-mono-code font-medium py-1.5 px-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center group-hover:border-[var(--color-accent)]/40 transition-colors truncate"
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
