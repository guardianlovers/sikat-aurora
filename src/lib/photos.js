// Program photography, extracted from the official Síkat-Aurora brand deck.
// Grouped per program so galleries and cards always pull matching imagery.

import communityAssembly from "@/assets/photos/community-assembly.jpg";
import communityOutreach from "@/assets/photos/community-outreach.jpg";
import volunteersGroup from "@/assets/photos/volunteers-group.jpg";

import abklLibraryCart from "@/assets/photos/abkl-library-cart.jpg";
import abklReadingSession from "@/assets/photos/abkl-reading-session.jpg";
import abklBoyWithBook from "@/assets/photos/abkl-boy-with-book.jpg";
import abklStorytelling from "@/assets/photos/abkl-storytelling.jpg";

import abkpRiverCleanup from "@/assets/photos/abkp-river-cleanup.jpg";
import abkpPlanting from "@/assets/photos/abkp-planting.jpg";
import abkpKidsOutdoors from "@/assets/photos/abkp-kids-outdoors.jpg";
import abkpGroup from "@/assets/photos/abkp-group.jpg";

import hirayaWorkshop from "@/assets/photos/hiraya-workshop.jpg";
import hirayaSession from "@/assets/photos/hiraya-session.jpg";
import hirayaAssembly from "@/assets/photos/hiraya-assembly.jpg";
import hirayaStage from "@/assets/photos/hiraya-stage.jpg";

export const PHOTOS = {
  communityAssembly,
  communityOutreach,
  volunteersGroup,
  abklLibraryCart,
  abkpRiverCleanup,
  hirayaWorkshop,
};

// Each entry pairs a source with the alt text describing what is happening.
export const PROGRAM_PHOTOS = {
  abkl: [
    { src: abklLibraryCart, alt: "The Abot Ko Ang Libro mobile library cart, stocked with children's books" },
    { src: abklReadingSession, alt: "A volunteer reading with children around a table" },
    { src: abklStorytelling, alt: "A storytelling session with children seated in a circle" },
    { src: abklBoyWithBook, alt: "A boy smiling while holding a borrowed picture book" },
  ],
  abkp: [
    { src: abkpRiverCleanup, alt: "Children taking part in a river cleanup" },
    { src: abkpPlanting, alt: "A volunteer guiding children through a planting activity" },
    { src: abkpKidsOutdoors, alt: "Two children outdoors during an Ang Batang Kali session" },
    { src: abkpGroup, alt: "Ang Batang Kali participants gathered after a session" },
  ],
  hiraya: [
    { src: hirayaWorkshop, alt: "Youth leaders taking part in a Hiraya workshop" },
    { src: hirayaSession, alt: "Participants collaborating around tables during a Hiraya session" },
    { src: hirayaStage, alt: "A Hiraya leadership training on stage" },
    { src: hirayaAssembly, alt: "A full assembly hall at a Hiraya training" },
  ],
};
