"use client";

import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Who We Are", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "Partners", href: "#partners" },
  { label: "Clients", href: "#clients" }
];

export function TopNav({
  activeSection,
  onNavigate
}: {
  activeSection?: string;
  onNavigate?: (href: string) => void;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const getHref = (hashHref: string) => {
    return isLandingPage ? hashHref : `/${hashHref}`;
  };

  const getBrandHref = () => {
    return isLandingPage ? "#home" : "/";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={getBrandHref()}
            className="text-sm font-semibold uppercase tracking-[0.26em] text-ink"
            onClick={(e) => {
              if (onNavigate && isLandingPage) {
                e.preventDefault();
                onNavigate("#home");
              }
            }}
          >
            Nathan &amp; Co.
          </a>
          <span className="inline-flex items-center rounded-sm border border-rule bg-paper/80 px-3 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-muted">
            Since 1954
          </span>
        </div>
        <nav className="flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-ink">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={getHref(item.href)}
              onClick={(e) => {
                if (onNavigate && isLandingPage) {
                  e.preventDefault();
                  onNavigate(item.href);
                }
              }}
              className={`pb-1 transition hover:text-ink ${
                activeSection === item.href.replace("#", "")
                  ? "border-b border-ink"
                  : "border-b border-transparent text-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
