"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import projectData from "@/../data/data.json";
import { Home, User, FolderOpen, PenLine, Mail, type LucideIcon } from "lucide-react";
import { Tabs, type TabItem } from "@/components/Tabs";

const getSlug = (section: string) => section.toLowerCase().trim();

const getSectionHref = (section: string) => {
  const slug = getSlug(section);
  if (slug === "home") return "/";
  if (slug === "about") return "/about";
  if (slug === "projects") return "/projects";
  if (slug === "contact") return "/contact";
  if (slug === "blogs") return "/writings";
  return `/${slug}`;
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  writings: PenLine,
  contact: Mail,
};

const isSectionActive = (section: string, pathname: string | null) => {
  const slug = getSlug(section);
  const path = pathname ?? "";
  switch (slug) {
    case "home":
      return path === "/";
    case "about":
      return path.startsWith("/about");
    case "projects":
      return path.startsWith("/projects");
    case "contact":
      return path.startsWith("/contact");
    case "blogs":
      return path.startsWith("/writings");
    default:
      return false;
  }
};

const Navbar = () => {
  const pathname = usePathname();

  const tabs: TabItem[] = projectData.navSections.map((section) => ({
    value: section,
    label: section,
    href: getSectionHref(section),
    icon: SECTION_ICONS[getSlug(section)],
  }));

  const activeSection =
    projectData.navSections.find((section) => isSectionActive(section, pathname)) ?? "";

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-surface)]/85 border-b border-[var(--color-border)] transition-colors duration-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none min-w-0">
            <div className="w-8 h-8 shrink-0 rounded-md bg-[var(--color-cta)] text-[var(--color-cta-text)] flex items-center justify-center font-mono-code font-bold text-xs tracking-wider group-hover:scale-105 transition-transform">
              SR
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm tracking-tight text-[var(--color-primary)] truncate">
                {projectData.name} {projectData.surname}
              </span>
              <span className="text-[11px] text-[var(--color-secondary)] font-mono-code leading-none truncate">
                {projectData.role} · {projectData.Academic.location}
              </span>
            </div>
          </Link>

          {/* Desktop: pill tabs in the header */}
          <Tabs
            items={tabs}
            value={activeSection}
            variant="pill"
            ariaLabel="Site navigation"
            className="hidden md:flex justify-end"
          />
        </div>
      </header>

      {/* Mobile: fixed bottom tab bar, like a React Native app */}
      <Tabs
        items={tabs}
        value={activeSection}
        variant="tabbar"
        ariaLabel="Site navigation"
        className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      />
    </>
  );
};

export default Navbar;