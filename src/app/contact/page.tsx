"use client";

import React from "react";
import Navbar from "../(Header)/Navbar";
import FormspreeCard from "@/components/FormspreeCard";
import projectData from "@/../data/data.json";
import { Github, Linkedin, ArrowUpRight, Mail } from "lucide-react";

export default function ContactPage() {
  const socials = projectData.socials.filter(
    (s) =>
      s.platform.toLowerCase() === "linkedin" ||
      s.platform.toLowerCase() === "github"
  );

  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8 flex-1 w-full">
        {/* Header Title Section */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-primary)]">
            Let&apos;s Connect
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-secondary)]">
            Ready to bring your ideas to life? Let&apos;s start a conversation.
          </p>
        </div>

        {/* 2-Column Grid: Form on left, Other ways on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Formspree Form */}
          <div className="lg:col-span-7       ">
            <FormspreeCard />
          </div>

          {/* Right Column: Other Ways to Reach Me */}
          <div className="lg:col-span-5 space-y-6">
            <div className="surface-card rounded-2xl p-6 sm:p-7 space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-primary)] tracking-tight">
                Other Ways to Reach Me
              </h2>

              <div className="space-y-3">
                {socials.map((social) => {
                  const isGithub = social.platform.toLowerCase() === "github";
                  const isLinkedin = social.platform.toLowerCase() === "linkedin";

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-card surface-card-hover rounded-xl p-4 flex items-center justify-between group border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                          {isGithub ? (
                            <Github className="w-5 h-5" />
                          ) : isLinkedin ? (
                            <Linkedin className="w-5 h-5" />
                          ) : (
                            <Mail className="w-5 h-5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                            {social.platform}
                          </h3>
                          <p className="text-xs text-[var(--color-secondary)] font-mono-code truncate">
                            {social.tagline}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--color-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Information Banner */}
        <div className="surface-card rounded-xl p-4 text-center border border-[var(--color-border)]">
          <p className="text-xs sm:text-sm text-[var(--color-secondary)]">
            <span className="font-semibold text-[var(--color-primary)] font-mono-code">
              Response time:
            </span>{" "}
            I typically respond within 24-48 hours.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-[var(--color-border)] mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-[var(--color-secondary)] gap-4">
          <div>
            © {new Date().getFullYear()} {projectData.name} {projectData.surname} · {projectData.role}
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
