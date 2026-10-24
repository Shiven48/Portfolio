"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import projectData from "@/../data/data.json";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getSectionHref = (section: string) => {
    const slug = section.toLowerCase().trim();
    if (slug === "home") return "/";
    if (slug === "about") return "/about";
    if (slug === "projects") return "/projects";
    if (slug === "contact") return "/contact";
    if (slug === "blogs") return "/writings";
    return `/${slug}`;
  };

  const isSectionActive = (section: string) => {
    const slug = section.toLowerCase().trim();
    switch(slug){
      case "home":
        return pathname === "/";
      case "about":
        return pathname === "/about" || pathname?.startsWith("/about");
      case "projects":
        return pathname === "/projects" || pathname?.startsWith("/projects");
      case "contact":
        return pathname === "/contact" || pathname?.startsWith("/contact");
      case "blogs":
        return pathname === "/writings" || pathname?.startsWith("/writings");
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-surface)]/85 border-b border-[var(--color-border)] transition-colors duration-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Identity / Monogram */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-md bg-[var(--color-cta)] text-[var(--color-cta-text)] flex items-center justify-center font-mono-code font-bold text-xs tracking-wider group-hover:scale-105 transition-transform">
            SR
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[var(--color-primary)]">
                {projectData.name} {projectData.surname}
              </span>
            </div>
            <span className="text-[11px] text-[var(--color-secondary)] font-mono-code leading-none">
              Fullstack & ML Engineer · Mumbai, IN
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links from data.json navSections */}
        <nav className="hidden md:flex items-center gap-2">
          {projectData.navSections.map((section) => {
            const active = isSectionActive(section);
            return (
              <Link
                key={section}
                href={getSectionHref(section)}
                className={`text-xs font-mono-code px-3 py-1.5 rounded-full transition-all duration-150 ${
                  active
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 font-semibold shadow-xs"
                    : "text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {section}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {projectData.navSections.map((section) => {
              const active = isSectionActive(section);
              return (
                <Link
                  key={section}
                  href={getSectionHref(section)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-mono-code py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold border border-[var(--color-accent)]/30"
                      : "text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]"
                  }`}
                >
                  <span>{section}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--color-border)] flex items-center gap-4">
            {projectData.socials.map((soc) => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-[var(--color-secondary)] hover:text-[var(--color-primary)] flex items-center gap-1"
              >
                {soc.platform} <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;