// Automatically load all volunteer portraits from src/assets/volunteers/
const volunteerPhotoModules = import.meta.glob("../assets/volunteers/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const VOLUNTEER_PHOTOS = Object.values(volunteerPhotoModules);

// Fallback photos from src/assets/photos/
const fillerModules = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const FILLER_PHOTOS = Object.values(fillerModules);

const ALL_PHOTOS = VOLUNTEER_PHOTOS.length > 0 ? VOLUNTEER_PHOTOS : FILLER_PHOTOS;

export function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents so Í matches i
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const VOLUNTEERS = ALL_PHOTOS.map((src, i) => ({
  id: `volunteer-${i}`,
  name: "",
  role: "Youth Volunteer",
  photo: src,
}));

// True while the roster is empty.
export const ROSTER_IS_EMPTY = VOLUNTEERS.length === 0;
