"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { historyBody } from "@/content/copy";

export default function HistoryPage() {
  return (
    <>
      <TopNav isVisible={true} />
      <main className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/1.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pt-28 pb-16 overflow-y-auto">
          <div className="w-full max-w-4xl space-y-8">
            <SectionReveal>
              <h1 className="text-4xl font-semibold text-ink sm:text-5xl">History</h1>
            </SectionReveal>
            <SectionReveal>
              <p className="text-lg leading-relaxed text-muted sm:text-xl">{historyBody}</p>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
