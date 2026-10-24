"use client";

import React, { useEffect, useState } from "react";
import { palettes, getPalette, paletteToCssVars, PaletteId } from "@/lib/theme";
import { Palette as PaletteIcon, Grid, Sliders, Check, ChevronDown, Sparkles } from "lucide-react";

export type PatternType = "grid" | "blueprint";
export type SkillPatternType = "default" | "filterable" | "hierarchy";

const PATTERNS: { id: PatternType; name: string }[] = [
  { id: "grid", name: "Modern Grid" },
  { id: "blueprint", name: "Blueprint" },
];

export const SKILL_PATTERNS: { id: SkillPatternType; name: string; desc: string }[] = [
  { id: "default", name: "Default (Inline Rows)", desc: "Horizontal rows with category indicators" },
  { id: "filterable", name: "Filterable Cloud", desc: "Interactive category tag cloud" },
  { id: "hierarchy", name: "Hierarchical Pattern", desc: "Structured cards with colored accents" },
];

export function ThemeCustomizer({
  initialPalette = "dark-terminal",
}: {
  initialPalette?: PaletteId;
}) {
  const [activePalette, setActivePalette] = useState<PaletteId>(initialPalette);
  const [activePattern, setActivePattern] = useState<PatternType>("grid");
  const [activeSkillPattern, setActiveSkillPattern] = useState<SkillPatternType>("default");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedPalette = localStorage.getItem("portfolio-palette") as PaletteId;
    const savedPattern = localStorage.getItem("portfolio-pattern") as PatternType;
    if (savedPalette && palettes.some((p) => p.id === savedPalette)) {
      setActivePalette(savedPalette);
    }
    if (savedPattern && PATTERNS.some((p) => p.id === savedPattern)) {
      setActivePattern(savedPattern);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply CSS vars for palette
    const current = getPalette(activePalette);
    const vars = paletteToCssVars(current.colors);
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
      document.body.style.setProperty(k, v);
    });

    localStorage.setItem("portfolio-palette", activePalette);
  }, [activePalette, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Set background pattern attribute on body
    document.body.setAttribute("data-pattern", activePattern);
    localStorage.setItem("portfolio-pattern", activePattern);

    // Also dispatch custom event so BackgroundPattern listeners update instantly
    window.dispatchEvent(
      new CustomEvent("pattern-change", { detail: activePattern })
    );
  }, [activePattern, mounted]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("portfolio-skill-pattern", activeSkillPattern);
    window.dispatchEvent(
      new CustomEvent("skill-pattern-change", { detail: activeSkillPattern })
    );
  }, [activeSkillPattern, mounted]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Pill */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Theme & Pattern Customizer"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] transition-all duration-200 text-xs font-medium backdrop-blur-md"
        >
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: getPalette(activePalette).colors.colorAccent }}
          />
          <Sliders className="w-3.5 h-3.5" />
          <span className="font-mono-code font-semibold tracking-wide">
            {getPalette(activePalette).name.split("+")[0].trim()}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Flyout Control Panel */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-84 sm:w-96 p-4 rounded-2xl shadow-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
                  Live Style Configurator
                </span>
              </div>
            </div>

            {/* Palettes Selection */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-secondary)] mb-2">
                <PaletteIcon className="w-3.5 h-3.5" /> Color Palette
              </label>
              <div className="grid grid-cols-2 gap-2">
                {palettes.map((p) => {
                  const isSelected = activePalette === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePalette(p.id)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-background)] ring-1 ring-[var(--color-accent)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-secondary)] bg-[var(--color-surface)]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-[11px] truncate">
                          {p.name.split(" ")[0]}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-[var(--color-accent)]" />
                        )}
                      </div>
                      {/* Color Preview Swatches */}
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: p.colors.colorBackground }}
                          title="Background"
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: p.colors.colorPrimary }}
                          title="Primary"
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: p.colors.colorAccent }}
                          title="Accent"
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: p.colors.colorCta }}
                          title="CTA"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Pattern Selection */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-secondary)] mb-2">
                <Grid className="w-3.5 h-3.5" /> Background Pattern
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {PATTERNS.map((pattern) => {
                  const isSelected = activePattern === pattern.id;
                  return (
                    <button
                      key={pattern.id}
                      onClick={() => setActivePattern(pattern.id)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono-code text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-background)] text-[var(--color-accent)] font-semibold"
                          : "border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-secondary)]"
                      }`}
                    >
                      <span>{pattern.name}</span>
                      {isSelected && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
