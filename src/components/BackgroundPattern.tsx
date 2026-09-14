"use client";

import React, { useEffect, useState } from "react";
import { PatternType } from "./ThemeCustomizer";

export function BackgroundPattern() {
  const [pattern, setPattern] = useState<PatternType>("grid");

  useEffect(() => {
    const savedPattern = localStorage.getItem("portfolio-pattern") as PatternType;
    if (savedPattern) {
      setPattern(savedPattern);
    }

    const handlePatternChange = (e: Event) => {
      const customEvent = e as CustomEvent<PatternType>;
      if (customEvent.detail) {
        setPattern(customEvent.detail);
      }
    };

    window.addEventListener("pattern-change", handlePatternChange);
    return () => {
      window.removeEventListener("pattern-change", handlePatternChange);
    };
  }, []);

  const getPatternClass = () => {
    switch (pattern) {
      case "grid":
        return "pattern-grid";
      case "dots":
        return "pattern-dots";
      case "cross":
        return "pattern-cross";
      case "blueprint":
        return "pattern-blueprint";
      case "none":
      default:
        return "pattern-none";
    }
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-all duration-300 overflow-hidden"
    >
      {/* Pattern Canvas */}
      <div
        className={`absolute inset-0 opacity-80 ${getPatternClass()} transition-opacity duration-300`}
      />

      {/* Subtle radial ambient highlight for depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-15 blur-[120px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
