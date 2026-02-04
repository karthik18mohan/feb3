"use client";

import { ReactNode, useRef, useEffect, forwardRef } from "react";

export type PanelId = "about" | "work" | "contact";

interface MainSnapLayoutProps {
  aboutPanel: ReactNode;
  workPanel: ReactNode;
  contactPanel: ReactNode;
  activePanel: PanelId;
  onPanelChange: (panel: PanelId) => void;
  aboutPanelRef: React.RefObject<HTMLDivElement>;
  workPanelRef: React.RefObject<HTMLDivElement>;
  contactPanelRef: React.RefObject<HTMLDivElement>;
}

export function MainSnapLayout({
  aboutPanel,
  workPanel,
  contactPanel,
  activePanel,
  onPanelChange,
  aboutPanelRef,
  workPanelRef,
  contactPanelRef
}: MainSnapLayoutProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outerContainer = outerContainerRef.current;
    if (!outerContainer) return;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const panels = [
          { ref: aboutPanelRef, id: "about" as PanelId },
          { ref: workPanelRef, id: "work" as PanelId },
          { ref: contactPanelRef, id: "contact" as PanelId }
        ];

        let nearestPanel: PanelId = "about";
        let minDistance = Infinity;

        panels.forEach(({ ref, id }) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.left);
          if (distance < minDistance) {
            minDistance = distance;
            nearestPanel = id;
          }
        });

        if (nearestPanel !== activePanel) {
          onPanelChange(nearestPanel);
        }
        rafId = null;
      });
    };

    outerContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      outerContainer.removeEventListener("scroll", handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [activePanel, onPanelChange, aboutPanelRef, workPanelRef, contactPanelRef]);

  return (
    <div
      ref={outerContainerRef}
      className="h-screen w-screen overflow-x-auto overflow-y-hidden scroll-smooth flex"
      style={{
        scrollSnapType: "x mandatory"
      }}
    >
      <SnapPanel ref={aboutPanelRef} id="panel-about">
        {aboutPanel}
      </SnapPanel>

      <SnapPanel ref={workPanelRef} id="panel-work">
        {workPanel}
      </SnapPanel>

      <SnapPanel ref={contactPanelRef} id="panel-contact">
        {contactPanel}
      </SnapPanel>
    </div>
  );
}

const SnapPanel = forwardRef<HTMLDivElement, { children: ReactNode; id: string }>(
  ({ children, id }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className="min-w-[100vw] h-screen w-screen flex-shrink-0 overflow-hidden"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          className="h-screen w-screen overflow-x-hidden overflow-y-auto"
          style={{ overscrollBehavior: "contain" }}
          data-panel-scroll="true"
        >
          {children}
        </div>
      </div>
    );
  }
);

SnapPanel.displayName = "SnapPanel";

export function scrollToPanel(
  panelId: PanelId,
  options: { behavior?: ScrollBehavior; sectionId?: string } = {}
) {
  const panelIdMap: Record<PanelId, string> = {
    about: "panel-about",
    work: "panel-work",
    contact: "panel-contact"
  };

  const element = document.getElementById(panelIdMap[panelId]);
  if (element) {
    const behavior = options.behavior ?? "smooth";
    element.scrollIntoView({ behavior, inline: "start", block: "nearest" });
    const scrollContainer = element.querySelector<HTMLElement>("[data-panel-scroll='true']");
    if (!scrollContainer) return;
    if (options.sectionId) {
      const targetSection = document.getElementById(options.sectionId);
      if (targetSection && scrollContainer.contains(targetSection)) {
        targetSection.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    scrollContainer.scrollTo({ top: 0, behavior });
  }
}
