import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";

// SAMPLE CONTENT — placeholder articles so the blog layout can be reviewed.
// Replace the copy with real field reports before launch; the shape of each
// entry is what matters: category drives the filter, `featured` picks the lead.
export const POST_CATEGORIES = [
  "All",
  "Abot Ko Ang Libro",
  "Ang Batang Kali",
  "Hiraya",
  "Updates",
];

export const POSTS = [
  {
    slug: "five-saturdays-in-zabali",
    title: "Field Notes — Five Saturdays in Brgy. Zabali",
    excerpt:
      "What happens when a library on wheels meets fifty kids who have never borrowed a book before. Notes from the first full run of the cart in Zabali.",
    category: "Abot Ko Ang Libro",
    date: "2026-07-04",
    readTime: "6 min read",
    img: PROGRAM_PHOTOS.abkl[1].src,
    featured: true,
  },
  {
    slug: "the-cart-that-started-it",
    title: "The Cart That Started It All",
    excerpt:
      "How a repurposed pushcart, two crates of donated storybooks, and a handful of volunteers became our longest-running program.",
    category: "Abot Ko Ang Libro",
    date: "2026-06-21",
    readTime: "4 min read",
    img: PROGRAM_PHOTOS.abkl[0].src,
  },
  {
    slug: "storytelling-that-sticks",
    title: "Storytelling That Sticks: What We Learned in Year Five",
    excerpt:
      "Reading aloud is the easy part. Keeping a room of two- to fourteen-year-olds with you until the last page is the craft.",
    category: "Abot Ko Ang Libro",
    date: "2026-05-30",
    readTime: "5 min read",
    img: PROGRAM_PHOTOS.abkl[2].src,
  },
  {
    slug: "dibut-to-cozo",
    title: "From Dibut to Cozo: Batang Kali by the Water",
    excerpt:
      "How a river cleanup turned into a lifelong promise between a group of kids and their coastline.",
    category: "Ang Batang Kali",
    date: "2026-06-14",
    readTime: "7 min read",
    img: PROGRAM_PHOTOS.abkp[0].src,
  },
  {
    slug: "what-the-river-carries",
    title: "What the River Carries",
    excerpt:
      "Three sessions spent counting what washes downstream in San Luis — and what the kids decided to do about it.",
    category: "Ang Batang Kali",
    date: "2026-05-17",
    readTime: "5 min read",
    img: PROGRAM_PHOTOS.abkp[1].src,
  },
  {
    slug: "stewards-not-visitors",
    title: "Stewards, Not Visitors: Rethinking Environmental Life Skills",
    excerpt:
      "Why we stopped running one-off cleanups and built a five-Saturday curriculum around the places kids already know.",
    category: "Ang Batang Kali",
    date: "2026-04-26",
    readTime: "6 min read",
    img: PROGRAM_PHOTOS.abkp[3].src,
  },
  {
    slug: "hiraya-2026-thirty-schools",
    title: "Hiraya 2026: Thirty Schools, One Generation of Leaders",
    excerpt:
      "Inside the leadership training that hands young people both the microphone and the funding to use it.",
    category: "Hiraya",
    date: "2026-07-11",
    readTime: "8 min read",
    img: PROGRAM_PHOTOS.hiraya[0].src,
  },
  {
    slug: "seed-grants-one-year-on",
    title: "Seed Grants, One Year On",
    excerpt:
      "We followed up on every project funded in the last Hiraya cohort. Here is what the money actually became.",
    category: "Hiraya",
    date: "2026-06-02",
    readTime: "9 min read",
    img: PROGRAM_PHOTOS.hiraya[1].src,
  },
  {
    slug: "how-we-publish-our-finances",
    title: "How We Publish Every Peso",
    excerpt:
      "A walkthrough of our public financial tracker — what we record, how often, and why transparency is a program decision rather than an admin one.",
    category: "Updates",
    date: "2026-05-09",
    readTime: "4 min read",
    img: PHOTOS.communityOutreach,
  },
  {
    slug: "becoming-sikat-aurora",
    title: "From Síkat-Baler to Síkat-Aurora",
    excerpt:
      "On outgrowing a single town, registering as a nonprofit, and what changes when your name has to carry a whole province.",
    category: "Updates",
    date: "2026-04-12",
    readTime: "5 min read",
    img: PHOTOS.communityAssembly,
  },
];

export function formatPostDate(iso) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
