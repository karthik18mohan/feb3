"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Who We Are", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "Partners", href: "#partners" },
  { label: "Clients", href: "#clients" },
  { label: "Enquiry", href: "#enquiry" },
  { label: "FAQ", href: "#faq" }
];

export function TopNav({
  activeSection,
  onNavigate
}: {
  activeSection?: string;
  onNavigate?: (href: string) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const getHref = (hashHref: string) => {
    return isLandingPage ? hashHref : `/${hashHref}`;
  };

  const getBrandHref = () => {
    return isLandingPage ? "#home" : "/";
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate && isLandingPage) {
      e.preventDefault();
      onNavigate(href);
    }
    setIsMobileMenuOpen(false);
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-ink">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={getHref(item.href)}
              onClick={(e) => handleNavClick(e, item.href)}
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center group"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`w-6 h-0.5 bg-ink transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-ink transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-ink transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[73px] bg-paper backdrop-blur-xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 pt-12 px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={getHref(item.href)}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-lg uppercase tracking-[0.3em] transition hover:text-ink ${
                activeSection === item.href.replace("#", "")
                  ? "text-ink font-semibold"
                  : "text-muted"
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
