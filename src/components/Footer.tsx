"use client";

import contact from "../../data/contact.json";

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
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M16.75 2h-9.5A5.26 5.26 0 002 7.25v9.5A5.26 5.26 0 007.25 22h9.5A5.26 5.26 0 0022 16.75v-9.5A5.26 5.26 0 0016.75 2zm3.25 14.75a3.26 3.26 0 01-3.25 3.25h-9.5A3.26 3.26 0 014 16.75v-9.5A3.26 3.26 0 017.25 4h9.5A3.26 3.26 0 0120 7.25z" />
        <path d="M12 7a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3z" />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </svg>
    )
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" />
      </svg>
    )
  }
];

type FooterProps = {
  className?: string;
  showBackToTop?: boolean;
};

export function Footer({ className, showBackToTop = false }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t border-ink/15 bg-paper/85 py-12 backdrop-blur ${className ?? ""}`}>
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ink">Nathan &amp; Co.</p>
            <p className="text-sm text-ink/70">Nathan &amp; Co. Chartered Accountants</p>
          </div>
          <p className="text-sm text-ink/70">© {year} Nathan &amp; Co. All rights reserved.</p>
          {showBackToTop ? (
            <a
              href="#home"
              className="inline-flex text-sm font-medium text-ink/80 underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Back to top
            </a>
          ) : null}
        </div>
        <div className="space-y-2 text-sm text-ink/70">
          <div className="space-y-1">
            {contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p>
            <span className="font-medium text-ink">Phone:</span>{" "}
            <a
              href={`tel:${contact.phone}`}
              className="underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {contact.phone}
            </a>
          </p>
          <p>
            <span className="font-medium text-ink">Email:</span>{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {contact.email}
            </a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink/60">Quick links</p>
          <ul className="space-y-2 text-sm text-ink/70">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "Who We Are" },
              { href: "#services", label: "What We Do" },
              { href: "#enquiry", label: "Start an Enquiry" },
              { href: "#faq", label: "FAQ" }
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink/60">Connect</p>
          <div className="flex items-center gap-4 text-ink/70">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink/20 transition hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-label={`${social.label} (TODO: add link)`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink/50">TODO: add social links</p>
        </div>
      </div>
    </footer>
  );
}
