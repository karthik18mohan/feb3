"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer, ScrollToPlugin } from "gsap/all";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { partners } from "@/content/partners";
import { ClientsSection } from "@/components/ClientsSection";
import { EnquirySection } from "@/components/EnquirySection";
import { FAQSection } from "@/components/FAQSection";

type SectionId =
  | "home"
  | "about"
  | "services"
  | "partners"
  | "clients"
  | "enquiry"
  | "faq";

const SECTION_ORDER: SectionId[] = [
  "home",
  "about",
  "services",
  "partners",
  "clients",
  "enquiry",
  "faq"
];

type SectionNavItem = {
  id: string;
  label: string;
  href: string;
  sectionId?: SectionId;
};

const SECTION_NAV_ITEMS: SectionNavItem[] = [
  { id: "home", label: "Home", href: "#home", sectionId: "home" },
  { id: "who-we-are", label: "Who We Are", href: "#about", sectionId: "about" },
  { id: "what-we-do", label: "What We Do", href: "#services", sectionId: "services" },
  { id: "partners", label: "Partners", href: "#partners", sectionId: "partners" },
  { id: "clients", label: "Clients", href: "#clients", sectionId: "clients" },
  { id: "enquiry", label: "Enquiry", href: "#enquiry", sectionId: "enquiry" },
  { id: "faq", label: "FAQ", href: "#faq", sectionId: "faq" }
];

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const landingSlides = [
  {
    src: "/images/landing-page/0.jpg",
    caption: "Rooted in Heritage — Serving Since 1962"
  },
  {
    src: "/images/landing-page/1.jpg",
    caption: "Enlightened Across Generations"
  },
  {
    src: "/images/landing-page/2.jpg",
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
  const router = useRouter();
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const partnersRef = useRef<HTMLElement | null>(null);
  const clientsRef = useRef<HTMLElement | null>(null);
  const enquiryRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [navActiveIndex, setNavActiveIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const transitionIdRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const slideCount = landingSlides.length;

  const getSectionByIndex = useCallback(
    (index: number) => {
      const map: Record<SectionId, HTMLElement | null> = {
        home: homeRef.current,
        about: aboutRef.current,
        services: servicesRef.current,
        partners: partnersRef.current,
        clients: clientsRef.current,
        enquiry: enquiryRef.current,
        faq: faqRef.current
      };

      return map[SECTION_ORDER[index]];
    },
    []
  );

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    setNavActiveIndex(currentIndex);
  }, [currentIndex]);

  const ensureSectionVisible = useCallback((section: HTMLElement | null) => {
    if (!section) return;
    const targets = section.querySelectorAll("[data-animate]");
    if (targets.length) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "opacity,transform" });
    }
  }, []);

  const getNearestSectionIndex = useCallback(() => {
    let nearestIndex = currentIndexRef.current;
    let smallestDistance = Number.POSITIVE_INFINITY;

    SECTION_ORDER.forEach((_, index) => {
      const section = getSectionByIndex(index);
      if (!section) return;
      const distance = Math.abs(section.getBoundingClientRect().top);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }, [getSectionByIndex]);

  const syncSectionToScroll = useCallback(() => {
    const nearestIndex = getNearestSectionIndex();
    const nearestSection = getSectionByIndex(nearestIndex);
    if (!nearestSection) return;
    if (currentIndexRef.current !== nearestIndex) {
      currentIndexRef.current = nearestIndex;
      setCurrentIndex(nearestIndex);
    }
    if (!isAnimatingRef.current) {
      ensureSectionVisible(nearestSection);
    }
  }, [ensureSectionVisible, getNearestSectionIndex, getSectionByIndex]);

  const snapToIndex = useCallback(
    (index: number) => {
      const targetSection = getSectionByIndex(index);
      if (!targetSection) return;
      if (activeScrollTweenRef.current) {
        activeScrollTweenRef.current.kill();
        activeScrollTweenRef.current = null;
      }
      isAnimatingRef.current = true;
      activeScrollTweenRef.current = gsap.to(window, {
        scrollTo: { y: targetSection, autoKill: false },
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          ensureSectionVisible(targetSection);
          isAnimatingRef.current = false;
          activeScrollTweenRef.current = null;
        },
        onInterrupt: () => {
          isAnimatingRef.current = false;
          activeScrollTweenRef.current = null;
          syncSectionToScroll();
        }
      });
    },
    [ensureSectionVisible, getSectionByIndex, syncSectionToScroll]
  );

  const animateToIndex = useCallback(
    (nextIndex: number, triggerEvent?: Event) => {
      const total = SECTION_ORDER.length;
      const current = currentIndexRef.current;
      if (nextIndex === current || nextIndex < 0 || nextIndex >= total) return;
      const currentSection = getSectionByIndex(current);
      const nextSection = getSectionByIndex(nextIndex);
      if (!nextSection || !currentSection || isAnimatingRef.current) return;

      triggerEvent?.preventDefault();
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
        activeTimelineRef.current = null;
      }
      if (activeScrollTweenRef.current) {
        activeScrollTweenRef.current.kill();
        activeScrollTweenRef.current = null;
      }
      gsap.killTweensOf(window);
      ensureSectionVisible(currentSection);
      ensureSectionVisible(nextSection);
      isAnimatingRef.current = true;
      transitionIdRef.current += 1;
      const transitionId = transitionIdRef.current;
      const prefersReduced = prefersReducedMotionRef.current;
      const direction = nextIndex > current ? 1 : -1;
      const currentTargets = currentSection.querySelectorAll("[data-animate]");
      const nextTargets = nextSection.querySelectorAll("[data-animate]");

      const finalize = () => {
        if (transitionIdRef.current !== transitionId) return;
        currentIndexRef.current = nextIndex;
        setCurrentIndex(nextIndex);
        ensureSectionVisible(nextSection);
        isAnimatingRef.current = false;
        activeTimelineRef.current = null;
        activeScrollTweenRef.current = null;
      };

      const handleInterrupt = () => {
        if (transitionIdRef.current !== transitionId) return;
        isAnimatingRef.current = false;
        activeTimelineRef.current = null;
        activeScrollTweenRef.current = null;
        syncSectionToScroll();
      };

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: finalize,
        onInterrupt: handleInterrupt
      });

      if (prefersReduced) {
        activeTimelineRef.current = null;
        activeScrollTweenRef.current = gsap.to(window, {
          scrollTo: { y: nextSection, autoKill: false },
          duration: 0.45,
          ease: "power1.inOut",
          onComplete: finalize,
          onInterrupt: handleInterrupt
        });
        return;
      }

      activeTimelineRef.current = timeline;
      timeline
        .to(currentTargets, {
          opacity: 0,
          y: direction === 1 ? -12 : 12,
          duration: 0.25,
          stagger: 0.04,
          ease: "power1.out"
        })
        .set(
          nextTargets,
          { opacity: 0, y: direction === 1 ? 18 : -18 },
          "-=0.05"
        )
        .to(
          window,
          {
            scrollTo: { y: nextSection, autoKill: false },
            duration: 1,
            ease: "power2.inOut"
          },
          "-=0.05"
        )
        .to(
          nextTargets,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out"
          },
          "-=0.4"
        );
    },
    [getSectionByIndex]
  );

  const handleNavigate = useCallback(
    (href: string) => {
      const normalized = href.replace("#", "") as SectionId;
      const targetIndex = SECTION_ORDER.indexOf(normalized);
      if (targetIndex >= 0) {
        animateToIndex(targetIndex);
      }
    },
    [animateToIndex]
  );

  const handleSectionNav = useCallback(
    (item: SectionNavItem, index: number) => {
      setNavActiveIndex(index);
      if (item.sectionId) {
        const targetIndex = SECTION_ORDER.indexOf(item.sectionId);
        if (targetIndex >= 0) {
          animateToIndex(targetIndex);
          return;
        }
      }
      router.push(item.href);
    },
    [animateToIndex, router]
  );

  useEffect(() => {
    ensureSectionVisible(getSectionByIndex(currentIndexRef.current));
  }, [ensureSectionVisible, getSectionByIndex]);

  useEffect(() => {
    const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersMotion.matches) return;
    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slideCount);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [slideCount]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const handleNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isAnimatingRef.current) {
        syncSectionToScroll();
      }
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
      scrollEndTimeoutRef.current = window.setTimeout(() => {
        if (isAnimatingRef.current) return;
        snapToIndex(getNearestSectionIndex());
      }, 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
        scrollEndTimeoutRef.current = null;
      }
    };
  }, [getNearestSectionIndex, snapToIndex, syncSectionToScroll]);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, Observer);
    const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = prefersMotion.matches;
    const updateMotionPreference = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };
    prefersMotion.addEventListener("change", updateMotionPreference);

    document.documentElement.style.scrollBehavior = "auto";
    const canScrollWithin = (event: Event | undefined, direction: "up" | "down") => {
      if (!event) return false;
      const target = event.target as HTMLElement | null;
      const scrollable = target?.closest("[data-scrollable]") as HTMLElement | null;
      if (!scrollable) return false;
      if (direction === "down") {
        return Math.ceil(scrollable.scrollTop + scrollable.clientHeight) < scrollable.scrollHeight;
      }
      return scrollable.scrollTop > 0;
    };

    const getScrollableTarget = (event: Event | undefined) => {
      if (!event) return null;
      const target = event.target as HTMLElement | null;
      return target?.closest("[data-scrollable]") as HTMLElement | null;
    };

    const getDirectionFromEvent = (event: Event | undefined) => {
      if (!event) return null;
      if ("deltaY" in event) {
        return (event as WheelEvent).deltaY > 0 ? "down" : "up";
      }
      if (event.type === "touchstart" && "touches" in event) {
        const touch = (event as TouchEvent).touches[0];
        if (touch) {
          lastTouchYRef.current = touch.clientY;
        }
        return null;
      }
      if (event.type === "touchmove" && "touches" in event) {
        const touch = (event as TouchEvent).touches[0];
        if (!touch) return null;
        const lastY = lastTouchYRef.current ?? touch.clientY;
        lastTouchYRef.current = touch.clientY;
        return touch.clientY < lastY ? "down" : "up";
      }
      return null;
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: 0.9,
      tolerance: 8,
      preventDefault: true,
      allowClicks: true,
      ignoreCheck: (event) => {
        const scrollable = getScrollableTarget(event as Event);
        if (!scrollable) {
          const direction = getDirectionFromEvent(event as Event);
          if (!direction) return false;
          if (direction === "down" && currentIndexRef.current >= SECTION_ORDER.length - 1) {
            return true;
          }
          if (direction === "up" && currentIndexRef.current <= 0) {
            return true;
          }
          return false;
        }
        if (event?.type === "touchstart") {
          return true;
        }
        const direction = getDirectionFromEvent(event as Event);
        if (!direction) return true;
        return canScrollWithin(event as Event, direction);
      },
      onDown: (self) => {
        if (isAnimatingRef.current) {
          self.event?.preventDefault();
          return;
        }
        if (canScrollWithin(self.event as Event, "down")) return;
        if (currentIndexRef.current < SECTION_ORDER.length - 1) {
          self.event?.preventDefault();
          animateToIndex(currentIndexRef.current + 1, self.event as Event);
        }
      },
      onUp: (self) => {
        if (isAnimatingRef.current) {
          self.event?.preventDefault();
          return;
        }
        if (canScrollWithin(self.event as Event, "up")) return;
        if (currentIndexRef.current > 0) {
          self.event?.preventDefault();
          animateToIndex(currentIndexRef.current - 1, self.event as Event);
        }
      }
    });

    if (!prefersReducedMotionRef.current && heroBgRef.current) {
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.1, ease: "power2.out" }
      );
    }

    return () => {
      observer.kill();
      prefersMotion.removeEventListener("change", updateMotionPreference);
    };
  }, [animateToIndex]);

  return (
    <>
      <TopNav activeSection={SECTION_ORDER[currentIndex]} onNavigate={handleNavigate} />
      <main className="relative">
        <section
          id="home"
          ref={homeRef}
          className="relative isolate min-h-screen overflow-hidden"
        >
          <div ref={heroBgRef} className="absolute inset-0">
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
                  className="object-cover grayscale"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[rgba(6,10,20,0.28)]" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,59,0.7)] via-[rgba(11,27,59,0.58)] to-[rgba(11,27,59,0.46)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(176,141,87,0.16),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(6,10,20,0.9)] via-[rgba(6,10,20,0.35)] to-transparent pb-10 pt-16">
            <p
              className={`${playfairDisplay.className} mx-auto w-full max-w-[1180px] px-6 text-base text-slate-200 drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)] sm:text-xl md:text-2xl`}
            >
              {landingSlides[activeSlideIndex]?.caption}
            </p>
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 bg-[rgba(11,27,59,0.45)] text-paper shadow-[0_12px_30px_rgba(3,7,18,0.45)] transition hover:-translate-y-0.5 hover:border-paper/70 hover:bg-[rgba(11,27,59,0.6)]"
              aria-label="Previous slide"
            >
              <span aria-hidden className="text-xl">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 bg-[rgba(11,27,59,0.45)] text-paper shadow-[0_12px_30px_rgba(3,7,18,0.45)] transition hover:-translate-y-0.5 hover:border-paper/70 hover:bg-[rgba(11,27,59,0.6)]"
              aria-label="Next slide"
            >
              <span aria-hidden className="text-xl">
                ›
              </span>
            </button>
          </div>
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-6 py-28">
            <div className="max-w-2xl space-y-7 text-paper">
              <div data-animate className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-paper/80">
                <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
                Chartered Accountants
              </div>
              <h1 data-animate className="text-5xl font-semibold sm:text-6xl md:text-7xl">
                Nathan &amp; Co.
              </h1>
              <p data-animate className="text-lg uppercase tracking-[0.32em] text-paper/80">
                Chartered Accountants
              </p>
              <p data-animate className="max-w-xl text-xl leading-relaxed text-paper/85">
                Upholding the highest ideals of quality, integrity, and trust.
              </p>
              <div data-animate className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNavigate("#services")}
                  className="rounded-full bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink shadow-[0_18px_40px_rgba(11,27,59,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(11,27,59,0.34)]"
                >
                  What We Do
                </button>
                <button
                  onClick={() => handleNavigate("#about")}
                  className="rounded-full border border-[color:var(--rule)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-paper transition hover:-translate-y-0.5 hover:border-paper/80 hover:bg-paper/10"
                >
                  Who We Are
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          ref={aboutRef}
          className="relative isolate min-h-screen overflow-hidden bg-paper"
        >
          <div className="absolute inset-0">
            <Image src="/images/2.jpg" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(251,248,242,0.86)] via-[rgba(251,248,242,0.78)] to-[rgba(251,248,242,0.86)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,27,59,0.18)] via-transparent to-[rgba(251,248,242,0.7)]" />
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-6 py-28">
            <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-6">
                <div data-animate className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-muted">
                  <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
                  Who We Are
                </div>
                <h2 data-animate className="text-4xl font-semibold text-ink sm:text-5xl">
                  A heritage of elevated service and discretion.
                </h2>
                <div className="space-y-4">
                  {aboutParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      data-animate
                      className="text-lg leading-relaxed text-muted sm:text-xl"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div
                data-animate
                className="relative rounded-2xl border border-rule bg-paper/80 p-8 shadow-[0_24px_60px_rgba(11,27,59,0.12)] backdrop-blur"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(11,27,59,0.04)] to-transparent" />
                <div className="relative space-y-5">
                  <p className="text-xs uppercase tracking-[0.38em] text-muted">
                    Pillars
                  </p>
                  <h3 className="text-3xl font-semibold text-ink">Quality • Integrity • Trust</h3>
                  <ul className="space-y-2 text-base leading-relaxed text-muted">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-px w-6 shrink-0 bg-[color:var(--gold)]" aria-hidden />
                      Precision in every mandate, anchored in ethics.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-px w-6 shrink-0 bg-[color:var(--gold)]" aria-hidden />
                      Stewardship built on discretion and clarity.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-px w-6 shrink-0 bg-[color:var(--gold)]" aria-hidden />
                      Guidance that honors legacy while embracing progress.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          ref={servicesRef}
          className="relative isolate min-h-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image src="/images/3.jpg" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,59,0.68)] via-[rgba(11,27,59,0.6)] to-[rgba(11,27,59,0.72)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(176,141,87,0.14),transparent_38%)]" />
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-6 py-28">
            <div className="space-y-6 text-paper">
              <div data-animate className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.42em] text-paper/80">
                <span className="inline-block h-px w-8 bg-[color:var(--gold)]" aria-hidden />
                What We Do
              </div>
              <div className="max-w-3xl space-y-3">
                <h2 data-animate className="text-4xl font-semibold sm:text-5xl">
                  Integrated advisory, audit, and assurance.
                </h2>
                <p data-animate className="text-lg leading-relaxed text-paper/80 sm:text-xl">
                  Seamless support across audit, taxation, risk advisory, virtual CFO, and strategic consulting—delivered with the discipline of a heritage practice and the pace of modern business.
                </p>
              </div>
              <div
                data-scrollable
                className="max-h-[68vh] overflow-y-auto pr-2"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((service, index) => (
                    <article
                      key={service.title}
                      data-animate
                      className="group relative overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-paper/85 p-6 text-ink shadow-[0_20px_45px_rgba(11,27,59,0.18)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-paper hover:shadow-[0_24px_60px_rgba(11,27,59,0.22)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(11,27,59,0.03)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      <div className="relative space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--rule)] bg-paper/70 text-sm font-semibold text-ink">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                        </div>
                        <div className="space-y-3 text-sm leading-relaxed text-muted">
                          {service.body.split("\n").map((chunk) => (
                            <p key={chunk}>{chunk}</p>
                          ))}
                        </div>
                        {service.bullets && (
                          <ul className="space-y-2 text-sm leading-relaxed text-ink">
                            {service.bullets.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 rounded-lg border border-transparent px-2 py-1 transition group-hover:border-[color:var(--rule)]"
                              >
                                <span className="mt-[6px] inline-block h-[9px] w-[9px] rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)]" aria-hidden />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {service.subSections && (
                          <div className="space-y-4">
                            {service.subSections.map((sub) => (
                              <div key={sub.title} className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                                  {sub.title}
                                </p>
                                <ul className="space-y-2 text-sm leading-relaxed text-ink">
                                  {sub.bullets.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-start gap-2 rounded-lg border border-transparent px-2 py-1 transition group-hover:border-[color:var(--rule)]"
                                    >
                                      <span className="mt-[6px] inline-block h-[9px] w-[9px] rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)]" aria-hidden />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="partners"
          ref={partnersRef}
          className="relative isolate min-h-screen overflow-hidden bg-paper"
        >
          <div className="flex min-h-screen flex-col">
            <div className="relative h-[38vh] min-h-[240px] w-full overflow-hidden">
              <Image
                src="/images/2.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,59,0.78)] via-[rgba(11,27,59,0.62)] to-[rgba(11,27,59,0.72)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(176,141,87,0.18),transparent_40%)]" />
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <motion.h2
                  data-animate
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-center text-4xl font-semibold text-paper drop-shadow-[0_12px_30px_rgba(3,7,18,0.55)] sm:text-5xl"
                >
                  Our Partners
                </motion.h2>
              </div>
            </div>
            <div
              data-scrollable
              className="flex-1 min-h-0 overflow-y-auto bg-paper px-6 py-12"
            >
              <div className="mx-auto w-full max-w-[1180px] space-y-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                      className="flex flex-col"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-rule bg-paper shadow-[0_18px_40px_rgba(11,27,59,0.16)]">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 80vw"
                        />
                      </div>
                      <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-ink">
                        {partner.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ClientsSection id="clients" ref={clientsRef} />
        <EnquirySection id="enquiry" ref={enquiryRef} />
        <FAQSection id="faq" ref={faqRef} />
        <SectionProgress activeIndex={navActiveIndex} onNavigate={handleSectionNav} />
      </main>
    </>
  );
}

function SectionProgress({
  activeIndex,
  onNavigate
}: {
  activeIndex: number;
  onNavigate: (item: SectionNavItem, index: number) => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-[color:var(--rule)] bg-paper/80 px-5 py-3 shadow-[0_18px_40px_rgba(11,27,59,0.18)] backdrop-blur">
        <span className="text-[0.65rem] uppercase tracking-[0.32em] text-muted">
          Sections
        </span>
        <div className="h-px w-12 bg-[color:var(--rule)]" aria-hidden />
        <div className="flex max-w-[140px] items-center gap-2 overflow-x-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:max-w-none md:overflow-visible">
          {SECTION_NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item, index)}
              className={`pointer-events-auto group relative flex h-8 w-8 items-center justify-center rounded-full border transition ${
                activeIndex === index
                  ? "border-ink bg-ink text-paper shadow-[0_12px_30px_rgba(11,27,59,0.25)]"
                  : "border-[color:var(--rule)] text-muted hover:border-ink hover:text-ink"
              }`}
              aria-label={item.label}
            >
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-[0.65rem] text-[#333] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
              {ROMAN_NUMERALS[index] ?? `${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
