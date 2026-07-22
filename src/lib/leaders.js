import { slugify } from "@/lib/volunteers";

// Fallback photos for leaders who have not yet submitted a portrait
const fillerModules = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const FILLER_PHOTOS = Object.values(fillerModules);

// Portraits are matched by filename slug — drop "rj-belen.jpg" or "rj.jpg" into
// src/assets/leadership/ and it is picked up here. See the README in that folder.
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

// `tier` drives the org chart: 0 is the Executive Director, 1 the Deputy
// Executive Director, 2 the directorate reporting under them. `deputy` used to
// be spelled out at the end of each `role` sentence — it is its own field now so
// the chart can render the pairing rather than bury it in prose.
const ROSTER = [
  {
    tier: 0,
    name: "RJ Belen",
    title: "Executive Director",
    role: "Highest official; presides over Executive Committee, executes policies & sets direction.",
  },
  {
    tier: 1,
    name: "Angelica Matusalem",
    title: "Deputy Executive Director & Director of Finance",
    role: "Oversees operations, financial capacity, & procurement.",
  },
  {
    tier: 2,
    name: "Rachelle Ann Imperial",
    title: "Director of Internal Affairs",
    role: "Recruitment & member relations.",
    deputy: "Princess Joy Necesito",
  },
  {
    tier: 2,
    name: "Patrisha Mae Abubo",
    title: "Director of External Affairs",
    role: "Envoys to partners & aligned organizations.",
    deputy: "Jomari Guttierrez",
  },
  {
    tier: 2,
    name: "Reaiah Codiapit",
    title: "Director of Education & Training",
    role: "Educational arm & program think tank.",
    deputy: "Jefferson Lising",
  },
  {
    tier: 2,
    name: "Cattleya Abuan",
    title: "Director of Creatives",
    role: "Brand promotion & online identity.",
    deputy: "John Renuel de Padua",
  },
];

export const LEADERS = ROSTER.map((l, i) => ({
  ...l,
  photo: photosBySlug[slugify(l.name)] ?? FILLER_PHOTOS[i % FILLER_PHOTOS.length] ?? null,
  initials: l.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase(),
}));
