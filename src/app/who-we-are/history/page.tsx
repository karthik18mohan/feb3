import { SectionReveal } from "@/components/SectionReveal";
import { historyBody } from "@/content/copy";

export default function HistoryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20">
      <SectionReveal>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">History</h1>
      </SectionReveal>
      <SectionReveal>
        <p className="mt-8 text-lg leading-relaxed text-ink/80">{historyBody}</p>
      </SectionReveal>
    </main>
  );
}
