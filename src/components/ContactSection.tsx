"use client";

import React from "react";
import projectData from "@/../data/data.json";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <footer id="contact" className="w-full pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Get in Touch Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-8 border-b border-[var(--color-border)] gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-mono-code font-bold tracking-widest text-[var(--color-accent)] uppercase">
                COMMUNICATION CHANNEL
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-primary)]">
              Get in touch
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary)] leading-relaxed">
              Always glad to talk shop - edge inference, distributed systems, and open source.
            </p>
          </div>

          {/* Quick links & Say Hello button */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code font-semibold btn-cta shadow-md hover:shadow-lg transition-all ml-2"
            >
              <span>Say hello</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Minimal Footer line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-[var(--color-secondary)] gap-4">
          <div>
            © {new Date().getFullYear()} {projectData.name} {projectData.surname} · {projectData.role}
          </div>
        </div>
      </div>
    </footer>
  );
}
