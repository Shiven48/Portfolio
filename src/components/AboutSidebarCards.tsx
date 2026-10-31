"use client";

import React from "react";
import { Link2Icon } from "lucide-react";
import { Writing, getBlogs } from "@/lib/utils";

export function AboutSidebarCards() {
  const blogs:Writing[] = getBlogs();
  const sidebarData = [... blogs];

  return (
    <div className="space-y-6">
      {/* 1. YouTube & Content Channels Card (Matching Screenshot 1 & 2) */}
      <div className="surface-card rounded-2xl p-5 sm:p-6 space-y-4 transition-all duration-300">
        <div className="border-b border-[var(--color-border)] pb-2">
          <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
            CONTENT
          </span>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-primary)]">
            WRITE-UPS
          </h3>
        </div>

        <div className="space-y-3">
          {sidebarData.map((data:Writing) => {
            return (
            <a
              key={data.title}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-background)]/60 border border-[var(--color-border)] hover:border-[var(--color-accent)] group transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Add Blog preview image here */}
                <div className="flex flex-col space-y-1">
                  <div className="text-xs font-bold font-mono-code text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {data.title}
                  </div>
                  <div className="text-[11px] text-[var(--color-secondary)] font-mono-code">
                    {data.readTime}
                  </div>
                </div>
              </div>
              <Link2Icon className="w-4 h-4 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 ml-2" />
            </a>
            )
          })}
        </div>
      </div>
    </div>
  );
}
