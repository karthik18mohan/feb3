type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Who We Are", href: "#about" },
  { label: "What We Do", href: "#services" }
];

export function TopNav({
  activeSection,
  onNavigate
}: {
  activeSection?: string;
  onNavigate?: (href: string) => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#home"
            className="text-sm font-semibold uppercase tracking-[0.26em] text-ink"
            onClick={(e) => {
              if (onNavigate) {
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
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-ink md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (onNavigate) {
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
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-xs uppercase tracking-[0.3em] text-ink">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-52 rounded-xl border border-rule bg-paper p-4 shadow-[0_18px_40px_rgba(11,27,59,0.08)]">
            <nav className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-ink">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(item.href);
                    }
                  }}
                  className={`pb-0.5 transition hover:text-ink ${
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
        </details>
      </div>
    </header>
  );
}
