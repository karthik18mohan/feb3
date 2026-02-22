import { Suspense } from "react";
import HomePageClient from "@/components/HomePageClient";

export default function EnquiryPage() {
  return (
    <Suspense fallback={null}>
      <HomePageClient />
    </Suspense>
  );
}
