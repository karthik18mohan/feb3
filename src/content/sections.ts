export const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

export const SECTION_DEFINITIONS = [
  { id: "home", name: "Home" },
  { id: "about", name: "Who We Are" },
  { id: "services", name: "What We Do" },
  { id: "enquiry", name: "Start an Enquiry" },
  { id: "faq", name: "Frequently Asked Questions" }
];

export const SECTION_ITEMS = SECTION_DEFINITIONS.map((section, index) => ({
  ...section,
  numeral: ROMAN_NUMERALS[index] ?? `${index + 1}`
}));
