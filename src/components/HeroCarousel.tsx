import { siteTitle } from "@/content/copy";
import bgImage from "../../bg.jpg";

export function HeroCarousel() {
  return (
    <section id="top" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ivory">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      />
      <div className="absolute inset-0 bg-ivory/70" />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 py-28 text-center sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-deep-green/80">
          Chartered Accountants
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
          {siteTitle}
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ivory shadow-[0_18px_40px_rgba(44,42,38,0.25)] transition hover:-translate-y-0.5 hover:bg-ink/90"
          >
            Schedule a Consultation
          </a>
          <a
            href="#what-we-do"
            className="inline-flex items-center justify-center rounded-md border border-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ink transition hover:-translate-y-0.5 hover:bg-ink/5"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
