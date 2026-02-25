"use client";

import { useMemo, useState } from "react";
import type { Location } from "config/locations";

type LocationsListProps = {
  locations: Location[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const formatLine = (location: Location) => {
  const parts = [location.city, location.state, location.country].filter(Boolean);
  return parts.join(", ");
};

const iconClassName = "h-3.5 w-3.5";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.62 2.63a2 2 0 0 1-.45 2.11L8 9.99a16 16 0 0 0 6 6l1.53-1.28a2 2 0 0 1 2.11-.45c.84.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h9a3 3 0 0 0 3-3V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 6 3-3 3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 15 3 3-3 3" />
    </svg>
  );
}

export function LocationsList({ locations, selectedId, onSelect }: LocationsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return locations;
    }
    const lower = query.toLowerCase();
    return locations.filter((location) => {
      const haystack = [
        location.name,
        location.city,
        location.state,
        location.country,
        location.postalCode,
        location.email,
        location.phone,
        ...location.addressLines
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(lower);
    });
  }, [locations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-ink">
          Locations
        </h3>
        <span className="text-xs uppercase tracking-[0.22em] text-muted">
          {filtered.length} sites
        </span>
      </div>
      <label className="sr-only" htmlFor="location-search">
        Search locations
      </label>
      <input
        id="location-search"
        type="search"
        placeholder="Search across all location details"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-3 py-2 text-sm text-ink placeholder:text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
      />
      <div className="flex-1 min-h-0 space-y-2 overflow-y-auto pr-1">
        {filtered.map((location) => {
          const isSelected = location.id === selectedId;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelect(location.id)}
              className={`w-full rounded-xl border px-3 py-2 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                isSelected
                  ? "border-[color:var(--gold)] bg-[rgba(176,141,87,0.12)]"
                  : "border-[color:var(--rule)] bg-white/80 hover:border-[color:var(--gold)]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-0.5">
                  <p className="truncate text-sm font-semibold text-ink">{location.name}</p>
                  <p className="overflow-hidden text-xs leading-4 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {location.addressLines.slice(0, 2).join(", ")}
                  </p>
                  <p className="truncate text-xs text-muted">{formatLine(location)}</p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1">
                  {location.phone ? (
                    <a
                      href={`tel:${location.phone}`}
                      aria-label={`Call ${location.name}`}
                      title="Call"
                      className="rounded-md border border-[color:var(--rule)] bg-white/80 p-1.5 text-muted transition hover:text-ink"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <PhoneIcon />
                    </a>
                  ) : null}
                  {location.email ? (
                    <a
                      href={`mailto:${location.email}`}
                      aria-label={`Email ${location.name}`}
                      title="Email"
                      className="rounded-md border border-[color:var(--rule)] bg-white/80 p-1.5 text-muted transition hover:text-ink"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <MailIcon />
                    </a>
                  ) : null}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Directions to ${location.name}`}
                    title="Directions"
                    className="rounded-md border border-[color:var(--rule)] bg-white/80 p-1.5 text-muted transition hover:text-ink"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <DirectionsIcon />
                  </a>
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[color:var(--rule)] px-3 py-4 text-xs text-muted">
            No locations match your search.
          </p>
        ) : null}
      </div>
    </div>
  );
}
