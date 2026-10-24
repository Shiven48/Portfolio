import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import { TrajectoryCoverflow } from "@/components/TrajectoryCoverflow";
import { BlogsSection } from "@/components/BlogsSection";
import { ContactSection } from "@/components/ContactSection";
import projectData from "@/../data/data.json";
import { StatsBanner } from "@/components/StatsBanner";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section (Left Text + Right 3.5s Rotating Terminal Card) */}
      <Herobody />

      {/* Trajectory Coverflow Carousel (Task 4: Middle Pop-out Card with 5s Timer) */}
      <TrajectoryCoverflow />

      {/* Selected Writings / Blogs (Task 5: In place of selected work) */}
      {projectData.blogs.length > 0 && (
        <BlogsSection />
      )}

      {/* Stats & Highlights Bar */}
      <StatsBanner />

      {/* Get in Touch & Minimalist Footer */}
      <div className="w-full max-w-6xl h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_60%,transparent)] mx-auto"/>
      <ContactSection />
    </main>
  );
}