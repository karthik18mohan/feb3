"use client";

import { useMemo } from "react";
import type { Location } from "config/locations";
import { ALL_LOCATIONS_MYMAPS_EMBED_URL } from "config/locations";

type MapPanelProps = {
  location?: Location | null;
};

export function MapPanel({ location }: MapPanelProps) {
  const { mapSrc, directionsUrl, mapTitle } = useMemo(() => {
    if (!location) {
      return {
        mapSrc: ALL_LOCATIONS_MYMAPS_EMBED_URL,
        directionsUrl: null,
        mapTitle: "Map of all locations"
      };
    }
    const locationWithQuery = location as Location & { placeQuery?: string };
    if (typeof location.lat === "number" && typeof location.lng === "number") {
      const coords = `${location.lat},${location.lng}`;
      return {
        mapSrc: `https://www.google.com/maps?q=${coords}&z=16&output=embed`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${coords}`,
        mapTitle: `Map of ${location.name}`
      };
    }
    if (locationWithQuery.placeQuery) {
      const encoded = encodeURIComponent(locationWithQuery.placeQuery);
      return {
        mapSrc: `https://www.google.com/maps?q=${encoded}&z=16&output=embed`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
        mapTitle: `Map of ${location.name}`
      };
    }
    return {
      mapSrc: ALL_LOCATIONS_MYMAPS_EMBED_URL,
      directionsUrl: null,
      mapTitle: "Map of all locations"
    };
  }, [location]);

  const isAllLocations = !location;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="overflow-hidden rounded-xl border border-[color:var(--rule)] bg-white/80 shadow-sm">
        <div
          className={`relative overflow-hidden ${
            isAllLocations ? "h-[240px] sm:h-[260px] lg:h-[430px]" : ""
          }`}
        >
          <iframe
            title={mapTitle}
            src={mapSrc}
            className={
              isAllLocations
                ? "h-[calc(100%+70px)] w-full -translate-y-[70px]"
                : "h-[240px] w-full sm:h-[260px] lg:h-[430px]"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink bg-ink px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-paper transition hover:shadow-[0_12px_30px_rgba(11,27,59,0.25)]"
            aria-label="Directions"
          >
            Directions
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="Select one address"
            className="cursor-not-allowed rounded-full border border-[color:var(--rule)] bg-white/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted"
            aria-label="Directions"
          >
            Directions
          </button>
        )}
      </div>
    </div>
  );
}
