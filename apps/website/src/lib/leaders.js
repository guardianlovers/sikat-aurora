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
    name: "Rachelle Imperial",
    title: "Executive Director",
    role: "Highest official; presides over Executive Committee, executes policies & sets direction.",
  },
  {
    tier: 2,
    name: "Jefferson de Luna",
    title: "Director for Internal Affairs",
    role: "Recruitment & member relations.",
    deputy: "Cheeka Necesito",
  },
  {
    tier: 2,
    name: "Patrisha Mae Abubo",
    title: "Director for External Affairs",
    role: "Envoys to partners & aligned organizations.",
    deputy: "Erica Angara",
  },
  {
    tier: 2,
    name: "Geraldine Guerrero",
    title: "Director for Creatives",
    role: "Brand promotion & online identity.",
    deputy: "Marga Bacarro",
  },
  {
    tier: 2,
    name: "Princess Ramirez",
    title: "Director for Finance and Logistics",
    role: "Financial capacity, logistics, & procurement.",
    deputy: "Jazmin Lopez",
  },
  {
    tier: 2,
    name: "April Jay Sanggawa",
    title: "Director for Education and Training",
    role: "Educational arm & program think tank.",
    deputy: "Anica Carriaga",
  },
];

export const LEADERS = ROSTER.map((l, i) => {
  const leaderPhoto = photosBySlug[slugify(l.name)] ?? FILLER_PHOTOS[i % FILLER_PHOTOS.length] ?? null;
  const leaderInitials = l.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  let deputyObj = null;
  if (l.deputy) {
    const deputyTitle = l.title.replace("Director", "Deputy Director");
    const deputyPhoto = photosBySlug[slugify(l.deputy)] ?? FILLER_PHOTOS[(i + 10) % FILLER_PHOTOS.length] ?? null;
    const deputyInitials = l.deputy
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    deputyObj = {
      name: l.deputy,
      title: deputyTitle,
      photo: deputyPhoto,
      initials: deputyInitials,
    };
  }

  return {
    ...l,
    photo: leaderPhoto,
    initials: leaderInitials,
    deputy: deputyObj,
  };
});
