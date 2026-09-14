/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border, hsl(var(--border)))",
        input: "hsl(var(--input))",
        ring: "var(--color-accent, hsl(var(--ring)))",
        background: "var(--color-background, hsl(var(--background)))",
        foreground: "var(--color-primary, hsl(var(--foreground)))",
        surface: "var(--color-surface, hsl(var(--card)))",
        cta: "var(--color-cta, #18181B)",
        "cta-text": "var(--color-cta-text, #FFFFFF)",
        primary: {
          DEFAULT: "var(--color-primary, hsl(var(--primary)))",
          foreground: "var(--color-surface, hsl(var(--primary-foreground)))",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, hsl(var(--secondary)))",
          foreground: "var(--color-primary, hsl(var(--secondary-foreground)))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "var(--color-secondary, hsl(var(--muted)))",
          foreground: "var(--color-secondary, hsl(var(--muted-foreground)))",
        },
        accent: {
          DEFAULT: "var(--color-accent, hsl(var(--accent)))",
          foreground: "var(--color-cta-text, hsl(var(--accent-foreground)))",
        },
        popover: {
          DEFAULT: "var(--color-surface, hsl(var(--popover)))",
          foreground: "var(--color-primary, hsl(var(--popover-foreground)))",
        },
        card: {
          DEFAULT: "var(--color-surface, hsl(var(--card)))",
          foreground: "var(--color-primary, hsl(var(--card-foreground)))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage:{
        circularLight : 'repeating-radial-gradient(rgba(0,0,0,0.6) 2px,#F8FAFC 5px,#F8FAFC 120px);',
        circularLightsm : 'repeating-radial-gradient(rgba(0,0,0,0.6) 2px,#F8FAFC 5px,#F8FAFC 45px);',
        circularDark : 'repeating-radial-gradient(rgba(192, 192, 192, 0.5) 2px,#1F2937 5px,#0f172a 120px);',
        circularDarksm : 'repeating-radial-gradient(rgba(0,0,0,0.6) 2px,#1F2937 5px,#0f172a 45px);',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}