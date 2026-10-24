import "./global.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getPalette, paletteToCssVars, PaletteId } from "@/lib/theme";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import projectData from "@/../data/data.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${projectData.name} ${projectData.surname} — ${projectData.role}`,
  description:
    "Portfolio of Shiven Royal — Systems, Fullstack Engineering, Machine Learning, and Open Source Projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activePalette = (process.env.NEXT_PUBLIC_PALETTE || "mono-blue") as PaletteId;
  const palette = getPalette(activePalette);
  const cssVars = paletteToCssVars(palette.colors);

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        style={{ ...cssVars } as React.CSSProperties}
        className={`${inter.className} min-h-screen relative antialiased selection:bg-[var(--color-accent)] selection:text-white`}
      >
        <BackgroundPattern />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
        <ThemeCustomizer initialPalette={activePalette} />
      </body>
    </html>
  );
}