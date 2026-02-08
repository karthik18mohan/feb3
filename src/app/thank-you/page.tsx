export default function ThankYouPage() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-h))] w-full max-w-[1180px] items-center px-6 py-24 section-shell">
      <div className="w-full rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-[clamp(1rem,2.4vw,2rem)] shadow-[0_24px_60px_rgba(11,27,59,0.25)] backdrop-blur">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted">
            Enquiry
          </p>
          <h1 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold text-ink">
            Thank you.
          </h1>
          <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-relaxed text-muted">
            We will get back to you shortly.
          </p>
        </div>
      </div>
    </main>
  );
}
