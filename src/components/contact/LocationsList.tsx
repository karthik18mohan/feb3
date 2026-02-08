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

export function LocationsList({ locations, selectedId, onSelect }: LocationsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return locations;
    }
    const lower = query.toLowerCase();
    return locations.filter((location) => {
      return (
        location.name.toLowerCase().includes(lower) ||
        location.city.toLowerCase().includes(lower) ||
        location.addressLines.join(" ").toLowerCase().includes(lower)
      );
    });
  }, [locations, query]);

  return (
    <div className="flex h-full flex-col gap-3">
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
        placeholder="Search by name or city"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-lg border border-[color:var(--rule)] bg-white/90 px-3 py-2 text-sm text-ink placeholder:text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
      />
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 lg:max-h-[520px]">
        {filtered.map((location) => {
          const isSelected = location.id === selectedId;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelect(location.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                isSelected
                  ? "border-[color:var(--gold)] bg-[rgba(176,141,87,0.12)]"
                  : "border-[color:var(--rule)] bg-white/80 hover:border-[color:var(--gold)]"
              }`}
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">{location.name}</p>
                <p className="text-xs text-muted">
                  {location.addressLines.slice(0, 2).join(", ")}
                </p>
                <p className="text-xs text-muted">{formatLine(location)}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                {location.phone ? (
                  <a
                    href={`tel:${location.phone}`}
                    className="transition hover:text-ink"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Call
                  </a>
                ) : null}
                {location.email ? (
                  <a
                    href={`mailto:${location.email}`}
                    className="transition hover:text-ink"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Email
                  </a>
                ) : null}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ink"
                  onClick={(event) => event.stopPropagation()}
                >
                  Directions
                </a>
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
