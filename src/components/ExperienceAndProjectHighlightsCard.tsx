import { ProjectHighlight } from "@/lib/utils";
import { Check, ExternalLink, List, Target } from "lucide-react";

export function ExperienceAndProjectHighlightsCard({
    index,
    data,
  }: {
    index: number;
    data: ProjectHighlight;
  }){
    return (
         <li
            key={data.title || index}
            className="py-5 sm:py-[22px] first:pt-4 sm:first:pt-5 last:pb-0"
          >
            {/* Top row: Marker, Title and CTA */}
            <div className="flex flex-row sm:items-center justify-between gap-3">
              <h3 className="flex items-center gap-2.5 text-[16px] sm:text-[17px] font-semibold leading-snug text-[var(--color-primary)]">
                <span
                  className="relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>{data.title}</span>
              </h3>

              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors self-start"
              >
                <span>Visit Live</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Objective */}
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-secondary)] mt-4 sm:mt-[18px]">
              <Target className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Objective</span>
            </div>
            <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-[var(--color-primary)]">
              {data.objective}
            </p>

            {/* Key highlights */}
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-secondary)] mt-4 sm:mt-[18px]">
              <List className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Key highlights</span>
            </div>
            <ul className="mt-2.5 grid grid-cols-2 gap-2 list-none">
              {data.highlights && data.highlights.slice(0, 4).map((h, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[16px_1fr] items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-[var(--color-secondary)] [&_strong]:text-[var(--color-primary)] [&_strong]:font-semibold"
                >
                  <Check
                    className="w-3.5 h-3.5 text-emerald-500 mt-1 shrink-0 stroke-[2.2]"
                    aria-hidden="true"
                  />
                  <span dangerouslySetInnerHTML={{ __html: h }} />
                </li>
              ))}
            </ul>
          </li>
    )
  }