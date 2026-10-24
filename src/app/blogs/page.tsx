"use client";
import React from "react";
import Navbar from "../(Header)/Navbar";
import { ContactSection } from "@/components/ContactSection";

const BlogPage = () => {
  return (
  <main className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />
      <ContactSection />
    </main>
  );
};

export default BlogPage;
