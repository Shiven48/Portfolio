import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import { TrajectoryCoverflow } from "@/components/TrajectoryCoverflow";
import { BlogsSection } from "@/components/BlogsSection";
import { ContactSection } from "@/components/ContactSection";

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
      <BlogsSection />

      {/* Stats & Highlights Bar */}
      {/* <StatsBanner /> */}

      {/* Get in Touch & Minimalist Footer */}
      <ContactSection />
    </main>
  );
}