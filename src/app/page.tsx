"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { partners } from "@/content/partners";
import { servicesData } from "@/content/services";
import { ClientsSection } from "@/components/ClientsSection";
import { EnquirySection } from "@/components/EnquirySection";
import { FAQSection } from "@/components/FAQSection";
import { TopNav } from "@/components/TopNav";
import { VisionPurposeFlow } from "@/components/VisionPurposeFlow";
import { ServiceModal } from "@/components/ServiceModal";
import { MainSnapLayout, PanelId, scrollToPanel } from "@/components/MainSnapLayout";
import { fadeUp, fadeUpFast, fadeLeft, fadeRight, staggerContainer, viewportConfig, viewportConfigPartial, stagger, durations, PREMIUM_EASE } from "@/lib/motion";

const ROMAN_NUMERALS = ["I", "II", "III"];

const PANEL_NAV_ITEMS = [
  { id: "about", label: "About Us", href: "#about" },
  { id: "work", label: "What We Do", href: "#work" },
  { id: "contact", label: "Contact Us", href: "#contact" }
];

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const landingSlides = [
  {
    src: "/images/landing-page/1.jpg",
    caption: "Rooted in Heritage — Serving Since 1962"
  },
  {
    src: "/images/landing-page/2.jpg",
    caption: "Enlightened Across Generations"
  },
  {
    src: "/images/landing-page/3.jpg",
    caption: "Evolving from Manual to Digital Era"
  }
];

const aboutParagraphs = [
  "Founded on a vision to uphold the highest ideals of quality and integrity, Nathan & Co. has embraced excellence as a way of life for over six decades. Rooted in the firm's enduring values of ethics, transparency, and professionalism, every engagement reflects our unwavering commitment to these principles that define our legacy and purpose.",
  "Since its inception, Nathan & Co. has evolved alongside the Indian economy- from the license era to liberalization, and onwards into today's dynamic digital age. Every generation of our firm has contributed to broadening our horizons, extending our expertise from traditional audit and taxation to modern domains such as risk advisory, virtual CFO services, and business consulting.",
  "Through every chapter of growth, we have remained unwavering in our commitment to the core values of the Chartered Accountancy profession as enshrined in the Chartered Accountants Act, 1949 and the Code of Ethics prescribed by the Institute of Chartered Accountants of India (ICAI).",
  "We combine deep technical expertise with a client-centric approach to assist businesses in confidently navigating their financial journeys from incorporation of start up to ultimate listed corporations."
];

const services = [
  {
    title: "Audit & Assurance",
    body:
      "Every engagement at Nathan & Co. is thoughtfully customized to meet clients' needs at every stage, ensuring impactful, timely, and value-driven outcomes.\n\nOur Audit and Assurance services cover a wide range of specialized engagements carried out in accordance with the applicable standards and regulations, includes:",
    bullets: [
      "Statutory Audit",
      "Internal Audit",
      "Process Audit",
      "Concurrent Audit",
      "Revenue Audit",
      "Forensic Audit",
      "Stock Audit",
      "Asset Audit",
      "Management Audit",
      "Information System Audit"
    ]
  },
  {
    title: "Taxation & Compliance",
    body:
      "Our Regulatory and Compliance services are crafted to assist businesses in navigating reporting obligations with accuracy, timeliness, and integrity.\n\nEvery engagement is executed in complete alignment with applicable regulations, ensuring complete compliance with ethical and statutory requirements.\n\nThrough a robust compliance-driven approach, we support organizations in mitigating risks and maintaining the highest levels of governance.",
    subSections: [
      {
        title: "Income tax and international taxation",
        bullets: [
          "Tax Planning and Advisory",
          "Compliance Review",
          "Assistance in filing Forms and Returns",
          "Representations before relevant Authority"
        ]
      },
      {
        title: "GST and Other Indirect Taxation",
        bullets: [
          "Tax Registration",
          "Tax Planning and Advisory",
          "Assistance in Filing Forms and Returns",
          "Compliance Review",
          "Representations before relevant Authority"
        ]
      }
    ]
  },
  {
    title: "Corporate & Allied Laws",
    body:
      "At our Corporate & Allied Laws desk, we deliver comprehensive end-to-end guidance—from inception through growth and transformation to final exit—across companies, LLPs, trusts, and joint ventures.\nOur practice encompasses a wide spectrum of corporate governance and regulatory requirements delivered with integrity, independence, and adherence to statutory standards.\nWe work as your strategic partner to simplify regulatory complexities, mitigate compliance risks, and enable sustainable, long-term growth"
  },
  {
    title: "Accounting & Bookkeeping Outsourcing",
    body:
      "Empowering businesses with cloud-based accounting, structured reporting, and agile operational support, delivered with strict adherence to professional standards and applicable Laws.",
    bullets: [
      "IFRS/USGAAP/IND-AS compliant bookkeeping.",
      "Internal Financial control to suit business practices.",
      "Liaison with Customer, Vendor, Banker & other Stakeholders.",
      "Compliance of Various Statutes (PF/ESI/Gratuity/GST/TDS/Corporate Governance/FLA)"
    ]
  },
  {
    title: "Financial Planning & Analysis (FP&A)",
    body:
      "Structured Financial Planning and Performance Analysis enhanced with technology-enabled insights, supporting confident decisions, calculated risk management, and sustainable business growth.",
    bullets: [
      "Budgets & Forecasts.",
      "Financial Analysis & Reporting.",
      "Performance Monitoring including suitable enhancement.",
      "Strategic Planning Support.",
      "Decision Support & Data Visualization."
    ]
  },
  {
    title: "Virtual CFO Services",
    body:
      "Providing Strategic Financial Management through effective planning, oversight, and execution, ensuring sustainable financial discipline and long-term development.",
    bullets: [
      "Cash Flow Analysis & Planning.",
      "Working Capital Management.",
      "Developing Financial Strategy.",
      "Monitoring Financial health & Corporate goals/KPIs.",
      "Capital Structuring/Restructuring.",
      "Risk Management & Advisory",
      "Financial Reporting & Compliance"
    ]
  },
  {
    title: "Other Services",
    body:
      "Integrated financial, corporate, and strategic advisory — delivering insight-led solutions that align with your objectives, enabling businesses to grow, transform, and create sustained value.",
    bullets: [
      "End-to-end support for Startup & MSME",
      "Forensic audit & Investigation",
      "Valuation & Due Diligence review",
      "Corporate Finance & Fundraising Avenues",
      "Financial Reconstruction,revival &rehabilitation.",
      "Acquisition,Amalgamations & Mergers.",
      "Collaborations/Joint Ventures",
      "ERP Implementations",
      "IND AS implementations"
    ]
  }
];

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<PanelId>("about");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const slideCount = landingSlides.length;
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const workPanelRef = useRef<HTMLDivElement>(null);
  const contactPanelRef = useRef<HTMLDivElement>(null);

  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const partnersRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const clientsRef = useRef<HTMLElement | null>(null);
  const enquiryRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  const handlePanelChange = useCallback((panel: PanelId) => {
    setActivePanel(panel);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    const panelId = href.replace("#", "") as PanelId;
    scrollToPanel(panelId);
  }, []);

  const handlePanelNav = useCallback((index: number) => {
    const panelId = PANEL_NAV_ITEMS[index]?.id as PanelId;
    if (panelId) {
      scrollToPanel(panelId);
    }
  }, []);

  const handleServiceClick = useCallback((serviceId: string) => {
    setActiveServiceId(serviceId);
    setIsServiceModalOpen(true);
  }, []);

  const handleServiceModalClose = useCallback(() => {
    setIsServiceModalOpen(false);
  }, []);

  const handleServiceChange = useCallback((serviceId: string) => {
    setActiveServiceId(serviceId);
  }, []);

  useEffect(() => {
    const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersMotion.matches) return;
    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [slideCount]);

  useEffect(() => {
    const sections = [
      { ref: homeRef, id: "home" },
      { ref: aboutRef, id: "about" },
      { ref: partnersRef, id: "partners" },
      { ref: servicesRef, id: "services" },
      { ref: clientsRef, id: "clients" },
      { ref: enquiryRef, id: "enquiry" },
      { ref: faqRef, id: "faq" }
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handlePrevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const handleNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  }, [handleNextSlide, handlePrevSlide]);

  const isOnHome = activeSection === "home";

  const aboutPanel = (
    <>
      <section
        id="home"
        ref={homeRef}
        className="relative isolate min-h-screen overflow-hidden"
      >
        <div
          className="absolute inset-0 hero-bg-motion"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {landingSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeSlideIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                className="object-cover object-center grayscale"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[rgba(6,10,20,0.28)]" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,59,0.7)] via-[rgba(11,27,59,0.58)] to-[rgba(11,27,59,0.46)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(176,141,87,0.16),transparent_40%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-6 pb-20">
          <div className="max-w-2xl space-y-7 text-paper">
            <div data-animate className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-paper/80">
              <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
              Chartered Accountants
            </div>
            <h1
              data-animate
              className="hero-title text-5xl font-semibold sm:text-6xl md:text-7xl"
            >
              Nathan &amp; Co.
            </h1>
            <div className="hero-divider" aria-hidden />
            <p
              data-animate
              className="hero-tagline max-w-xl text-xl leading-relaxed text-paper/85"
            >
              Upholding the highest ideals of quality, integrity, and trust.
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="relative isolate min-h-screen overflow-hidden bg-paper"
      >
        <div className="absolute inset-0">
          <Image src="/images/about/1.jpg" alt="" fill className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-6 pb-16 section-shell">
          <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-4xl font-semibold text-ink sm:text-5xl"
              >
                Who We Are
              </motion.h2>
              <motion.div
                variants={staggerContainer(stagger.normal)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-4"
              >
                {aboutParagraphs.map((paragraph) => (
                  <motion.p
                    key={paragraph}
                    variants={fadeUpFast}
                    className="text-lg leading-relaxed text-muted sm:text-xl"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </div>
            <VisionPurposeFlow />
          </div>
        </div>
      </section>

      <section
        id="partners"
        ref={partnersRef}
        className="relative isolate min-h-screen overflow-hidden"
      >
        <div className="flex min-h-screen flex-col section-shell">
          <div className="relative h-[30vh] min-h-[200px] w-full flex-shrink-0 overflow-hidden">
            <Image
              src="/images/partners/1.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-center text-4xl font-semibold text-paper drop-shadow-[0_12px_30px_rgba(3,7,18,0.55)] sm:text-5xl"
              >
                Our Partners
              </motion.h2>
            </div>
          </div>
          <div
            data-scrollable
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-paper px-6 py-8"
          >
            <div className="mx-auto w-full max-w-[1180px] space-y-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfigPartial}
                    transition={{
                      duration: durations.entry,
                      delay: index * stagger.tight,
                      ease: PREMIUM_EASE
                    }}
                    whileHover={{
                      y: -2,
                      transition: { duration: durations.hover, ease: PREMIUM_EASE }
                    }}
                    className="flex flex-col"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-rule shadow-[0_18px_40px_rgba(11,27,59,0.16)] transition-all duration-300 hover:border-[color:var(--gold)] hover:shadow-[0_22px_45px_rgba(11,27,59,0.20)]">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 80vw"
                      />
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportConfigPartial}
                      transition={{
                        duration: durations.entryFast,
                        delay: index * stagger.tight + 0.1,
                        ease: PREMIUM_EASE
                      }}
                      className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-ink"
                    >
                      {partner.name}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const workPanel = (
    <>
      <section
        id="services"
        ref={servicesRef}
        className="relative isolate min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image src="/images/services/1.jpg" alt="" fill className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,59,0.68)] via-[rgba(11,27,59,0.6)] to-[rgba(11,27,59,0.72)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(176,141,87,0.14),transparent_38%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pb-16 section-shell">
          <div className="flex-shrink-0 space-y-6 text-paper">
            <div className="max-w-3xl space-y-3">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-4xl font-semibold sm:text-5xl"
              >
                What We Do
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-lg leading-relaxed text-paper/80 sm:text-xl"
              >
                Seamless support across audit, taxation, risk advisory, virtual CFO, and strategic consulting—delivered with the discipline of a heritage practice and the pace of modern business.
              </motion.p>
            </div>
            <div className="flex-1 mt-6">
              <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
                {servicesData.map((service, index) => {
                  const isOdd = index % 2 === 0;
                  return (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceClick(service.id)}
                      variants={isOdd ? fadeLeft : fadeRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportConfigPartial}
                      transition={{
                        duration: durations.entry,
                        delay: index * stagger.relaxed,
                        ease: PREMIUM_EASE
                      }}
                      whileHover={{
                        y: -3,
                        transition: { duration: durations.hover, ease: PREMIUM_EASE }
                      }}
                      className="group relative flex min-h-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-[color:var(--rule)] bg-paper/85 p-5 text-center text-ink shadow-[0_20px_45px_rgba(11,27,59,0.18)] transition-shadow duration-300 ease-out hover:border-[color:var(--gold)] hover:shadow-[0_24px_60px_rgba(11,27,59,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(11,27,59,0.03)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="relative">
                        <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClientsSection id="clients" ref={clientsRef} />
    </>
  );

  const contactPanel = (
    <>
      <EnquirySection id="enquiry" ref={enquiryRef} />
      <FAQSection id="faq" ref={faqRef} />
    </>
  );

  return (
    <>
      <TopNav
        activeSection={activePanel}
        onNavigate={handleNavigate}
        isVisible={!isOnHome}
      />
      <main className="relative">
        <MainSnapLayout
          aboutPanel={aboutPanel}
          workPanel={workPanel}
          contactPanel={contactPanel}
          activePanel={activePanel}
          onPanelChange={handlePanelChange}
          aboutPanelRef={aboutPanelRef}
          workPanelRef={workPanelRef}
          contactPanelRef={contactPanelRef}
        />
        <PanelProgress
          activeIndex={PANEL_NAV_ITEMS.findIndex(p => p.id === activePanel)}
          onNavigate={handlePanelNav}
          activeSlideIndex={activeSlideIndex}
          setActiveSlideIndex={setActiveSlideIndex}
          landingSlides={landingSlides}
          playfairDisplayClassName={playfairDisplay.className}
          isOnHome={isOnHome}
        />
      </main>
      <ServiceModal
        isOpen={isServiceModalOpen}
        activeServiceId={activeServiceId}
        onClose={handleServiceModalClose}
        onServiceChange={handleServiceChange}
      />
    </>
  );
}

function PanelProgress({
  activeIndex,
  onNavigate,
  activeSlideIndex,
  setActiveSlideIndex,
  landingSlides,
  playfairDisplayClassName,
  isOnHome
}: {
  activeIndex: number;
  onNavigate: (index: number) => void;
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  landingSlides: Array<{ src: string; caption: string }>;
  playfairDisplayClassName: string;
  isOnHome: boolean;
}) {
  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center justify-center gap-3">
      {isOnHome && (
        <>
          <p
            className={`${playfairDisplayClassName} text-center text-base text-paper drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] sm:text-xl max-w-[600px] px-4`}
          >
            {landingSlides[activeSlideIndex]?.caption}
          </p>
          <div className="flex items-center justify-center gap-3 pointer-events-auto">
            {landingSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlideIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  index === activeSlideIndex
                    ? 'w-8 bg-paper shadow-[0_0_12px_rgba(251,248,242,0.5)]'
                    : 'w-2 bg-paper/40 hover:bg-paper/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="flex items-center gap-3 rounded-full border border-[color:var(--rule)] bg-paper/80 px-5 py-3 shadow-[0_18px_40px_rgba(11,27,59,0.18)] backdrop-blur">
        <span className="text-[0.65rem] uppercase tracking-[0.32em] text-muted">
          Sections
        </span>
        <div className="h-px w-12 bg-[color:var(--rule)]" aria-hidden />
        <div className="flex items-center gap-2">
          {PANEL_NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onNavigate(index)}
              animate={{
                backgroundColor: activeIndex === index ? "rgb(11, 27, 59)" : "transparent",
                borderColor: activeIndex === index ? "rgb(11, 27, 59)" : "rgba(11, 27, 59, 0.18)",
                color: activeIndex === index ? "rgb(251, 248, 242)" : "rgb(58, 74, 106)",
                scale: activeIndex === index ? 1.0 : 1,
              }}
              whileHover={{
                borderColor: "rgb(11, 27, 59)",
                color: "rgb(11, 27, 59)",
              }}
              transition={{
                duration: 0.4,
                ease: PREMIUM_EASE
              }}
              className="pointer-events-auto group relative flex h-8 w-8 items-center justify-center rounded-full border shadow-[0_12px_30px_rgba(11,27,59,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              style={{
                boxShadow: activeIndex === index ? "0 12px 30px rgba(11, 27, 59, 0.25)" : "none"
              }}
              aria-label={item.label}
            >
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-[0.65rem] text-[#333] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
              {ROMAN_NUMERALS[index] ?? `${index + 1}`}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
