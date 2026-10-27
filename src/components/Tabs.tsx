"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TabItem = {
  value: string;
  label: string;
  /** When set, the tab renders as a link (route navigation). */
  href?: string;
  /** Optional icon, used by the "tabbar" variant. */
  icon?: LucideIcon;
  /** Optional small text shown after the label, such as a count. */
  badge?: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange?: (value: string) => void;
  variant?: "pill" | "tabbar";
  ariaLabel?: string;
  /** Applied to the outer wrapper, e.g. "hidden md:flex" or "md:hidden fixed bottom-0". */
  className?: string;
};

const variants = {
  pill: {
    list: "flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    tab: "relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono-code text-xs transition-colors duration-150",
    active:
      "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/15 font-semibold text-[var(--color-accent)]",
    idle:
      "border-transparent text-[var(--color-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]",
  },
  tabbar: {
    list: "grid h-16 grid-flow-col auto-cols-fr",
    tab: "flex min-w-0 flex-col items-center justify-center gap-1 font-mono-code transition-colors duration-150",
    active: "text-[var(--color-accent)]",
    idle: "text-[var(--color-secondary)] hover:text-[var(--color-primary)]",
  },
} as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]";

export function Tabs({
  items,
  value,
  onValueChange,
  variant = "pill",
  ariaLabel = "Sections",
  className = "",
}: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);
  const styles = variants[variant];
  const isRoute = items.some((item) => Boolean(item.href));

  // Keep the active pill centered when the pill row scrolls horizontally
  useEffect(() => {
    if (variant !== "pill") return;
    const list = listRef.current;
    const index = items.findIndex((item) => item.value === value);
    const el = tabRefs.current[index];
    if (!list || !el) return;
    const target = el.offsetLeft - list.clientWidth / 2 + el.offsetWidth / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, variant]);

  // Arrow keys, Home, and End move between tabs (content-switching mode only)
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    onValueChange?.(items[next].value);
    tabRefs.current[next]?.focus();
  };

  const renderContent = (item: TabItem, active: boolean) => {
    if (variant === "tabbar") {
      const Icon = item.icon;
      return (
        <>
          <span
            className={`flex h-7 w-14 items-center justify-center rounded-full transition-colors duration-150 ${
              active ? "bg-[var(--color-accent)]/15" : ""
            }`}
          >
            {Icon && (
              <Icon
                className="h-5 w-5"
                strokeWidth={active ? 2.25 : 1.75}
                aria-hidden="true"
              />
            )}
          </span>
          <span className="text-[10px] leading-none">{item.label}</span>
        </>
      );
    }

    return (
      <>
        <span>{item.label}</span>
        {item.badge !== undefined && (
          <span className="text-[10px] opacity-70">{item.badge}</span>
        )}
      </>
    );
  };

  const renderTab = (item: TabItem, index: number) => {
    const active = item.value === value;
    const className = `${styles.tab} ${focusRing} ${active ? styles.active : styles.idle}`;
    const setRef = (el: HTMLElement | null) => {
      tabRefs.current[index] = el;
    };
    const content = renderContent(item, active);

    if (isRoute) {
      return (
        <Link
          key={item.value}
          href={item.href ?? "#"}
          ref={setRef}
          aria-current={active ? "page" : undefined}
          onClick={() => onValueChange?.(item.value)}
          className={className}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        key={item.value}
        type="button"
        role="tab"
        ref={setRef}
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onClick={() => onValueChange?.(item.value)}
        className={className}
      >
        {content}
      </button>
    );
  };

  if (isRoute) {
    return (
      <nav aria-label={ariaLabel} className={`min-w-0 ${className}`}>
        <div ref={listRef} className={styles.list}>
          {items.map(renderTab)}
        </div>
      </nav>
    );
  }

  return (
    <div className={`min-w-0 ${className}`}>
      <div ref={listRef} role="tablist" aria-label={ariaLabel} className={styles.list}>
        {items.map(renderTab)}
      </div>
    </div>
  );
}

/** Pairs with Tabs in content-switching mode. Renders only the active panel. */
export function TabPanel({
  value,
  active,
  children,
  className = "",
}: {
  value: string;
  active: string;
  children: ReactNode;
  className?: string;
}) {
  if (value !== active) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={className}
    >
      {children}
    </div>
  );
}