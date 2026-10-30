'use client';

import Navbar from "@/app/(Header)/Navbar";
import { AboutProfileCard } from "@/components/AboutProfileCard";
import { AboutExpertiseCard } from "@/components/AboutExpertiseCard";
import { AboutExperienceCard } from "@/components/AboutExperienceCard";
import { AboutAcademicCard } from "@/components/AboutAcademicCard";
import { ContactSection } from "@/components/ContactSection";
import { AboutPersonalProjectsCard } from "@/components/AboutPersonalProjectsCard";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6 flex-1 w-full max-w-7xl">
        {/* Profile: full width */}
        <AboutProfileCard />

        {/* P1: Projects and Experience, equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
          <div className="min-w-0 flex flex-col lg:col-span-6">
            <AboutExperienceCard />
          </div>
          <div className="min-w-0 flex flex-col lg:col-span-4">
            <AboutPersonalProjectsCard />
          </div>
        </div>

        {/* P2: Skills, full width */}
        <div className="min-w-0 w-full">
          <AboutExpertiseCard />
        </div>

        {/* P3: Academic, full width */}
        <div className="min-w-0 w-full">
          <AboutAcademicCard />
        </div>
      </div>

      <ContactSection />
    </main>
  );
}