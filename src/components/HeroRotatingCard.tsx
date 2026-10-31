"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Linkedin, Github, Code2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSocials, SocialPlatforms, Socials, getLocation } from "@/lib/utils";
import ProjectData from "@/../data/data.json"


const renderSocialsLogo = (badge: SocialPlatforms) => {
  switch(badge){
    case "GITHUB":
      return <Github className="w-6 h-6 text-[var(--color-accent)]" />
    case "LINKEDIN":
      return <Linkedin className="w-6 h-6 text-[var(--color-accent)]" />
    default:
      return <Github className="w-6 h-6 text-[var(--color-accent)]" />
  }
}

const renderSocialSignal = (badge: SocialPlatforms) => {
  switch(badge){
    case "GITHUB":
      return <Code2 className="w-3.5 h-3.5" />
    case "LINKEDIN":
      return <Users className="w-3.5 h-3.5" />
    default:
      return <Code2 className="w-3.5 h-3.5" />
  }
}

export function HeroRotatingCard() {
  const [timeString, setTimeString] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const socials: Socials[] = getSocials();

  // Clock updater
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3.5s auto rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, socials.length]);

  const currentSocial = socials[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-sm mx-auto surface-card rounded-2xl p-5 sm:p-6 shadow-xl border border-[var(--color-border)] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
         <div className="flex items-center gap-2">
            {
              isPaused ?
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] " /> 
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(socials.length).padStart(2, "0")}
                  </span>
                </div>
              : <div className="flex items-center gap-1.5 ml-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" /> 
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--color-accent)]">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(socials.length).padStart(2, "0")}
                </span>
              </div>
            }
        </div>

        {/* Name and Location */}
        <div className="flex items-center gap-2 text-right">
          <span className="text-[10px] sm:text-xs font-mono-code text-[var(--color-secondary)] font-medium">
            {ProjectData.name} |
          </span>
          <span className="text-[10px] sm:text-xs font-mono-code text-[var(--color-secondary)] font-medium">
            {ProjectData.Academic.location}
          </span>
        </div>
      </div>

      {/* Animated Body Card Content */}
      <div className="min-h-[140px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Bento Split Header: Left full SVG logo tile, Right platform title & signal */}
            <div className="flex items-center gap-3.5">
              {/* Left Bento Tile: Full SVG Logo */}
              <div className="shrink-0 w-[52px] h-[52px] rounded-[14px] bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center shadow-xs">
                {renderSocialsLogo(currentSocial.badge as SocialPlatforms)}
              </div>

              {/* Right Half: Platform Title + Arrow & Signal Pill */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <a
                  href={currentSocial.url}
                  target={currentSocial.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors leading-none"
                >
                  <span>{currentSocial.platform}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <span className="self-start inline-flex items-center gap-1.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[11px] font-mono-code font-semibold tracking-wider uppercase text-[var(--color-accent)]">
                  {renderSocialSignal(currentSocial.badge as SocialPlatforms)}
                  <span>{currentSocial.signal}</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1 line-clamp-2">
              {currentSocial.tagline}
            </p>

            {/* Highlighted Status Display */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-xs font-mono-code shadow-xs overflow-hidden">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
                </span>                
              </div>
              <span className="sm:text-sm font-mono-code mt-1 line-clamp-2-[var(--color-primary)] text-xs" title={currentSocial.status}>
                {currentSocial.status}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
