import { slugify } from "@/lib/volunteers";
import { FILLER_PHOTOS } from "@/lib/photos";

// Portraits are matched by filename slug — drop "rj-belen.jpg" into
// src/assets/leaders/ and it is picked up here. See the README in that folder.
const photoModules = import.meta.glob("../assets/leaders/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const photosBySlug = Object.fromEntries(
  Object.entries(photoModules).map(([path, src]) => [
    path.split("/").pop().replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase(),
    src,
  ])
);

const ROSTER = [
  {
    name: "RJ Belen",
    title: "Executive Director",
    role: "Highest official; presides over Executive Committee, executes policies & sets direction.",
  },
  {
    name: "Angelica Matusalem",
    title: "Deputy Executive Director & Director of Finance",
    role: "Oversees operations, financial capacity, & procurement.",
  },
  {
    name: "Rachelle Ann Imperial",
    title: "Director of Internal Affairs",
    role: "Recruitment & member relations. Deputy: Princess Joy Necesito.",
  },
  {
    name: "Patrisha Mae Abubo",
    title: "Director of External Affairs",
    role: "Envoys to partners & aligned organizations. Deputy: Jomari Guttierrez.",
  },
  {
    name: "Reaiah Codiapit",
    title: "Director of Education & Training",
    role: "Educational arm & program think tank. Deputy: Jefferson Lising.",
  },
  {
    name: "Cattleya Abuan",
    title: "Director of Creatives",
    role: "Brand promotion & online identity. Deputy: John Renuel de Padua.",
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
