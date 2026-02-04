"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItemVariants } from "@/lib/motion";

type NavItem = { id: string; name: string; numeral: string };

export function TopNav({
  items,
  activeSection,
  onNavigate,
  isVisible = true
}: {
  items: NavItem[];
  activeSection?: string;
  onNavigate?: (href: string) => void;
  isVisible?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    setHasLoaded(true);
  }, []);

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
    <header className={`fixed top-0 left-0 right-0 z-40 min-h-[var(--nav-h)] border-b border-rule bg-paper/70 backdrop-blur-md transition-all duration-300 ${
      isVisible ? "translate-y-0 opacity-100 shadow-[0_4px_16px_rgba(11,27,59,0.08)]" : "-translate-y-full opacity-0 pointer-events-none shadow-none"
    }`}>
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={getBrandHref()}
            className="rounded-sm text-sm font-semibold uppercase tracking-[0.26em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
            Since 1962
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-ink">
          {items.map((item, index) => {
            const label = `${item.numeral} ${item.name.toUpperCase()}`;
            return (
            <motion.div
              key={item.id}
              variants={navItemVariants}
              initial="hidden"
              animate={hasLoaded ? "visible" : "hidden"}
              custom={index}
            >
              <a
                href={getHref(`#${item.id}`)}
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
                className="group relative rounded-sm pb-1 text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-ink transition-all duration-250 origin-left ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
              </a>
            </motion.div>
          )})}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex h-6 w-6 flex-col items-center justify-center gap-1.5 rounded-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
        className={`lg:hidden fixed inset-0 top-[var(--nav-h)] bg-paper backdrop-blur-xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 pt-12 px-6">
          {items.map((item) => {
            const label = `${item.numeral} ${item.name.toUpperCase()}`;
            return (
            <a
              key={item.id}
              href={getHref(`#${item.id}`)}
              onClick={(e) => handleNavClick(e, `#${item.id}`)}
              className={`rounded-sm text-lg uppercase tracking-[0.3em] transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                activeSection === item.id
                  ? "text-ink font-semibold"
                  : "text-muted"
              }`}
            >
              {label}
            </a>
          )})}
        </nav>
      </div>
    </header>
  );
}
