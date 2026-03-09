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
    id: "calicut",
    name: "Nathan & Co. — Calicut",
    addressLines: ["Aravind Ghosh Road, Vellayil"],
    city: "Kozhikode",
    state: "Kerala",
    country: "India",
    postalCode: "673032",
    email: "info@nathanandco.in",
    phone: "+91 8089388655",
    lat: 11.2588,
    lng: 75.7804,
    isPrimary: true
  },
  {
    id: "tirur",
    name: "Nathan & Co. — Tirur",
    addressLines: ["442 H Fida Tower", "PAN Bazar"],
    city: "Tirur",
    state: "Kerala",
    country: "India",
    postalCode: "676101",
    email: "info@nathanandco.in",
    phone: "+91 8089388655",
    lat: 10.9167,
    lng: 75.9222
  },
  {
    id: "haveri",
    name: "Nathan & Co. — Haveri",
    addressLines: ["No. 2919/B, M.G. Road", "Near Post Office"],
    city: "Haveri",
    state: "Karnataka",
    country: "India",
    postalCode: "581110",
    email: "info@nathanandco.in",
    phone: "+91 8089388655",
    lat: 14.7934,
    lng: 75.4043
  },
  {
    id: "cochin",
    name: "Nathan & Co. — Cochin",
    addressLines: ["38/2364B, Karuvelil Rd", "Edappally"],
    city: "Kochi",
    state: "Kerala",
    country: "India",
    postalCode: "682024",
    email: "info@nathanandco.in",
    phone: "+91 8089388655",
    lat: 10.0159,
    lng: 76.3095
  }
];
