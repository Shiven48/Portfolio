import palettesData from "@/../data/palettes.json";

export type PaletteId =
  | "dark-terminal"

export interface PaletteColors {
  colorBackground: string;
  colorSurface: string;
  colorPrimary: string;
  colorSecondary: string;
  colorBorder: string;
  colorAccent: string;
  colorCta: string;
  colorCtaText: string;
}

export interface Palette {
  id: PaletteId;
  name: string;
  colors: PaletteColors;
}

export const palettes: Palette[] = palettesData.palettes as Palette[];

export function getPalette(id: PaletteId): Palette {
  const found = palettes.find((p) => p.id === id);
  if (!found) {
    return palettes[0];
  }
  return found;
}

export function paletteToCssVars(colors: PaletteColors) {
  return Object.entries(colors).reduce((acc, [key, value]) => {
    const cssVar = "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
    acc[cssVar] = value;
    return acc;
  }, {} as Record<string, string>);
}
