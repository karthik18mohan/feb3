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
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4007030.655647701!2d77.45600009642519!3d11.252885525518911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1770533659926!5m2!1sen!2sin";

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
