// Program photography, extracted from official Síkat-Aurora core program assets.
// Grouped per program so galleries and cards always pull matching imagery.

import photo1 from "@/assets/photos/476192720_948805204011083_778359721917367245_n.jpg";
import photo2 from "@/assets/photos/476373517_948815890676681_1881792014377160686_n.jpg";
import photo3 from "@/assets/photos/476386626_947813640776906_313459091671113883_n.jpg";
import photo4 from "@/assets/photos/476430353_948805244011079_4177729242876422903_n.jpg";
import photo5 from "@/assets/photos/476437317_948805200677750_6227520455061393484_n.jpg";
import photo6 from "@/assets/photos/476454130_948805160677754_1590369248202941038_n.jpg";
import photo7 from "@/assets/photos/476588368_947811460777124_7978533214173974988_n.jpg";
import photo8 from "@/assets/photos/477599348_948817290676541_429738576066102825_n.jpg";
import photo9 from "@/assets/photos/480679350_957948146430122_5521457845532821884_n.jpg";
import photo10 from "@/assets/photos/480693536_959973822894221_4447667342345211178_n.jpg";
import photo11 from "@/assets/photos/480702651_957951196429817_3849099082236205198_n.jpg";
import photo12 from "@/assets/photos/481002250_957947769763493_2193407345645612387_n.jpg";
import photo13 from "@/assets/photos/481061042_957933476431589_1569418553715576330_n.jpg";
import photo14 from "@/assets/photos/481168605_964247979133472_6195998833088455231_n.jpg";
import photo15 from "@/assets/photos/481222101_957951246429812_1775692832591226077_n.jpg";
import photo16 from "@/assets/photos/481247015_959976236227313_2290646370930390031_n.jpg";
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
  communityAssembly: photo1,
  communityOutreach: photo2,
  volunteersGroup,
  abklLibraryCart: abkl1,
  abkpRiverCleanup: abkp1,
  hirayaWorkshop: hiraya1,
  allPhotos: [
    photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8,
    photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16
  ],
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
