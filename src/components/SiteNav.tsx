"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, siteTitle } from "@/content/copy";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/15 bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">
          {siteTitle}
        </Link>
        <nav className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.3em] text-ink/80 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-ink ${
                pathname === item.href ? "text-ink" : "text-ink/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/20 text-ink md:hidden"
          aria-label={open ? "Close" : "Menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 rounded bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-5 rounded bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 rounded bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>
      {open ? (
        <div className="border-t border-ink/15 bg-ivory/95 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-6 text-xs font-medium uppercase tracking-[0.3em] text-ink/70">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`transition hover:text-ink ${
                  pathname === item.href ? "text-ink" : "text-ink/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
