"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Linkedin, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSocials, type Socials } from "@/lib/utils";

type RotationItem = Socials;

export function HeroRotatingCard() {
  const [timeString, setTimeString] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items: RotationItem[] = getSocials();

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
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const current = items[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-lg mx-auto surface-card rounded-2xl p-5 sm:p-6 shadow-xl border border-[var(--color-border)] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
        {/* Terminal macOS Dots + Label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            <span className="text-xs font-mono-code font-medium text-[var(--color-secondary)]">
              shiven@system
            </span>
          </div>
        </div>

        {/* Live Location and Time */}
        <div className="flex items-center gap-2 text-right">
          <span className="text-[10px] sm:text-xs font-mono-code text-[var(--color-secondary)] font-medium">
            MUMBAI, IN
          </span>
          <span className="text-[10px] sm:text-xs font-mono-code font-bold text-[var(--color-primary)] bg-[var(--color-border)]/40 px-2 py-0.5 rounded">
            {timeString || "00:00:00"} IST
          </span>
        </div>
      </div>

      {/* Animated Body Card Content */}
      <div className="min-h-[260px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Tag & Pill */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code tracking-wider text-[var(--color-accent)] font-semibold">
                NETWORK / {current.badge}
              </span>
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5">
                {current.badge === "GITHUB" ? <Github className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
              </span>
            </div>

            {/* Title & Link */}
            <div>
              <a
                href={current.url}
                target={current.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 group text-2xl font-bold tracking-tight text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <span>{current.platform}</span>
                <ArrowUpRight className="w-5 h-5 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1 line-clamp-2">
                {current.tagline}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-2 text-[11px] font-mono-code pt-1">
              <div>
                <span className="text-[10px] text-[var(--color-secondary)] block uppercase">
                  SIGNAL
                </span>
                <span className="font-semibold text-[var(--color-primary)] truncate block">
                  {current.signal}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--color-secondary)] block uppercase">
                  BASE
                </span>
                <span className="font-semibold text-[var(--color-primary)] truncate block">
                  {current.base}
                </span>
              </div>
            </div>

            {/* Terminal Status Box */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 font-mono-code text-xs space-y-1.5 text-[var(--color-secondary)]">
              <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                <span>ROUTE ESTABLISHED</span>
              </div>
              <div className="pl-3.5 space-y-1 text-[11px]">
                <p className="truncate">
                  <span className="text-[var(--color-accent)]">↳ profile:</span> {current.details.profile}
                </p>
                <p className="truncate">
                  <span className="text-[var(--color-accent)]">↳ status:</span> {current.details.status}
                </p>
              </div>
            </div>

            {/* Terminal CLI prompt line */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono-code text-[var(--color-secondary)] overflow-hidden">
              <span className="text-[var(--color-accent)] font-bold">{">"}</span>
              <span className="truncate text-[var(--color-primary)] font-medium">
                curl {current.url}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer controls & 3.5s counter */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-[var(--color-border)] text-[11px] font-mono-code text-[var(--color-secondary)]">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider font-semibold">
              ROTATING · 3.5s
            </span>
            {isPaused && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--color-border)] text-[var(--color-primary)]">
                PAUSED
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Card Dots Indicator */}
            <div className="flex items-center gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentIndex === i
                      ? "w-4 bg-[var(--color-accent)]"
                      : "bg-[var(--color-border)] hover:bg-[var(--color-secondary)]"
                  }`}
                />
              ))}
            </div>

            <span className="font-bold text-[var(--color-primary)]">
              0{currentIndex + 1} / 0{items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
