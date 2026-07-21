// Program photography, extracted from official Síkat-Aurora core program assets.
// Grouped per program so galleries and cards always pull matching imagery.

const photoModules = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export const FILLER_PHOTOS = Object.values(photoModules);

import abkl1 from "@/assets/core-program/abkl-photos/1.jpg";
import abkl2 from "@/assets/core-program/abkl-photos/2.jpg";
import abkl3 from "@/assets/core-program/abkl-photos/3.jpg";
import abkl4 from "@/assets/core-program/abkl-photos/4.jpg";

import abkp1 from "@/assets/core-program/abkp-photos/1.jpg";
import abkp2 from "@/assets/core-program/abkp-photos/2.jpg";
import abkp3 from "@/assets/core-program/abkp-photos/3.jpg";
import abkp4 from "@/assets/core-program/abkp-photos/4.jpg";

import hiraya1 from "@/assets/core-program/hiraya/1.jpg";
import hiraya2 from "@/assets/core-program/hiraya/2.jpg";
import hiraya3 from "@/assets/core-program/hiraya/3.jpg";
import hiraya4 from "@/assets/core-program/hiraya/4.jpg";

export const PHOTOS = {
  communityAssembly: FILLER_PHOTOS[0] || abkl1,
  communityOutreach: FILLER_PHOTOS[1] || abkp1,
  volunteersGroup: FILLER_PHOTOS[2] || hiraya1,
  abklLibraryCart: abkl1,
  abkpRiverCleanup: abkp1,
  hirayaWorkshop: hiraya1,
  allPhotos: FILLER_PHOTOS,
};

// Each entry pairs a source with the alt text describing what is happening.
export const PROGRAM_PHOTOS = {
  abkl: [
    { src: abkl1, alt: "Abot Ko Ang Libro community reading session in Aurora" },
    { src: abkl2, alt: "Volunteers engaging youth with books and storytelling" },
    { src: abkl3, alt: "Abot Ko Ang Libro mobile library cart activity" },
    { src: abkl4, alt: "Storytelling interaction with local children" },
  ],
  abkp: [
    { src: abkp1, alt: "Ang Batang Kali youth environmental activity" },
    { src: abkp2, alt: "Youth leaders taking part in nature conservation" },
    { src: abkp3, alt: "Tree planting and environmental life skills workshop" },
    { src: abkp4, alt: "Ang Batang Kali participants gathered outdoors" },
  ],
  hiraya: [
    { src: hiraya1, alt: "Youth leaders participating in Hiraya active citizenship training" },
    { src: hiraya2, alt: "Collaborative workshop and student leader discussion" },
    { src: hiraya3, alt: "Hiraya leadership program participants in Central Aurora" },
    { src: hiraya4, alt: "Full assembly of youth leaders and mentors in Aurora" },
  ],
};
