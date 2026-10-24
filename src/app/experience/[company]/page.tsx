import React from "react";
import Navbar from "@/app/(Header)/Navbar";
import { ContactSection } from "@/components/ContactSection";
import SGCaseStudy from "@/components/SGCaseStudy";
import { getCaseStudyByProject, queryType } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LabridgeCaseStudy from "@/components/LabridgeCaseStudy";


enum ProjectType {
  LIBRIDGE = "labridge",
  SILENTGUARD = "silentguard",
}

function NoCaseStudyFound({company}:{company:string}){
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 font-mono-code text-center">
      <p className="text-sm text-[var(--color-secondary)] mb-2">404 &middot; Case Study Not Found</p>
      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
        No Case Study found for &quot;{company}&quot;
      </h2>
      <Link
        href="/#trajectory"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to trajectory
      </Link>
    </div>
  )
}

function renderCaseStudy(company:string){
  const companyLower = company.toLocaleLowerCase()  
  switch(companyLower){
    case ProjectType.SILENTGUARD:
      const caseStudyData = getCaseStudyByProject(queryType.silentguard);
      if(!caseStudyData) return <NoCaseStudyFound company={company} />
      return <SGCaseStudy caseStudy={caseStudyData} />
    case ProjectType.LIBRIDGE:
      return <LabridgeCaseStudy />
      default:
      return <NoCaseStudyFound company={company} />
  }
}  


const ProjectPage = async ({
  params,
}: {
  params: Promise<{ company: queryType }>;
}) => {
  const { company } = await params;
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-background)]">
      <Navbar />
      {renderCaseStudy(company)}
      <ContactSection />
    </main>
  );
};

export default ProjectPage;
