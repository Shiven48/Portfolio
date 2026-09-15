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
      case "blueprint":
        return "pattern-blueprint";
      default:
        return "pattern-blueprint";
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
    </div>
  );
}
