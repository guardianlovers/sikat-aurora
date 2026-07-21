// Program photography, extracted from the official Síkat-Aurora core program assets.
// Grouped per program so galleries and cards always pull matching imagery.

import communityAssembly from "@/assets/photos/community-assembly.jpg";
import communityOutreach from "@/assets/photos/community-outreach.jpg";
import volunteersGroup from "@/assets/photos/volunteers-group.jpg";

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
  communityAssembly,
  communityOutreach,
  volunteersGroup,
  abklLibraryCart: abkl1,
  abkpRiverCleanup: abkp1,
  hirayaWorkshop: hiraya1,
};

// Each entry pairs a source with the alt text describing what is happening.
export const PROGRAM_PHOTOS = {
  abkl: [
    { src: abkl1, alt: "The Abot Ko Ang Libro mobile library cart, stocked with children's books" },
    { src: abkl2, alt: "A volunteer reading with children around a table" },
    { src: abkl3, alt: "A storytelling session with children seated in a circle" },
    { src: abkl4, alt: "A boy smiling while holding a borrowed picture book" },
  ],
  abkp: [
    { src: abkp1, alt: "Children taking part in a river cleanup" },
    { src: abkp2, alt: "A volunteer guiding children through a planting activity" },
    { src: abkp3, alt: "Two children outdoors during an Ang Batang Kali session" },
    { src: abkp4, alt: "Ang Batang Kali participants gathered after a session" },
  ],
  hiraya: [
    { src: hiraya1, alt: "Youth leaders taking part in a Hiraya workshop" },
    { src: hiraya2, alt: "Participants collaborating around tables during a Hiraya session" },
    { src: hiraya3, alt: "A Hiraya leadership training on stage" },
    { src: hiraya4, alt: "A full assembly hall at a Hiraya training" },
  ],
};
