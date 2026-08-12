// Sponsorship kits — the "products" on the Donate page.
//
// The KALI Kit thumbnail is a stand-in — it shows storybooks, not the kit
// contents. Drop a replacement in src/assets/donate/kits/ and swap the
// `image`/`imageAlt` pair, rewriting the alt text to match the new photo.
import booksSpread from "../assets/donate/kits/books.jpg";
import booksStack from "../assets/donate/kits/books1.jpg";
import sukbitBags from "../assets/donate/kits/sukbit.jpg";

export const KITS = [
  {
    id: "sukbit",
    amount: 500,
    name: "Sukbit",
    program: "Abot Ko Ang Libro",
    blurb: "A school supplies kit for a learner in our partner communities.",
    includes: ["Mini Noche Buena Package", "Pencil", "Notebook", "Eraser", "Sharpener"],
    image: sukbitBags,
    imageAlt: "Síkat-Aurora Inc. tote bags ready for the Sukbit kit",
  },
  {
    id: "nature-kit",
    amount: 500,
    name: "KALI Kit",
    program: "KALI Program",
    blurb:
      "A starter kit for every KALI Program volunteer and partner — everything they carry into the field.",
    includes: ["Tote Bag", "Tumbler", "Notebook", "Ballpen", "SÍKAT ID Lace"],
    // Stand-in photo — shows storybooks, not the KALI kit
    image: booksSpread,
    imageAlt: "Storybooks and backpacks laid out for distribution at a Síkat-Aurora Inc. reading corner",
    featured: true,
  },
  {
    id: "storybooks",
    amount: 125,
    name: "Story Book",
    program: "Abot Ko Ang Libro",
    blurb: "Sponsor a storybook for the mobile library cart.",
    includes: ["1 Story Book"],
    image: booksStack,
    imageAlt: "A stack of Filipino storybooks on an Abot Ko Ang Libro shelf",
  },
];

export const getKit = (id) => KITS.find((k) => k.id === id);
