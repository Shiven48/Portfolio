"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadAssets, AssetMeta } from "@/lib/utils";
import { ArrowUpRight, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 min-w-0 h-full px-3 py-2 rounded-lg border border-[var(--color-border)] dark:border-[#262626] bg-[var(--color-surface)] dark:bg-[#141414] font-mono-code text-[11px] sm:text-xs leading-snug text-[var(--color-primary)] dark:text-[#d4d4d8] transition-colors hover:border-emerald-500/40">
      <span className="w-1 h-1 rounded-full bg-[#3ecf8e] shrink-0" />
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}

export default function LabridgeCaseStudy() {
  const [assets, setAssets] = useState<AssetMeta[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadAssets("labridge");
    setAssets(loaded);
  }, []);

  const getAsset = (identifier: string) => {
    return assets.find(
      (a) =>
        a.path.toLowerCase().includes(identifier.toLowerCase()) ||
        a.title.toLowerCase().includes(identifier.toLowerCase())
    );
  };

  const assetI1 = getAsset("I-1") || {
    id: 3,
    title: "Erba Elite 580 Hematology Analyzer",
    path: "/images/labridge/I-1.jpeg",
  };
  const assetI4 = getAsset("I-4") || {
    id: 5,
    title: "Logs Snapshot",
    path: "/images/labridge/I-4.jpeg",
  };
  const assetI5 = getAsset("I-5") || {
    id: 6,
    title: "Parser Configuration for analyzer profiles",
    path: "/images/labridge/I-5.png",
  };

  const highlights = [
    "HIPAA Compliant",
    "100% data integrity",
    "HL7 Protocol",
    "Realtime Local Record Processing",
  ];

  return (
    <div className="w-full min-h-screen py-10 md:py-16 transition-colors bg-[var(--color-background)] text-[var(--color-primary)] font-mono-code">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div>
          <Link
            href="/#trajectory"
            className="text-[11px] text-[#3ecf8e] hover:underline transition-all inline-block font-mono-code"
          >
            &larr; Back to trajectory
          </Link>
        </div>

        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mt-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-primary)] font-mono-code">
              From Black Box to Production: Building a Custom LIS in Three Months
            </h1>
            <p className="text-[13px] text-[#a1a1aa] mt-1 font-mono-code">
              Labridge &middot; LIS Developer Intern &middot; 2–3 Months Timeline
            </p>
            <p className="text-[13px] text-[#71717a] mt-1 font-mono-code">
              Reverse-engineering proprietary medical analyzer protocols and building an end-to-end, production-grade LIS.
            </p>
          </div>

          <div className="shrink-0 pt-0.5">
            <span className="inline-block px-3 py-[2px] rounded-full text-[11px] font-mono-code border border-[#854f0b] text-[#efb034] bg-transparent">
              INTERNAL
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 1: Executive Summary */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            1. EXECUTIVE SUMMARY
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
            This case study describes the design and development of a custom Laboratory Information System (LIS) built to integrate with a hematology analyzer and its vendor LIS. The project addressed a common but under-documented problem in healthcare IT: proprietary LIS software with no public documentation, no standard field mappings, and no universal parser.
          </p>
          <blockquote className="my-3 pl-4 border-l-2 border-[#3ecf8e]/60 bg-emerald-500/[0.04] py-2.5 pr-3 rounded-r text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 italic">
            The result was a configurable, modular LIS that reliably receives, parses, validates, persists, and exposes lab result data. It removed dependency on third-party LIS vendors for business reliability, reduced operational costs, and processed results with 100% parsing accuracy in real time. The system became a critical piece of the lab&apos;s daily operations.
          </blockquote>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 2: Background and Context */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            2. BACKGROUND AND CONTEXT
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
            Laboratory analyzers generate medical test results and transmit them to a host system. The host system - typically a Laboratory Information System (LIS) - receives that data, validates it, displays it for lab technicians, and forwards it to downstream systems.
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mt-3">
            In practice, this communication is fragmented:
          </p>
          <ul className="space-y-2 mt-2">
            {[
              "Analyzers communicate over serial (RS-232) or network (TCP/IP) connections.",
              "Data is transmitted using ASTM (E1381/E1394) or HL7 v2 protocols.",
              "Most vendor LIS software is proprietary, poorly documented, and behaves as a black box.",
              "Even when vendors follow the same protocol, field structures vary - patient name placement, middle name handling, result encoding, and batching behavior all differ.",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
              >
                <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <blockquote className="my-4 pl-4 border-l-2 border-[#3ecf8e]/60 bg-emerald-500/[0.04] py-2.5 pr-3 rounded-r text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 italic">
            The setting was a diagnostic chain offering multiple medical tests. The lab contained 5–6 machines, each responsible for a separate test type, handling around 100–500 samples daily across blood, urine, and other sample types. The primary focus of this project was building an LIS for an <strong className="font-semibold text-[var(--color-primary)] not-italic">Erba Elite 580 hematology analyzer</strong>.
          </blockquote>

          {/* Asset I-1: Hematology Analyzer */}
          <div className="mt-5">
            <div
              onClick={() => setSelectedImage(assetI1.path)}
              className="group relative w-full h-[280px] sm:h-[380px] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] dark:bg-[#141414] overflow-hidden cursor-pointer shadow-sm hover:border-emerald-500/60 transition-all flex items-center justify-center"
            >
              <Image
                src={assetI1.path}
                alt={assetI1.title}
                fill
                className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-[11px] text-zinc-200 flex justify-between items-center">
                <span>{assetI1.title}</span>
                <span className="text-[10px] text-zinc-400">Click to expand</span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--color-secondary)] mt-1.5 text-center font-mono-code">
              Figure 1: Erba Elite 580 Hematology Analyzer deployed on-site
            </p>
          </div>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 3: The Problem */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            3. THE PROBLEM
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
            The goal was to build a custom LIS that could:
          </p>
          <ol className="space-y-2 mt-2">
            {[
              "Communicate directly with medical analyzers through a vendor LIS.",
              "Parse HL7 data from an analyzer with different field mappings.",
              "Validate results, handle MSH/MSA control signals, and prevent data loss.",
              "Persist critical patient data locally in a HIPAA-compliant manner.",
              "Expose clean, validated data to upstream systems via an API.",
              "Provide audit logs and a live monitoring UI for lab technicians.",
            ].map((goal, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
              >
                <span className="text-emerald-500 select-none font-semibold mt-[1px] shrink-0 min-w-[1.25rem]">
                  {idx + 1}.
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>

          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mt-4">
            <strong className="font-semibold text-[var(--color-primary)]">The core challenge was not writing the application.</strong> It was understanding <strong className="font-semibold text-[var(--color-primary)]">how</strong> to communicate with analyzer and vendor LIS, given that:
          </p>
          <ul className="space-y-2 mt-2">
            {[
              "No documentation, examples, or walkthroughs existed.",
              "A big technical manual was the only source as a document.",
              "No standardization existed beyond the protocol grammar.",
              "Loss of even one data block could have serious clinical consequences.",
            ].map((challenge, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
              >
                <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>

          <blockquote className="my-4 pl-4 border-l-2 border-[#3ecf8e]/60 bg-emerald-500/[0.04] py-2.5 pr-3 rounded-r text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 italic">
            The main pain point was mapping the lab&apos;s network and understanding all the hosts, analyzers, and client LIS systems already in place. The specs for developing an LIS were neither standardized nor well documented. I had to read technical manuals, analyze logs from the existing LIS, and work with daily stored samples to build a starting point. The expected timeline was 2–3 months.
          </blockquote>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 4: Approach */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            4. APPROACH
          </p>

          {/* 4.1 Discovery Through Traffic Analysis */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] font-mono-code mb-2">
              4.1 Discovery Through Traffic Analysis
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              Because the vendor system was a black box, I reverse-engineered communication by:
            </p>
            <ul className="space-y-2 mt-2">
              {[
                "Capturing and inspecting the message blocks.",
                "Diagnosing traffic patterns between analyzers and vendor LIS.",
                "Reconstructing message flows, batching behavior, and control signal timing.",
                "Identifying field-level differences across vendors.",
              ].map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
                >
                  <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <blockquote className="my-4 pl-4 border-l-2 border-[#3ecf8e]/60 bg-emerald-500/[0.04] py-2.5 pr-3 rounded-r text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 italic">
              Since time was limited, I skipped tools like Wireshark and serial sniffers and worked directly with stored patient data. I mapped the message flow and control signal patterns through captured logs.
            </blockquote>

            {/* Assets I-3 and I-4: Side-by-side on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div>
                <div
                  onClick={() => setSelectedImage(assetI4.path)}
                  className="group relative h-[220px] sm:h-[260px] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] dark:bg-[#141414] overflow-hidden cursor-pointer shadow-sm hover:border-emerald-500/60 transition-all flex items-center justify-center"
                >
                  <Image
                    src={assetI4.path}
                    alt={assetI4.title}
                    fill
                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-[11px] text-zinc-200">
                    {assetI4.title}
                  </div>
                </div>
                <p className="text-[10px] text-[var(--color-secondary)] mt-1 text-center font-mono-code">
                  Captured vendor LIS message logs &amp; ACK signals
                </p>
              </div>
            </div>
          </div>

          {/* 4.2 Configurable Parser */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] font-mono-code mb-2">
              4.2 Configurable Parser
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              In parallel, I worked on an ASTM framework for ASTM-based analyzers, since no highly configurable and fast framework existed at the time.
            </p>
            <blockquote className="my-4 pl-4 border-l-2 border-[#3ecf8e]/60 bg-emerald-500/[0.04] py-2.5 pr-3 rounded-r text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 italic">
              The parser was YAML-based with three analyzer profiles by default. Adding a new analyzer became as simple as adding a YAML config file for that machine.
            </blockquote>

            {/* Asset I-5: YAML Config */}
            <div className="mt-4">
              <div
                onClick={() => setSelectedImage(assetI5.path)}
                className="group relative w-full h-[260px] sm:h-[360px] border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] dark:bg-[#141414] overflow-hidden cursor-pointer shadow-sm hover:border-emerald-500/60 transition-all flex items-center justify-center"
              >
                <Image
                  src={assetI5.path}
                  alt={assetI5.title}
                  fill
                  className="object-contain p-2 group-hover:scale-[1.01] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-[11px] text-zinc-200 flex justify-between items-center">
                  <span>{assetI5.title}</span>
                  <span className="text-[10px] text-zinc-400">Click to expand</span>
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-secondary)] mt-1.5 text-center font-mono-code">
                Figure 2: YAML-driven profile specifications for Erba and Mindray analyzers
              </p>
            </div>
          </div>

          {/* 4.3 Modular Architecture */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] font-mono-code mb-2">
              4.3 Modular Architecture
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mb-2">
              The LIS was divided into seven logical modules:
            </p>
            <ol className="space-y-1.5">
              {[
                "Server lifecycle management",
                "Parsing layer",
                "Communication layer (control signals)",
                "Validation",
                "Logger",
                "Persistence",
                "API layer (optional; necessary for integration with internal tools)",
              ].map((mod, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
                >
                  <span className="text-emerald-500 select-none font-semibold mt-[1px] shrink-0 min-w-[1.25rem]">
                    {idx + 1}.
                  </span>
                  <span>{mod}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 4.4 Reliability and Compliance */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] font-mono-code mb-2">
              4.4 Reliability and Compliance
            </h3>
            <ul className="space-y-2 mb-3">
              {[
                "Handled batched and unbatched data to prevent block loss.",
                "Sent necessary AE or AR on malformed or failed validation blocks; AA on success on MSA-1 field.",
                "Maintained audit logs at every step.",
                "Used SQLite for local persistence of critical patient data.",
                "Built a live monitoring UI for technicians.",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
                >
                  <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mt-3">
              Sending proper control signals was crucial because it triggered the retry logic - the analyzer would resend the same payload. Beyond control signals, I added a validation and storage layer that:
            </p>
            <ol className="space-y-2 mt-2">
              {[
                "Checked MLLP boundaries of the received message.",
                "Segregated the message into MSH, OBR, and OBX segments, validating each segment and its critical fields.",
                "Stored records in application-specific data models for easier handling.",
                "Persisted those models to a local SQLite database under encryption, with a 7-day backup strategy, while maintaining end-to-end logs and UI signals for technicians when validation failed or a block was malformed.",
              ].map((valStep, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
                >
                  <span className="text-emerald-500 select-none font-semibold mt-[1px] shrink-0 min-w-[1.25rem]">
                    {idx + 1}.
                  </span>
                  <span>{valStep}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 5: Results */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            5. RESULTS
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mb-2">
            The outcomes were significant:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
              <span>
                <strong className="font-semibold text-[var(--color-primary)]">Integration time</strong> for the analyzer was reduced to a single config value.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
              <span>
                <strong className="font-semibold text-[var(--color-primary)]">Throughput and visibility</strong> improved substantially, with better validation leading to 100% accurate parsing and deterministic communication between analyzer and LIS via control signals.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
              <span>
                <strong className="font-semibold text-[var(--color-primary)]">Before</strong>, the LIS gave technicians no clear boundary of what was accepted, stored, or rejected — or why. <strong className="font-semibold text-[var(--color-primary)]">After</strong>, the system maintains proper logs and a clean color-coded UI: red for rejected blocks, green for accepted blocks, and blue for control signals sent.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
              <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
              <span>
                <strong className="font-semibold text-[var(--color-primary)]">Uptime</strong> is effectively indefinite. The LIS requires no maintenance to remain operational; uptime depends only on the host machine and its load. The LIS is a lightweight native application and does not pose a significant threat to the underlying machine.
              </span>
            </li>
          </ul>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 6: Lessons Learned */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            6. LESSONS LEARNED
          </p>
          <ul className="space-y-2.5">
            {[
              {
                title: "Healthcare still needs modernization.",
                body: "Automating workflows is essential to increase efficiency and throughput.",
              },
              {
                title: "Traffic analysis is unavoidable.",
                body: "Without documentation, logs and packet captures are the only source of truth.",
              },
              {
                title: "Audit logs serve two masters.",
                body: "They are both legal documentation and operational debugging tools.",
              },
              {
                title: "Local persistence matters.",
                body: "Cloud-only architectures are risky when connectivity or compliance is uncertain.",
              },
              {
                title: "Niche problems are poorly documented.",
                body: "Proper diagnostic steps are necessary to solve or work around them.",
              },
              {
                title: "Version iteration is normal.",
                body: "V1 and V2 were abandoned. V3 was the version worth pushing to production.",
              },
            ].map((lesson, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code"
              >
                <span className="text-emerald-500 select-none font-bold mt-[1px] shrink-0">&bull;</span>
                <span>
                  <strong className="font-semibold text-[var(--color-primary)]">{lesson.title}</strong> {lesson.body}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] my-8" />

        {/* Section 7: Conclusion */}
        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2.5 font-mono-code">
            7. CONCLUSION
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code">
            This project proved that a single developer - even an intern - can replace a proprietary black box with a reliable, configurable, and production-ready LIS in under three months. The key was not writing code, but understanding the communication: mapping the network, reading manuals, analyzing logs, and working backward from real patient data.
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mt-3">
            The resulting system processes 100–500 results daily with 100% parsing accuracy, eliminates dependency on third-party LIS vendors for day-to-day reliability, and gives lab technicians clear visibility into every accepted, rejected, or retried data block. It is lightweight, maintenance-free, and built entirely on open, configurable components.
          </p>
          <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[var(--color-primary)]/90 font-mono-code mt-3">
            The broader lesson is simple: in healthcare IT, the protocol is rarely the hard part. The hard part is the vendor-specific implementation around it. Once that is understood, the rest is engineering.
          </p>
        </section>

        {/* Section: Highlights Pills */}
        <div className="mt-10">
          <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] mb-6" />
          <section>
            <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-3 font-mono-code">
              KEY HIGHLIGHTS
            </p>
            <div className="grid grid-cols-2 gap-2 items-stretch">
              {highlights.map((highlight, idx) => (
                <Tag key={idx}>{highlight}</Tag>
              ))}
            </div>
          </section>
          <div className="w-full h-[1px] bg-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] dark:bg-[#262626] mt-6" />
        </div>

        {/* Section: Tech Stack */}
        <section className="mt-8">
        <p className="text-[11px] uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-3 font-mono-code">
          TECH STACK &amp; PROTOCOLS
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
          {[
            "Python",
            "ASTM (E1381/E1394)",
            "HL7 v2",
            "MLLP",
            "SQLite (Encrypted)",
            "YAML",
            "TCP/IP Sockets",
            "RS-232 Serial",
          ].map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </section>

        {/* Deployment Note / Site Row */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
          <a
            href="https://labridge.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-400 hover:underline transition-all"
          >
            Visit organization
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Fullscreen Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={selectedImage}
                  alt="Expanded view"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

