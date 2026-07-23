import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";
import logoImg from "@/assets/logo.png";

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

// PLACEHOLDER ARTICLE BODY. Every post shares this until real copy is written,
// so the article page has something to lay out. It is lorem ipsum rather than
// plausible English on purpose — invented field reports about real communities
// would read as genuine once published. Give a post its own copy by adding a
// `body` array of blocks to its entry above; anything without one falls back
// to this.
const PLACEHOLDER_BODY = [
  {
    type: "p",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "p",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  { type: "h2", text: "Sed ut perspiciatis unde omnis" },
  {
    type: "p",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    type: "quote",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    type: "p",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  },
  { type: "h2", text: "Temporibus autem quibusdam" },
  {
    type: "p",
    text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
  },
  {
    type: "p",
    text: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
];

// Byline. Posts default to the organisation rather than a named person: these
// are sample articles, and putting a real volunteer's name on writing they did
// not do would misattribute it. Give a post a real writer by adding
// `author: { name, role, avatar }` to its entry above.
const DEFAULT_AUTHOR = {
  name: "Síkat-Aurora Inc.",
  role: "Editorial Team",
  avatar: logoImg,
};

export const getPostAuthor = (post) => post?.author ?? DEFAULT_AUTHOR;

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);

export const getPostBody = (post) => post?.body ?? PLACEHOLDER_BODY;

// Same category first, then most recent, excluding the post being read.
export function getRelatedPosts(post, limit = 3) {
  if (!post) return [];
  return POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const sameCat = (p) => (p.category === post.category ? 0 : 1);
      return sameCat(a) - sameCat(b) || b.date.localeCompare(a.date);
    })
    .slice(0, limit);
}

export function formatPostDate(iso) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
