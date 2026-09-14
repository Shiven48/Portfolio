"use client";

import React from "react";
import projectData from "@/../data/data.json";
import { BookOpen, ArrowUpRight, Sparkles, Clock, Calendar, PenTool } from "lucide-react";

interface BlogEntry {
  title?: string;
  description?: string;
  date?: string;
  readTime?: string;
  tag?: string;
  url?: string;
}

export function BlogsSection() {
  // Check if blogs exist in data.json and have non-empty content
  const rawBlogs = projectData.blogs || [];
  const validBlogs: BlogEntry[] = rawBlogs.filter(
    (b: any) =>
      (typeof b === "string" && b.trim().length > 0) ||
      (typeof b === "object" && b !== null && b.title && b.title.trim().length > 0)
  ).map((b: any) => {
    if (typeof b === "string") {
      return {
        title: b,
        description: "Technical deep-dive on modern architectures, algorithms, and engineering.",
        date: "2026",
        readTime: "5 min read",
        tag: "Engineering",
        url: "#",
      };
    }
    return b;
  });

  // Sample planned/draft articles for empty-state preview
  const draftArticles: BlogEntry[] = [
    {
      title: "Optimizing Custom CUDA Kernels for Low-Latency PyTorch Inference",
      description:
        "Techniques for eliminating kernel launch overhead, memory coalescence, and async streaming in real-time edge workloads.",
      date: "Upcoming",
      readTime: "8 min read",
      tag: "CUDA · ML Systems",
      url: "#",
    },
    {
      title: "Architecting Resilient Real-Time Event Streams with Next.js & FastAPI",
      description:
        "Building bidirectional WebSockets and SSE pipelines with distributed workers and minimal memory footprint.",
      date: "Upcoming",
      readTime: "6 min read",
      tag: "Web Architecture",
      url: "#",
    },
    {
      title: "Multi-Hop Knowledge Graphs & Vector Search for Multi-Modal RAG",
      description:
        "Bridging structured entity graphs with dense vector embeddings for scalable contextual retrieval.",
      date: "Upcoming",
      readTime: "7 min read",
      tag: "Vector DB · RAG",
      url: "#",
    },
  ];

  const displayedPosts = validBlogs.length > 0 ? validBlogs : draftArticles;
  const isDraftState = validBlogs.length === 0;

  return (
    <section id="blogs" className="w-full py-16 md:py-24 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[var(--color-border)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-mono-code font-bold tracking-widest text-[var(--color-accent)] uppercase">
                PUBLICATIONS & WRITINGS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)]">
              Selected writings
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] font-mono-code mt-1">
              Deep dives into systems programming, machine learning, and software design.
            </p>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            {isDraftState && (
              <span className="text-[11px] font-mono-code px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-secondary)]">
                Drafts Pipeline
              </span>
            )}
            <a
              href="#blogs"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
            >
              <span>All articles</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3-Column Blog Cards Grid matching reference image styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, idx) => (
            <div
              key={idx}
              className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[var(--color-accent)] transition-all duration-200 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Top Badge & Date */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code font-semibold px-2.5 py-0.5 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5">
                    {post.tag || "Article"}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono-code text-[var(--color-secondary)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date || "2026"}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime || "5m"}
                    </span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="text-lg font-bold tracking-tight text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Post Description */}
                <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono-code">
                <span className="text-[var(--color-secondary)]">
                  {isDraftState ? "In production" : "Read post"}
                </span>
                <a
                  href={post.url || "#blogs"}
                  className="inline-flex items-center gap-1 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] font-semibold transition-colors"
                >
                  View <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty notice helper when in draft state */}
        {isDraftState && (
          <div className="mt-6 p-4 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50 text-center text-xs font-mono-code text-[var(--color-secondary)]">
            <span className="text-[var(--color-accent)] font-semibold">Note:</span> Blog entries can be added directly to{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--color-border)] text-[var(--color-primary)]">
              data/data.json → blogs
            </code>{" "}
            and will automatically populate here.
          </div>
        )}
      </div>
    </section>
  );
}
