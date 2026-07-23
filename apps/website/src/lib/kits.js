// Sponsorship kits — the "products" on the Donate page.
//
// PLACEHOLDER COPY: every `blurb` and `includes` below is lorem ipsum, standing
// in until the real kit descriptions are written. Names and amounts are real.
//
// The thumbnails are stand-ins too. Only Abot Ko Ang Libro has real photos, so
// the nature kit and the school project reuse them — those two thumbnails do
// not picture what is being sponsored. Drop replacements in
// src/assets/donate/kits/ and swap the `image`/`imageAlt` pair, rewriting the
// alt text to match the new photo.
import booksSpread from "../assets/donate/kits/books.jpg";
import booksStack from "../assets/donate/kits/books1.jpg";

export const KITS = [
  {
    id: "nature-kit",
    amount: 1500,
    name: "Batang Kali Nature-Stewardship Kit",
    program: "Ang Batang Kali",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam.",
    includes: ["Lorem ipsum dolor sit", "Consectetur adipiscing elit", "Sed do eiusmod tempor"],
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
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
    includes: ["Lorem ipsum dolor sit"],
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
  {
    id: "art-supplies",
    amount: 500,
    name: "Art & Learning Supplies",
    program: "Abot Ko Ang Libro",
    blurb: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    includes: ["Lorem ipsum dolor sit", "Consectetur adipiscing elit"],
    image: booksSpread,
    imageAlt: "Storybooks and backpacks laid out for distribution at a Síkat-Aurora reading corner",
  },
  {
    id: "school-project",
    amount: 5000,
    name: "Hiraya School Project",
    program: "Hiraya",
    blurb: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    includes: ["Lorem ipsum dolor sit", "Consectetur adipiscing elit", "Sed do eiusmod tempor"],
    // Stand-in photo — shows storybooks, not a Hiraya project
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
  {
    id: "reading-mentor-kit",
    amount: 1000,
    name: "Reading Mentor Kit",
    program: "Abot Ko Ang Libro",
    blurb: "Sponsor guides, tracking logs, and teaching flashcards for local volunteer reading mentors.",
    includes: ["Mentor training guidebook", "Student reading progress logs", "Assorted learning flashcards"],
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
  {
    id: "eco-camp-support",
    amount: 2500,
    name: "Eco-Stewardship Camp Support",
    program: "Ang Batang Kali",
    blurb: "Provide camp supplies, outdoor stewardship tools, and tree seedlings for nature conservation events.",
    includes: ["Camp outdoor guide", "Tree seedling for planting", "Reusable camp water flask"],
    image: booksSpread,
    imageAlt: "Storybooks and backpacks laid out for distribution at a Síkat-Aurora reading corner",
  },
];

export const getKit = (id) => KITS.find((k) => k.id === id);
