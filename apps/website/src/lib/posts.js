import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";
import logoImg from "@/assets/logo.png";

// Drop a photo into src/assets/blog/ named after the post's slug (e.g.
// "our-first-eight-months.jpg") and it is picked up automatically — no code
// change needed. Until then, posts fall back to a generic program photo.
const blogPhotoModules = import.meta.glob("../assets/blog/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const blogPhotosBySlug = Object.fromEntries(
  Object.entries(blogPhotoModules).map(([path, src]) => [
    path.split("/").pop().replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase(),
    src,
  ])
);

// SAMPLE CONTENT — placeholder articles so the blog layout can be reviewed.
// Replace the copy with real field reports before launch; the shape of each
// entry is what matters: category drives the filter, `featured` picks the lead.
export const POST_CATEGORIES = [
  "All",
  "Abot Ko Ang Libro",
  "Ang Kali Program",
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
    category: "Ang Kali Program",
    date: "2026-06-14",
    readTime: "7 min read",
    img: PROGRAM_PHOTOS.abkp[0].src,
  },
  {
    slug: "what-the-river-carries",
    title: "What the River Carries",
    excerpt:
      "Three sessions spent counting what washes downstream in San Luis — and what the kids decided to do about it.",
    category: "Ang Kali Program",
    date: "2026-05-17",
    readTime: "5 min read",
    img: PROGRAM_PHOTOS.abkp[1].src,
  },
  {
    slug: "stewards-not-visitors",
    title: "Stewards, Not Visitors: Rethinking Environmental Life Skills",
    excerpt:
      "Why we stopped running one-off cleanups and built a five-Saturday curriculum around the places kids already know.",
    category: "Ang Kali Program",
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
    title: "Where It All Began: From Bayanihan to Síkat-Aurora",
    excerpt:
      "From 20 volunteers raising ₱170,000 for typhoon relief in Dingalan, to a province-wide movement — the story of how Síkat-Aurora came to be.",
    category: "Updates",
    date: "2026-04-12",
    readTime: "5 min read",
    img: blogPhotosBySlug["becoming-sikat-aurora"] || PHOTOS.communityAssembly,
    body: [
      {
        type: "p",
        text: "Every movement begins with a simple decision: to act.",
      },
      {
        type: "p",
        text: "For Síkat-Aurora, that decision began in November 2020, when young people from across Aurora responded to a call for volunteers for Bayanihan Para sa Dingalan, a relief operation organized to support families affected by Typhoon Ulysses in Dingalan, Aurora.",
      },
      {
        type: "p",
        text: "There was no Síkat at the time. No organization. No established structure. There was simply a group of young people who saw a need and chose to do something about it.",
      },
      { type: "h2", text: "A Call to Serve" },
      {
        type: "p",
        text: "The Bayanihan Para sa Dingalan initiative mobilized 20 youth volunteers who worked together to raise ₱170,000 in donations, providing assistance to 250 families affected by the disaster.",
      },
      {
        type: "p",
        text: "More than the numbers, however, the experience revealed something powerful: young people were willing and capable of organizing themselves in service of their communities.",
      },
      {
        type: "p",
        text: "The relief operation eventually came to an end, but the spirit that brought the volunteers together did not. Months later, in June 2021, the group reconvened. What started as a one-time response to a crisis began to spark a bigger conversation: what if young people could continue working together even when there was no disaster to respond to? What if there was a space where young people could consistently volunteer, lead, and create solutions for their communities?",
      },
      {
        type: "p",
        text: "At the time, the group was still operating under another organization. But as the volunteers reflected on their experiences and envisioned what they could build together, one idea became increasingly clear: it was time to create something of their own.",
      },
      { type: "h2", text: "The Birth of Síkat" },
      {
        type: "p",
        text: "On August 12, 2021, in celebration of International Youth Day, the group formally established Síkat-Baler.",
      },
      {
        type: "p",
        text: "The name came from pagsíkat, meaning \"to rise.\" It captured the group's aspiration for young people: to rise to the challenges around them, to rise as leaders, and ultimately, to help their communities rise with them.",
      },
      {
        type: "p",
        text: "Síkat-Baler began as a platform for young people to transform their willingness to serve into meaningful action. It created opportunities for youth to volunteer, collaborate, and respond to the needs of their communities — not only during times of crisis, but also through initiatives that addressed education, the environment, active citizenship, and social inclusion. And slowly, Síkat began to grow.",
      },
      { type: "h2", text: "From Baler to Aurora" },
      {
        type: "p",
        text: "As the organization expanded its reach and its community of volunteers grew, its vision also became bigger. What began in Baler was no longer just about Baler.",
      },
      {
        type: "p",
        text: "In 2023, Síkat-Baler became Síkat-Aurora, marking a significant shift in the organization's identity and ambition. The name reflected a broader commitment to becoming a province-wide catalyst for youth volunteerism — creating spaces for young people across Aurora to participate, lead, and serve.",
      },
      {
        type: "p",
        text: "The transition was more than a change in name. It was a recognition of what Síkat had become and what it hoped to be: a home for young Aurorans who believe that they do not have to wait until they are older to make a difference. They can act now. They can lead now. They can serve now.",
      },
      { type: "h2", text: "And the Journey Continues" },
      {
        type: "p",
        text: "From a small group of volunteers responding to a disaster in Dingalan, Síkat has grown into a community of young people working together across Aurora. But at its core, the organization remains anchored on the same belief that sparked the very first volunteer call in 2020: change begins when someone chooses to act.",
      },
      {
        type: "p",
        text: "The story of Síkat-Aurora is therefore not simply the story of an organization. It is the story of young people discovering what becomes possible when they come together, care deeply about their communities, and turn that care into action.",
      },
      {
        type: "p",
        text: "From Bayanihan Para sa Dingalan to Síkat-Baler. From Síkat-Baler to Síkat-Aurora. From one act of volunteerism to a growing movement of young people choosing to serve.",
      },
      {
        type: "quote",
        text: "Ang pagsíkat ay nagsisimula sa pagkilos. And this is only the beginning.",
      },
    ],
  },
  {
    slug: "a-full-circle-moment-in-sitio-aguang",
    title: "A Full Circle Moment: What Our Volunteers Taught Me in Sitio Aguang",
    excerpt:
      "During a debrief for our 4th of 5 Saturdays of Abot Ko Ang Libro, RJ reflects on why volunteers travel 20–30 minutes and pay their own fare just to show up — and runs into a former student who's now one of them.",
    category: "Updates",
    date: "2023-11-04",
    readTime: "6 min read",
    img: blogPhotosBySlug["a-full-circle-moment-in-sitio-aguang"] || PHOTOS.communityOutreach,
    body: [
      {
        type: "p",
        text: "Minsan talaga, kapag nagiging bahagi na ng pang-araw-araw na buhay ang mga gawain, nakakalimutan natin bigyang halaga 'yung impact ng mga ginagawa natin. But today, I choose to remember.",
      },
      {
        type: "p",
        text: "During our debrief session for our 4th of 5th Saturday of Abot Ko Ang Libro in Sitio Aguang, I was reminded of the ripples of impact we have created in Síkat-Aurora. Dahil maraming bagong mukha, I asked our volunteers to introduce themselves by stating their name, where they live, and kailan sila \"sumikat\" (o nag join ng Síkat).",
      },
      { type: "h2", text: "Twenty to Thirty Minutes, Just to Volunteer" },
      {
        type: "p",
        text: "I was surprised to know that majority of them came all the way from San Luis and Maria Aurora — a 20–30-minute travel from Baler. Hindi kami aktibong nagre-recruit sa Síkat pero karamihan sa kanila ay kusang sumali ng Síkat dahil nakikita nila sa Facebook, through their friends of friends' post, 'yung mga ginagawa namin sa organisasyon.",
      },
      {
        type: "image",
        src: blogPhotosBySlug["a-full-circle-moment-in-sitio-aguang-2"],
        alt: "Síkat-Aurora volunteers during the Sitio Aguang debrief session",
      },
      {
        type: "p",
        text: "Nanlumo rin ako kasi aside sa gumising sila nang maaga on a Saturday, namasahe pa sila ng Php 100–150 para lang mag volunteer sa Síkat.",
      },
      {
        type: "p",
        text: "Karamihan din sa mga kasama namin ngayon na volunteers ay mga tumakbong SK na hindi pinalad sa kakatapos lang ng eleksyon. Matagal na rin namin silang kasama sa Síkat pero muling nagbabalik loob kasi parang naging breather o pahingahan daw nila ang Síkat ngayon matapos ang madugong kampanya.",
      },
      {
        type: "quote",
        text: "Nakaka-inspire dahil sa kabila ng kanilang pagkabigo, andun pa rin yung kagustuhan na maglingkod — may posisyon man o wala.",
      },
      { type: "h2", text: "Isang Full Circle Moment" },
      {
        type: "p",
        text: "Ngayong araw din, nagkita ulit kami ni Zhiantino. Nakilala namin siya noong 13 years old pa siya dahil naging estudyante namin siya sa Abot Ko Ang Libro sa Brgy. 5, way back in 2021 na kasagsagan pa ng pandemya. Ngayon, 15 years old na siya, binata na, at kasama na rin namin siya na nagboboluntaryo. What a full circle moment.",
      },
      {
        type: "image",
        src: blogPhotosBySlug["a-full-circle-moment-in-sitio-aguang-3"],
        alt: "Síkat-Aurora volunteers gathered in Sitio Aguang",
      },
      {
        type: "p",
        text: "Punong puno ang puso ko ngayong araw dahil sa pinagsamang lakas ng mga kabataan. Hindi ko lubos akalain na ito na 'yung samahan na nabuo ng Síkat sa dalawang taong pagkakatatag. It is now a home to more than 150 Aurora's finest youth leaders na patuloy na maglilingkod nang walang inaasahang kapalit.",
      },
      {
        type: "p",
        text: "Síkat-Aurora, ang layo na nang narating natin pero malayo layo pa rin ang ating lakbayin. Kaya tuloy lang sa pagsíkat.",
      },
    ],
  },
  {
    slug: "our-first-eight-months",
    title: "Field Notes — Our First Eight Months of Abot Ko Ang Libro",
    excerpt:
      "From a pioneer cycle in Brgy. Ilaya to almost 500 learners reached in eight months — RJ looks back at every first that shaped ABKL into what it is today.",
    category: "Abot Ko Ang Libro",
    date: "2022-03-10",
    readTime: "7 min read",
    img: blogPhotosBySlug["our-first-eight-months"] || PROGRAM_PHOTOS.abkl[0].src,
    body: [
      {
        type: "p",
        text: "I've always dreamt of establishing a youth organization in my home province — an organization of, for, and by the youth of Aurora. So when Síkat-Baler was founded in August 2021, I was on cloud nine because I got the opportunity to meet a lot of youth in the province who have the heart for service. And I get to see their potential, mentor them, and pass on my passion for volunteerism to them.",
      },
      {
        type: "p",
        text: "And when I look back, I couldn't imagine we would have come this far. Never in my wildest dreams did I think that SÍKAT BALER would grow into 70 strong active members with over 30 pending applications. Never did I imagine that we would have concluded our 4th cycle of Abot Ko Ang Libro (ABKL) last February 26 in Brgy. Reserva. Never did I think we would reach almost 500 learners in a span of 8 months amid the pandemic.",
      },
      { type: "h2", text: "Every Cycle, Another First" },
      {
        type: "p",
        text: "And cycle in cycle out for our primary project ABKL, we experienced so many firsts. And every time a new cycle would start, we made sure to build on our previous ones.",
      },
      {
        type: "p",
        text: "The cycle in Ilaya was the pioneer cycle, so it gave us all our firsts. It was our first time to try out the five-Saturday ABKL in a community setting, to have parents sign a photo/video release form, and to introduce a classroom routine (opening and closing prayer and songs, sing & dance, rules, attention-getters), among others. For some of our volunteers, it was also their first time to tell a story to kids.",
      },
      {
        type: "image",
        src: blogPhotosBySlug["our-first-eight-months-2"],
        alt: "Abot Ko Ang Libro storytelling session during an early ABKL cycle",
      },
      {
        type: "p",
        text: "For our cycle in Calabuanan, it was the start of SÍKAT members stepping up and leading the ABKL implementation. We called them co-leads, who would coordinate with our SK partners, prepare the materials and taskings, and mobilize their fellow volunteers every Saturday. It was also the first time that we introduced the ABKL kit — a kit that contained basic school supplies and a storybook, and that served as a token for our co-learners for completing the 5-Saturday ABKL.",
      },
      {
        type: "image",
        src: blogPhotosBySlug["our-first-eight-months-3"],
        alt: "ABKL co-leads mobilizing volunteers during a Saturday cycle",
      },
      {
        type: "p",
        text: "Moreover, our Brgy. 5 cycle gave us the first of creating our own storybook lesson plans to have more structured storytelling sessions. The lesson plans gave our volunteers more confidence to tell a story as they had a guide to follow. It allowed our co-learners to understand even better the books that we read to them.",
      },
      {
        type: "p",
        text: "For our cycle in Reserva, we had our first student with special needs, in the name of Danreb. And we're glad to have a SPED major in the house to guide us in dealing with him.",
      },
      { type: "h2", text: "From a Reading Corner to a Full Classroom Experience" },
      {
        type: "p",
        text: "And when we launched Abot Ko Ang Libro last year, our vision for the project was clear: it was only to provide easy access to books and inculcate a love of reading among kids in the middle of a pandemic. But cycle in cycle out, we saw the project evolve right before our eyes.",
      },
      {
        type: "p",
        text: "From what was once a reading corner, ABKL became a full alternative classroom learning experience during a time our co-learners yearned for one. It did not just introduce our co-learners to the magical world of reading — it actually went above and beyond by providing well-rounded development for each of them. They acquired knowledge from the storybooks in our mini-library cart and from our storytelling sessions. They got exposed to their same-aged compatriots, allowing them to practice empathy, participation, and friendship. They also got to channel their energy into more sociable avenues through our opening and closing songs, breakout sessions, and play time during breaks.",
      },
      {
        type: "image",
        src: blogPhotosBySlug["our-first-eight-months-4"],
        alt: "Kids joining an Abot Ko Ang Libro reading session",
      },
      {
        type: "p",
        text: "And as schools gradually reopened their doors, we were excited for our co-learners to return to their classrooms, or set foot for the first time in a classroom. We looked forward to them honing their skills, developing their identities, and widening their horizons. We hoped to see them flourish and succeed in school.",
      },
      {
        type: "quote",
        text: "\"Naku sir. Sila na nga po ang gumigising sa amin tuwing Sabado kasi excited mag-ABKL.\" — a parent, on their child waking the household up every ABKL Saturday",
      },
      {
        type: "quote",
        text: "\"Si Nicolas sir, binibilang ang araw bago mag-Sabado kasi excited na bumalik kayo at mag-ABKL.\"",
      },
      {
        type: "p",
        text: "But on the other hand, we, in SÍKAT BALER, would surely miss singing the 'O Kay Sarap Magbasa' and 'Paalam Na' songs with them. We would miss waking up early on a Saturday to meet and tell a story to them. Indeed, it was a good 8-month run of Abot Ko Ang Libro. But know that this is not goodbye. This is just see you later.",
      },
      {
        type: "p",
        text: "SÍKAT-BALER, whose name is a tribute to the rise (pagsíkat) of a new face of youth volunteerism in a place where the sun rises, will always come up with new initiatives geared towards brighter, better, and bolder communities.",
      },
    ],
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
