// Sponsorship kits — the "products" on the Donate page.
//
// The four images are PLACEHOLDERS. To drop in a real photo, save it into
// src/assets/donate/kits/ and change that kit's import below to the new
// filename (e.g. "./…/150-storybooks.jpg"). Landscape, roughly 4:3, is what
// the card thumbnails are cropped for.
import storybooksImg from "../assets/donate/kits/150-storybooks.svg";
import artSuppliesImg from "../assets/donate/kits/500-art-supplies.svg";
import natureKitImg from "../assets/donate/kits/1500-nature-kit.svg";
import schoolProjectImg from "../assets/donate/kits/5000-school-project.svg";

export const KITS = [
  {
    id: "nature-kit",
    amount: 1500,
    name: "Batang Kali Nature-Stewardship Kit",
    program: "Ang Batang Kali",
    blurb:
      "Seedlings, trowels, gloves and a field workbook — everything one batch of kids needs for a full nature-stewardship session.",
    includes: ["Seedlings & potting soil", "Trowels and gloves", "Field workbook per child"],
    image: natureKitImg,
    imageAlt: "Placeholder for a photo of the Batang Kali nature-stewardship kit",
    featured: true,
  },
  {
    id: "storybooks",
    amount: 150,
    name: "Storybook Bundle",
    program: "Abot Ko Ang Libro",
    blurb: "Three storybooks for the Abot Ko Ang Libro mobile cart.",
    includes: ["3 age-appropriate storybooks"],
    image: storybooksImg,
    imageAlt: "Placeholder for a photo of the storybook bundle",
  },
  {
    id: "art-supplies",
    amount: 500,
    name: "Art & Learning Supplies",
    program: "Abot Ko Ang Libro",
    blurb: "Art and learning supplies for one Saturday storytelling session.",
    includes: ["Paper, crayons & markers", "Session craft materials"],
    image: artSuppliesImg,
    imageAlt: "Placeholder for a photo of the art and learning supplies",
  },
  {
    id: "school-project",
    amount: 5000,
    name: "Hiraya School Project",
    program: "Hiraya",
    blurb: "Seed funding for one youth-led Hiraya school project, start to finish.",
    includes: ["Project seed fund", "Materials & logistics", "Mentoring for the youth team"],
    image: schoolProjectImg,
    imageAlt: "Placeholder for a photo of a Hiraya school project",
  },
];

export const getKit = (id) => KITS.find((k) => k.id === id);
