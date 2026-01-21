"use client";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.5h4v12H3zM9 8.5h3.8v1.7h.05c.53-1 1.83-2.05 3.75-2.05 4 0 4.7 2.5 4.7 5.8v6.55h-4v-5.8c0-1.4-.02-3.2-2-3.2-2 0-2.3 1.55-2.3 3.1v5.9H9z" />
      </svg>
    )
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M18.3 2.5h3.2l-7.1 8.2 8.3 10.8h-6.6l-5.2-6.7-5.8 6.7H1.9l7.7-8.8L1.6 2.5h6.7l4.7 6.1 5.3-6.1z" />
      </svg>
    )
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M16.75 2h-9.5A5.26 5.26 0 002 7.25v9.5A5.26 5.26 0 007.25 22h9.5A5.26 5.26 0 0022 16.75v-9.5A5.26 5.26 0 0016.75 2zm3.25 14.75a3.26 3.26 0 01-3.25 3.25h-9.5A3.26 3.26 0 014 16.75v-9.5A3.26 3.26 0 017.25 4h9.5A3.26 3.26 0 0120 7.25z" />
        <path d="M12 7a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3z" />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </svg>
    )
  }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/15 bg-ivory/80 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-ink">Nathan &amp; Co.</p>
          <p className="text-sm text-ink/70">© {year} Nathan &amp; Co. All rights reserved.</p>
        </div>
        <div className="space-y-2 text-sm text-ink/70">
          <p>Email: hello@example.com</p>
          <p>Phone: +00 0000 0000</p>
          <p>Address: Placeholder address</p>
        </div>
        <div className="flex items-center gap-4 text-ink/70">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 transition hover:border-ink/30 hover:text-ink"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
