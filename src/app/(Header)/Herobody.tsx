"use client";

import React from "react";
import { ArrowRight, Mail, Book } from "lucide-react";
import { motion } from "framer-motion";
import { HeroRotatingCard } from "@/components/HeroRotatingCard";
import projectData from "@/../data/data.json";

const Herobody = () => {
  return (
    <section id="home" className="w-full pt-10 pb-16 md:pt-16 md:pb-24 h-full">
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
            {/* <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-xs font-mono-code font-semibold tracking-wider text-[var(--color-accent)] uppercase">
                {projectData.role} · Mumbai
              </span>
            </div> */}

            {/* Main Headline with Accent Underline */}
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-[2.50rem] font-bold tracking-tight text-[var(--color-primary)] leading-[1.15]">
              I build production AI systems{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 text-[var(--color-primary)]">
                  on top of the edge sockets
                </span>
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[var(--color-accent)]/35 -z-0 rounded-full" />
              </span>{" "}
              and clinical hardware.
            </h1>

            {/* Description / Bio Text */}
            <p className="text-base sm:text-lg text-[var(--color-secondary)] font-normal max-w-xl leading-relaxed">
              Founding AI Engineer specializing in zero-telemetry LLM security, high-throughput protocol engines, and local-first architecture.
            </p>

            {/* Action Buttons (1+2 Split on smaller screens, inline flex on sm+) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#trajectory"
                className="col-span-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl sm:rounded-full text-sm font-semibold btn-cta shadow-md hover:shadow-lg active:scale-[0.98] transition-all min-h-[46px]"
              >
                <span>View the work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="col-span-1 inline-flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold btn-outline-custom shadow-xs sm:shadow-sm active:scale-[0.98] transition-all min-h-[44px] sm:min-h-0"
              >
                <Mail className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                <span className="truncate">Get in touch</span>
              </a>

              <a
                href="https://sg-res.tiiny.site"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 inline-flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold btn-outline-custom shadow-xs sm:shadow-sm active:scale-[0.98] transition-all min-h-[44px] sm:min-h-0"
              >
                <Book className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                <span className="truncate">Resume</span>
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
