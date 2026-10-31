"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { endpoint } from "@/lib/utils";
import { Send, CheckCircle2 } from "lucide-react";

export default function FormspreeCard() {
  const formKey = endpoint.includes("/")
    ? endpoint.split("/").filter(Boolean).pop() || "xnppbwwq"
    : endpoint || "xnppbwwq";

  const [state, handleSubmit, reset] = useForm(formKey);

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-7 space-y-6">
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono-code uppercase font-semibold tracking-widest text-[var(--color-secondary)]">
          GET IN TOUCH
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-primary)]">
          Send me a message
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-secondary)]">
          Let&apos;s create something amazing together.
        </p>
      </div>

      {state.succeeded ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
              Message Sent Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-secondary)] max-w-xs mx-auto">
              Thanks for reaching out. I&apos;ve received your note and will get back to you within 24-48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono-code font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-xs font-medium font-mono-code text-[var(--color-primary)]"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary)] placeholder:text-[var(--color-secondary)]/50 text-xs sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all font-sans"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-xs text-red-500 font-mono-code mt-1"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium font-mono-code text-[var(--color-primary)]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary)] placeholder:text-[var(--color-secondary)]/50 text-xs sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all font-sans"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-xs text-red-500 font-mono-code mt-1"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-medium font-mono-code text-[var(--color-primary)]"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your project, ideas, or just say hello..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary)] placeholder:text-[var(--color-secondary)]/50 text-xs sm:text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all font-sans resize-y"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs text-red-500 font-mono-code mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full btn-cta py-3 px-4 rounded-xl font-mono-code text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{state.submitting ? "Sending..." : "Send Message"}</span>
          </button>

          {/* Security & Provider Attribution */}
          <p className="text-[11px] text-center text-[var(--color-secondary)] font-mono-code pt-1">
            Powered by Formspree · Your data is secure and never stored
          </p>
        </form>
      )}
    </div>
  );
}