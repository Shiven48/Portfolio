"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjectAssets, AssetMeta,InternalCaseStudy } from "@/lib/utils";
import { ArrowUpRight, ShieldCheck, Monitor, Play, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECT_VIDEOS: Record<string, string> = {
  silentguard: "https://www.youtube.com/embed/dQw4w9WgXcQ"
};

export default function SGCaseStudy({ caseStudy }: { caseStudy: InternalCaseStudy }) {
  const [activeTab, setActiveTab] = useState<"screenshots" | "video">("screenshots");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projectKey = caseStudy.title.toLowerCase();
  const assets: AssetMeta[] = getProjectAssets(projectKey);
  const videoUrl = PROJECT_VIDEOS[projectKey];

  const handleTabChange = (tab: "screenshots" | "video") => {
    setActiveTab(tab);
    if (tab === "video" && !videoLoaded) {
      setVideoLoaded(true);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 md:py-16 transition-colors bg-[var(--color-background)] text-[var(--color-primary)] font-mono-code">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <div>
          <Link
            href="/#trajectory"
            className="text-[11px] text-[#3ecf8e] hover:underline transition-all inline-block font-mono-code"
          >
            &larr; Back to trajectory
          </Link>
        </div>

        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mt-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-primary)] font-mono-code">
              {caseStudy.title}
            </h1>
            <p className="text-[13px] text-[#a1a1aa] mt-1 font-mono-code">
              {caseStudy.role} &middot; {caseStudy.timeline || "Jan 2026 – Present"}
            </p>
            {(caseStudy.roleDetails || caseStudy.title.toLowerCase() === "silentguard") && (
              <p className="text-[13px] text-[#71717a] mt-1 font-mono-code">
                {caseStudy.roleDetails || "My role: sole engineer on the guardrail engine, from architecture through shipping."}
              </p>
            )}
          </div>

          <div className="shrink-0 pt-0.5">
            {caseStudy.isAccessibleByUrl ? (
              <span className="inline-block px-3 py-[2px] rounded-full text-[11px] font-mono-code border border-[#0f6e56] text-[#3ecf8e] bg-transparent">
                LIVE
              </span>
            ) : (
              <span className="inline-block px-3 py-[2px] rounded-full text-[11px] font-mono-code border border-[#854f0b] text-[#efb034] bg-transparent">
                DEVELOPMENT
              </span>
            )}
          </div>
        </div>

        {/* Section: Problem Statement */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            PROBLEM STATEMENT
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
            {caseStudy.detailedProblemStatement}
          </p>
        </section>

        {/* Section: Solution */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            SOLUTION
          </p>
          <ul className="space-y-2.5">
            {caseStudy.detailedSolution.map((soln, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
                <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                <span>{soln}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Highlights */}
        {caseStudy.highlights && caseStudy.highlights.length > 0 && (
          <div className="mt-8">
            <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] mb-6" />
            <section>
              <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-3 font-mono-code">
                HIGHLIGHTS
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {caseStudy.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] dark:border-[#262626] bg-[var(--color-surface)] dark:bg-[#141414] text-[12px] sm:text-[13px] font-mono-code text-[var(--color-primary)] dark:text-[#d4d4d8] shadow-sm hover:border-emerald-500/40 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#3ecf8e] shrink-0" />
                    <span className="text-xs">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
            <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] mt-6" />
          </div>
        )}

        {/* Section: Challenges */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            CHALLENGES
          </p>
          <ul className="space-y-2.5">
            {caseStudy.challenges.map((soln, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
                <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                <span>{soln}</span>
              </li>
            ))}
          </ul>
        </section>
        )}
        

        {/* Section: Demo and Screenshots */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2">
            DEMO AND SCREENSHOTS
          </p>

          {/* Media Tabs if video is available */}
          {videoUrl && (
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => handleTabChange("screenshots")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all border ${
                  activeTab === "screenshots"
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-500 font-semibold"
                    : "border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] bg-[var(--color-surface)]"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Screenshots
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("video")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all border ${
                  activeTab === "video"
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-500 font-semibold"
                    : "border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] bg-[var(--color-surface)]"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                Demo Video
              </button>
            </div>
          )}

          {/* Screenshots Panel */}
          {activeTab === "screenshots" && (
            <div className="space-y-3">
              {assets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedImage(asset.path)}
                      className="group relative aspect-[16/10] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] overflow-hidden cursor-pointer shadow-sm hover:border-emerald-500/60 transition-all flex flex-col justify-between"
                    >
                      <div className="w-full h-full relative overflow-hidden bg-black/5 dark:bg-black/30">
                        <Image
                          src={asset.path}
                          alt={asset.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[11px] text-zinc-200">
                        {asset.title}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="aspect-[16/10] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] flex flex-col items-center justify-center text-[var(--color-secondary)] text-xs p-4 text-center">
                    <Monitor className="w-6 h-6 mb-2 opacity-60" />
                    <span>Live UI Preview & Telemetry</span>
                  </div>
                  <div className="aspect-[16/10] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] flex flex-col items-center justify-center text-[var(--color-secondary)] text-xs p-4 text-center">
                    <ShieldCheck className="w-6 h-6 mb-2 opacity-60 text-emerald-500" />
                    <span>System Architecture Overview</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Panel */}
          {activeTab === "video" && videoUrl && (
            <div className="aspect-video w-full rounded-lg border border-[var(--color-border)] overflow-hidden bg-black shadow-sm">
              {videoLoaded && (
                <iframe
                  src={videoUrl}
                  title={`${caseStudy.title} Demo Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              )}
            </div>
          )}
        </section>

        {/* Section: Tech Stack */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2">
            TECH STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:border-emerald-500/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Live Site Link Row */}
        {caseStudy.url && (
          <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
            {caseStudy.isAccessibleByUrl ? (
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-400 hover:underline transition-all"
              >
                Visit live site
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-[var(--color-secondary)]">
                Internal / Enterprise deployment ({caseStudy.url})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={selectedImage}
                  alt="Expanded view"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
