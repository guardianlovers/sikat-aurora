// Past leadership roster for the Team page — the former Executive Committees
// (executives, directors, and deputies) who served in earlier terms.
//
// TO ADD / EDIT A TERM:
//   1. Add a `{ term, members }` entry. `term` is the committee's year range
//      (e.g. "2024–2025"); it labels the collapsible and must be unique.
//   2. Each member is `{ name, role }` — the position they held that term.
//
// Terms render newest-first, with the most recent one open by default.

export const FORMER_COHORTS = [
  {
    term: "2025–2026",
    members: [
      { name: "RJ Belen", role: "Executive Director" },
      { name: "Angelica Matusalem", role: "Deputy Executive Director & Director of Finance" },
      { name: "Rachelle Ann Imperial", role: "Director of Internal Affairs" },
      { name: "Patrisha Mae Abubo", role: "Director of External Affairs" },
      { name: "Reaiah Codiapit", role: "Director of Education & Training" },
      { name: "Cattleya Abuan", role: "Director of Creatives" },
      { name: "Princess Joy Necesito", role: "Deputy Director of Internal Affairs" },
      { name: "Jomari Guttierrez", role: "Deputy Director of External Affairs" },
      { name: "Jefferson Lising", role: "Deputy Director of Education & Training" },
      { name: "John Renuel de Padua", role: "Deputy Director of Creatives" },
    ],
  },
  {
    term: "2024–2025",
    members: [
      { name: "Angelica Matusalem", role: "Acting Executive Director" },
      { name: "Yron Leo Sotero", role: "Director for Education and Training" },
      { name: "Jay Mark Carbonel", role: "Director for Finance and Logistics" },
      { name: "Rachelle Imperial", role: "Director for Internal Affairs" },
      { name: "Danielle Villar", role: "Director for Creatives" },
      { name: "Ryan Caliwag", role: "Director for External Affairs" },
      { name: "Reaiah Codiapit", role: "Deputy Director for Education and Training" },
      { name: "Jessa Morada", role: "Deputy Director for Finance and Logistics" },
      { name: "Marianne Orande", role: "Deputy Director for Internal Affairs" },
      { name: "Ron Allen Angara", role: "Deputy Director for Creatives" },
      { name: "John Robert Naveros", role: "Deputy Director for External Affairs" },
    ],
  },
  {
    term: "2023–2024",
    members: [
      { name: "RJ Belen", role: "Executive Director" },
      { name: "Ladyjoy Cruz", role: "Director for Education and Training" },
      { name: "Jay Mark Carbonel", role: "Director for Finance and Logistics" },
      { name: "Aika Matusalem", role: "Director for Internal Affairs" },
      { name: "Erika Ida", role: "Director for Creatives" },
      { name: "Ryan Caliwag", role: "Director for External Affairs" },
      { name: "Yron Leo Sotero", role: "Deputy Director for Education and Training" },
      { name: "Jessa Morada", role: "Deputy Director for Finance and Logistics" },
      { name: "Marianne Orande", role: "Deputy Director for Internal Affairs" },
      { name: "Danielle Villar", role: "Deputy Director for Creatives" },
      { name: "Robert Naveros", role: "Deputy Director for External Affairs" },
    ],
  },
  {
    term: "2022–2023",
    members: [
      { name: "Lorem Ipsum", role: "Executive Director" },
      { name: "Rachelle Imperial", role: "Director for Internal Affairs" },
      { name: "Maridel Notorio", role: "Deputy Director for Internal Affairs" },
      { name: "Lorem Ipsum", role: "Director for External Affairs" },
      { name: "Lorem Ipsum", role: "Deputy Director for External Affairs" },
      { name: "Ryan Valenzuela", role: "Director for Finance and Logistics" },
      { name: "Aira Sollegue", role: "Deputy Director for Finance and Logistics" },
      { name: "Justin Leones", role: "Director for Education and Training" },
      { name: "Lorem Ipsum", role: "Deputy Director for Education and Training" },
      { name: "Lorem Ipsum", role: "Director for Creatives" },
      { name: "Lorem Ipsum", role: "Deputy Director for Creatives" },
    ],
  },
  {
    term: "2021–2022",
    members: [
      { name: "RJ Belen", role: "Executive Director" },
      { name: "Rachelle Ann Imperial", role: "Director for Internal Affairs" },
      { name: "Tin Guerrero", role: "Deputy Director for Internal Affairs" },
      { name: "Lorem Ipsum", role: "Director for External Affairs" },
      { name: "Ela Ferreras", role: "Deputy Director for External Affairs" },
      { name: "Julie Pecson", role: "Director for Finance and Logistics" },
      { name: "April Albay", role: "Deputy Director for Finance and Logistics" },
      { name: "Reaiah Codiapit", role: "Director for Education and Research" },
      { name: "Pierre Moncal", role: "Deputy Director for Education and Training" },
      { name: "Ghen Guerrero", role: "Director for Creatives" },
      { name: "Tala Peña", role: "Deputy Director for Creatives" },
    ],
  },
];

import { slugify } from "@/lib/volunteers";

// Automatically match photos in src/assets/leadership/ by filename slug
const photoModules = import.meta.glob("../assets/leadership/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const photosBySlug = Object.fromEntries(
  Object.entries(photoModules).map(([path, src]) => {
    let slug = path.split("/").pop().replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase();
    if (slug === "rj") slug = "rj-belen";
    return [slug, src];
  })
);

// Founders — rendered as a final section beneath the term list.
// TO ADD OR UPDATE A PHOTO & BIO:
//   1. Drop a portrait into src/assets/leadership/ named after the slug
//      (e.g., "reaiah-codiapit.jpg" or "crystal-lei-pena.jpg").
//   OR
//   2. Pass a photo URL/import directly in the `photo` field for that entry.
//   3. (Optional) Add a `bio` summary text to display on hover over the card.
const RAW_FOUNDERS = [
  {
    name: "RJ Belen",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder and Executive Director of Síkat-Aurora Inc.; youth leader driving community development and educational initiatives in Aurora Province.",
  },
  {
    name: "Rachelle Ann Imperial",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; director for internal affairs guiding organizational growth and volunteer development.",
  },
  {
    name: "Reaiah Codiapit",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; education and training director championing literacy and youth leadership programs.",
  },
  {
    name: "Crystal Lei Pena",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; passionate advocate for community outreach and youth empowerment across Aurora.",
  },
  {
    name: "Geraldine Guerrero",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; creative and communications leader dedicated to amplifying community stories.",
  },
  {
    name: "Julie May Pecson",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; finance and logistics director supporting sustainable program operations.",
  },
  {
    name: "Ryan Angelo Caliwag",
    role: "Co-Founder",
    photo: "",
    bio: "Co-founder of Síkat-Aurora Inc.; external affairs director building strategic partnerships and community coalitions.",
  },
];

// Fallback photos for co-founders who have not yet submitted a portrait
const fillerModules = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const FILLER_PHOTOS = Object.values(fillerModules);

export const FOUNDERS = RAW_FOUNDERS.map((founder, i) => {
  const slug = slugify(founder.name);
  const photo =
    founder.photo ||
    photosBySlug[slug] ||
    FILLER_PHOTOS[(i * 3 + 2) % FILLER_PHOTOS.length] ||
    null;
  const initials = founder.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return {
    ...founder,
    photo,
    initials,
  };
});
