// Sponsorship kits — the "products" on the Donate page.
//
// Only two real kit photos exist so far, both of the Abot Ko Ang Libro
// storybooks. The nature kit and the school project reuse them as stand-ins, so
// their thumbnails do NOT picture what is being sponsored. When you have proper
// photos for those two, drop them in src/assets/donate/kits/ and swap their
// `image`/`imageAlt` pair below — and rewrite the alt text to match the photo.
import booksSpread from "../assets/donate/kits/books.jpg";
import booksStack from "../assets/donate/kits/books1.jpg";

export const KITS = [
  {
    id: "nature-kit",
    amount: 1500,
    name: "Batang Kali Nature-Stewardship Kit",
    program: "Ang Batang Kali",
    blurb:
      "Seedlings, trowels, gloves and a field workbook — everything one batch of kids needs for a full nature-stewardship session.",
    includes: ["Seedlings & potting soil", "Trowels and gloves", "Field workbook per child"],
    // Stand-in photo — shows storybooks, not the nature kit
    image: booksSpread,
    imageAlt: "Storybooks and backpacks laid out for distribution at a Síkat-Aurora reading corner",
    featured: true,
  },
  {
    id: "storybooks",
    amount: 150,
    name: "Storybook Bundle",
    program: "Abot Ko Ang Libro",
    blurb: "Three storybooks for the Abot Ko Ang Libro mobile cart.",
    includes: ["3 age-appropriate storybooks"],
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
  {
    id: "art-supplies",
    amount: 500,
    name: "Art & Learning Supplies",
    program: "Abot Ko Ang Libro",
    blurb: "Art and learning supplies for one Saturday storytelling session.",
    includes: ["Paper, crayons & markers", "Session craft materials"],
    image: booksSpread,
    imageAlt: "Storybooks and backpacks laid out for distribution at a Síkat-Aurora reading corner",
  },
  {
    id: "school-project",
    amount: 5000,
    name: "Hiraya School Project",
    program: "Hiraya",
    blurb: "Seed funding for one youth-led Hiraya school project, start to finish.",
    includes: ["Project seed fund", "Materials & logistics", "Mentoring for the youth team"],
    // Stand-in photo — shows storybooks, not a Hiraya project
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
];

export const getKit = (id) => KITS.find((k) => k.id === id);
