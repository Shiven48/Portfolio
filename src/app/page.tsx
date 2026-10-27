import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import { TrajectoryCoverflow } from "@/components/TrajectoryCoverflow";
import { BlogsSection } from "@/components/BlogsSection";
import { ContactSection } from "@/components/ContactSection";
import projectData from "@/../data/data.json";
import { StatsBanner } from "@/components/StatsBanner";

function SectionSeperator() {
  return (
    <div className="w-[90%] h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_60%,transparent)] mx-auto"/>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section (Left Text + Right 3.5s Rotating Terminal Card) */}
      <Herobody />
      <SectionSeperator />

      {/* Trajectory Coverflow Carousel (Task 4: Middle Pop-out Card with 5s Timer) */}
      <TrajectoryCoverflow />
      <SectionSeperator />

      {/* Selected Writings / Blogs (Task 5: In place of selected work) */}
      {projectData.blogs.length > 0 && (
        <BlogsSection />
      )}
      <SectionSeperator />

      {/* Stats & Highlights Bar */}
      <StatsBanner />
      <SectionSeperator />

      {/* Get in Touch & Minimalist Footer */}
      <ContactSection />
    </main>
  );
}