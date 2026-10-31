"use client";

import React from "react";
import projectData from "@/../data/data.json";
import { MapPin, Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export function AboutProfileCard() {
  const linkedinSocial = projectData.socials.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );
  const githubSocial = projectData.socials.find(
    (s) => s.platform.toLowerCase() === "github"
  );

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left: Bio & Details */}
        <div className="space-y-3">
          <div className="space-y-3">
            <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
              ABOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-primary)]">
              {projectData.name} {projectData.surname}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[var(--color-secondary)]">
              {projectData.role}
            </p>
          </div>

          {/* Contact & Location Metadata Badges */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5 text-xs text-[var(--color-secondary)] font-mono-code">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)] shrink-0" />
              <span>{projectData.Academic.location}</span>
            </div>

            <a
              href={`mailto:${projectData.email}`}
              className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--color-secondary)] shrink-0" />
              <span>{projectData.email_placeholder}</span>
            </a>
          </div>
        </div>

        {/* Right: Social Action CTA Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start">
           {linkedinSocial && (
            <a
              href={linkedinSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 inline-flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold btn-outline-custom shadow-xs sm:shadow-sm active:scale-[0.98] transition-all min-h-[44px] sm:min-h-0"
            >
              <Linkedin className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
              <span className="truncate">LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </a>
          )}

          {githubSocial && (
            <a
              href={githubSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 inline-flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold btn-outline-custom shadow-xs sm:shadow-sm active:scale-[0.98] transition-all min-h-[44px] sm:min-h-0"
            >
              <Github className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
              <span className="truncate">GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
