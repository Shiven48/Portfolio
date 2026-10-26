'use client';

import React, { useState } from "react";
import Navbar from "@/app/(Header)/Navbar";
import { AboutProfileCard } from "@/components/AboutProfileCard";
import { AboutExpertiseCard } from "@/components/AboutExpertiseCard";
import { AboutExperienceCard } from "@/components/AboutExperienceCard";
import { AboutAcademicCard } from "@/components/AboutAcademicCard";
import { AboutSidebarCards } from "@/components/AboutSidebarCards";
import { ContactSection } from "@/components/ContactSection";

export default function AboutPage() {
  const [isSidebarPresent] = useState<Boolean>(false);

  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6 flex-1 w-full">
        <AboutProfileCard />

        <div className="flex flex-col lg:flex-row gap-6 items-start mx-auto">
          {isSidebarPresent ?
          <>
            <div className={`w-full ${isSidebarPresent ? 'lg:w-[60%]' : 'lg:w-full'} space-y-6`}>   
              <AboutExpertiseCard />
              <AboutAcademicCard />
              <AboutExperienceCard />
              {/* <AboutPersonalProjectsCard /> */}
            </div>
            </>
          :<>
            <div className={`w-full ${isSidebarPresent ? 'lg:w-[60%]' : 'lg:w-full'} space-y-6`}>   
              <AboutExpertiseCard />
              <AboutAcademicCard />
              {/* <AboutPersonalProjectsCard /> */}
            </div>
              <AboutExperienceCard />
          </>
          }

          {isSidebarPresent ? (
            <div className="w-full lg:w-[45%] space-y-6 lg:sticky lg:top-20">
              <AboutSidebarCards />
            </div>
          ) : null}
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
