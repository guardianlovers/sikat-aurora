import { FILLER_PHOTOS } from "@/lib/photos";

// Volunteer roster for the Leadership page.
//
// TO ADD A VOLUNTEER:
//   1. Add an entry below: { name: "Juan Dela Cruz", role: "Abot Ko Ang Libro" }
//   2. (Optional) Drop a photo in src/assets/volunteers/ named after the
//      volunteer's slug — "juan-dela-cruz.jpg". It is picked up automatically.
//
// Entries without a photo fall back to their initials, so the grid stays tidy
// while photos are still being collected. `role` is optional.

// Every image in src/assets/volunteers/, keyed by its slug.
const photoModules = import.meta.glob("../assets/volunteers/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const photosBySlug = Object.fromEntries(
  Object.entries(photoModules).map(([path, src]) => [
    path.split("/").pop().replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase(),
    src,
  ])
);

export function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents so Í matches i
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------------------------------------------------------------------------
// Roster — replace these placeholders as photos and names are confirmed.
// ---------------------------------------------------------------------------
const ROSTER = [
  // { name: "Juan Dela Cruz", role: "Abot Ko Ang Libro" },  <- example
  { name: "Youth Volunteer", role: "Abot Ko Ang Libro" },
  { name: "Community Facilitator", role: "Ang Batang Kali" },
  { name: "Youth Ambassador", role: "Hiraya" },
  { name: "Field Volunteer", role: "Abot Ko Ang Libro" },
  { name: "Eco Mentor", role: "Ang Batang Kali" },
  { name: "Active Citizen", role: "Hiraya" },
  { name: "Storyteller", role: "Abot Ko Ang Libro" },
  { name: "Youth Organizer", role: "Ang Batang Kali" },
  { name: "Project Coordinator", role: "Hiraya" },
  { name: "Reading Mentor", role: "Abot Ko Ang Libro" },
  { name: "River Steward", role: "Ang Batang Kali" },
  { name: "Student Leader", role: "Hiraya" },
];

export const VOLUNTEERS = ROSTER.map((v, i) => {
  const slug = v.name ? slugify(v.name) : null;
  return {
    id: slug || `placeholder-${i}`,
    name: v.name || "",
    role: v.role || "",
    photo: v.photo ?? (slug ? photosBySlug[slug] : undefined) ?? FILLER_PHOTOS[(i + 6) % FILLER_PHOTOS.length] ?? null,
  };
});

// True while the roster is still entirely placeholders.
export const ROSTER_IS_EMPTY = VOLUNTEERS.every((v) => !v.name && !v.photo);
