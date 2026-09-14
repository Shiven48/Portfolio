"use client";

import React from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HeroRotatingCard } from "@/components/HeroRotatingCard";

const Herobody = () => {
  return (
    <section id="home" className="w-full pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-xs font-mono-code font-semibold tracking-wider text-[var(--color-accent)] uppercase">
                ML Systems Engineer · Fullstack & CUDA · Mumbai
              </span>
            </div>

            {/* Main Headline with Accent Underline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[var(--color-primary)] leading-[1.15]">
              It started with building{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 text-[var(--color-primary)]">
                  scalable systems
                </span>
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[var(--color-accent)]/35 -z-0 rounded-full" />
              </span>{" "}
              and algorithms that learn.
            </h1>

            {/* Description / Bio Text */}
            <p className="text-base sm:text-lg text-[var(--color-secondary)] font-normal max-w-xl leading-relaxed">
              Fullstack developer and systems thinker obsessed with deep learning pipelines,
              real-time processing, and clean web platforms. Hooked on building resilient software
              from kernel space to the browser.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#trajectory"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold btn-cta shadow-md hover:shadow-lg transition-all"
              >
                <span>View the work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold btn-outline-custom shadow-sm transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
                <span>Get in touch</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Visual Rotating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <HeroRotatingCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Herobody;
