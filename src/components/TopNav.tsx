const NAV_ITEMS = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "We Serve", href: "#we-serve" },
  { label: "Contact", href: "#contact" }
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.28em] text-ink"
          >
            Nathan &amp; Co.
          </a>
          <span className="inline-flex items-center rounded-md border border-brass/70 px-3 py-1 text-[0.55rem] uppercase tracking-[0.32em] text-deep-green">
            Since • Over six decades
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.32em] text-ink md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-deep-green"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-xs uppercase tracking-[0.3em] text-ink">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-52 rounded-xl border border-ink/15 bg-ivory p-4 shadow-[0_18px_40px_rgba(44,42,38,0.12)]">
            <nav className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-ink">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-deep-green">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
