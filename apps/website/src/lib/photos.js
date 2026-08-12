// Program photography, extracted from official Síkat-Aurora Inc. core program assets.
// Grouped per program so galleries and cards always pull matching imagery.

import whoWeAre1 from "@/assets/about/who-we-are/1.jpg";
import whoWeAre2 from "@/assets/about/who-we-are/2.jpg";
import whoWeAre3 from "@/assets/about/who-we-are/3.jpg";
import whoWeAre4 from "@/assets/about/who-we-are/4.jpg";

// ABKL gallery — files that exist on disk
import abkl1 from "@/assets/programs/core-program/abkl-photos/1 (2).jpg";
import abkl2 from "@/assets/programs/core-program/abkl-photos/2.jpg";
import abkl3 from "@/assets/programs/core-program/abkl-photos/2 (2).jpg";
import abkl4 from "@/assets/programs/core-program/abkl-photos/4.jpg";

// ABKP gallery — files that exist on disk
import abkp1 from "@/assets/programs/core-program/abkp-photos/1.jpg";
import abkp2 from "@/assets/programs/core-program/abkp-photos/2.jpg";
import abkp3 from "@/assets/programs/core-program/abkp-photos/3.jpg";
import abkp4 from "@/assets/programs/core-program/abkp-photos/2 (2).jpg";

// Hiraya gallery — files start from 3 on disk
import hiraya1 from "@/assets/programs/core-program/hiraya/3.jpg";
import hiraya2 from "@/assets/programs/core-program/hiraya/4.jpg";
import hiraya3 from "@/assets/programs/core-program/hiraya/5.jpg";
import hiraya4 from "@/assets/programs/core-program/hiraya/6.jpg";

export const PROGRAM_COVERS = {
  abkl: "@/assets/programs/core-program/abot-ko-ang-libro.jpg",
  abkp: "@/assets/programs/core-program/batang-kali.jpg",
  hiraya: "@/assets/programs/core-program/hiraya.jpg",
};

export const PHOTOS = {
  communityAssembly: whoWeAre1,
  communityOutreach: whoWeAre2,
  volunteersGroup: whoWeAre3,
  abklLibraryCart: abkl1,
  abkpRiverCleanup: abkp1,
  hirayaWorkshop: hiraya1,
  allPhotos: [whoWeAre1, whoWeAre2, whoWeAre3, whoWeAre4],
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
    { src: abkp1, alt: "KALI Program youth environmental activity" },
    { src: abkp2, alt: "Youth leaders taking part in nature conservation" },
    { src: abkp3, alt: "Tree planting and environmental life skills workshop" },
    { src: abkp4, alt: "KALI Program participants gathered outdoors" },
  ],
  hiraya: [
    { src: hiraya1, alt: "Youth leaders participating in Hiraya active citizenship training" },
    { src: hiraya2, alt: "Collaborative workshop and student leader discussion" },
    { src: hiraya3, alt: "Hiraya leadership program participants in Central Aurora" },
    { src: hiraya4, alt: "Full assembly of youth leaders and mentors in Aurora" },
  ],
};
