export type Location = {
  id: string;
  name: string;
  addressLines: string[];
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  lat: number;
  lng: number;
  isPrimary?: boolean;
};

export const ALL_LOCATIONS_MYMAPS_EMBED_URL =
  "https://www.google.com/maps/d/u/0/embed?mid=1ywmwVXTu6hcZ65Xyxrciz_eBXjYRUuQ&ehbc=2E312F";

export const LOCATIONS: Location[] = [
  {
    id: "nathan-koz",
    name: "Nathan & Co.",
    addressLines: ["AG Road, Vellayil"],
    city: "Kozhikode",
    state: "Kerala",
    country: "India",
    postalCode: "400001",
    email: "info@nathanandco.in",
    phone: "+91 8089388655",
    lat: 11.2588,
    lng: 75.7804,
    isPrimary: true
  },
  {
    id: "bengaluru",
    name: "Nathan & Co. — Bengaluru",
    addressLines: ["MG Road", "Shanthala Nagar"],
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postalCode: "560001",
    lat: 12.9741854,
    lng: 77.6124135
  }
];
