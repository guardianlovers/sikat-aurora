# Volunteer photos

Drop volunteer photos in this folder and they appear on the Leadership page
automatically — no code change needed beyond naming.

1. Save the image here as the volunteer's name in lowercase with dashes:
   `juan-dela-cruz.jpg` (`.jpg`, `.jpeg`, `.png`, and `.webp` all work).
2. Add a matching entry to `src/lib/volunteers.js`:
   `{ name: "Juan Dela Cruz", role: "Abot Ko Ang Libro" }`

The photo is matched to the entry by that slug. If no photo exists yet, the
card falls back to the volunteer's initials, so the grid never looks broken.

Square images around 600×600 look best; they are cropped to a square.
