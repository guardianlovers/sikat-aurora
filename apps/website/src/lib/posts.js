import { PHOTOS } from "@/lib/photos";
import logoImg from "@/assets/logo.png";

// Source material lives at src/assets/blog/<Writer Name>/<post number>/ —
// drop text.txt and photos in a numbered folder under the writer's name and
// the photos are picked up automatically here (by folder, sorted by
// filename). The post entry below still has to be written by hand — this
// only wires up the images.
const blogPhotoModules = import.meta.glob("../assets/blog/*/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function getFolderPhotos(writer, postNumber) {
  const needle = `/${writer}/${postNumber}/`;
  return Object.entries(blogPhotoModules)
    .filter(([path]) => path.includes(needle))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);
}

export const POST_CATEGORIES = [
  "All",
  "Abot Ko Ang Libro",
  "Ang Kali Program",
  "Hiraya",
  "Updates",
];

export const POSTS = [
  {
    slug: "becoming-sikat-aurora",
    title: "Where It All Began: From Bayanihan to Síkat-Aurora",
    excerpt:
      "From 20 volunteers raising ₱170,000 for typhoon relief in Dingalan, to a province-wide movement — the story of how Síkat-Aurora came to be.",
    category: "Updates",
    date: "2026-04-12",
    readTime: "5 min read",
    img: PHOTOS.communityAssembly,
    featured: true,
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
        text: "There was no Síkat at the time. No organization. No established structure.",
      },
      {
        type: "p",
        text: "There was simply a group of young people who saw a need and chose to do something about it.",
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
        text: "The relief operation eventually came to an end, but the spirit that brought the volunteers together did not.",
      },
      {
        type: "p",
        text: "Months later, in June 2021, the group reconvened.",
      },
      {
        type: "p",
        text: "What started as a one-time response to a crisis began to spark a bigger conversation: What if young people could continue working together even when there was no disaster to respond to?",
      },
      {
        type: "p",
        text: "What if there was a space where young people could consistently volunteer, lead, and create solutions for their communities?",
      },
      {
        type: "p",
        text: "At the time, the group was still operating under another organization. But as the volunteers reflected on their experiences and envisioned what they could build together, one idea became increasingly clear:",
      },
      {
        type: "p",
        text: "It was time to create something of their own.",
      },
      { type: "h2", text: "The Birth of Síkat" },
      {
        type: "p",
        text: "On August 12, 2021, in celebration of International Youth Day, the group formally established Síkat-Baler.",
      },
      {
        type: "p",
        text: "The name came from pagsíkat, meaning “to rise.”",
      },
      {
        type: "p",
        text: "It captured the group's aspiration for young people: to rise to the challenges around them, to rise as leaders, and ultimately, to help their communities rise with them.",
      },
      {
        type: "p",
        text: "Síkat-Baler began as a platform for young people to transform their willingness to serve into meaningful action. It created opportunities for youth to volunteer, collaborate, and respond to the needs of their communities—not only during times of crisis, but also through initiatives that addressed education, the environment, active citizenship, and social inclusion.",
      },
      {
        type: "p",
        text: "And slowly, Síkat began to grow.",
      },
      { type: "h2", text: "From Baler to Aurora" },
      {
        type: "p",
        text: "As the organization expanded its reach and its community of volunteers grew, its vision also became bigger.",
      },
      {
        type: "p",
        text: "What began in Baler was no longer just about Baler.",
      },
      {
        type: "p",
        text: "In 2023, Síkat-Baler became Síkat-Aurora, marking a significant shift in the organization's identity and ambition. The name reflected a broader commitment to becoming a province-wide catalyst for youth volunteerism—creating spaces for young people across Aurora to participate, lead, and serve.",
      },
      {
        type: "p",
        text: "The transition was more than a change in name.",
      },
      {
        type: "p",
        text: "It was a recognition of what Síkat had become and what it hoped to be: a home for young Aurorans who believe that they do not have to wait until they are older to make a difference.",
      },
      { type: "p", text: "They can act now." },
      { type: "p", text: "They can lead now." },
      { type: "p", text: "They can serve now." },
      { type: "h2", text: "And the Journey Continues" },
      {
        type: "p",
        text: "From a small group of volunteers responding to a disaster in Dingalan, Síkat has grown into a community of young people working together across Aurora.",
      },
      {
        type: "p",
        text: "But at its core, the organization remains anchored on the same belief that sparked the very first volunteer call in 2020: Change begins when someone chooses to act.",
      },
      {
        type: "p",
        text: "The story of Síkat-Aurora is therefore not simply the story of an organization. It is the story of young people discovering what becomes possible when they come together, care deeply about their communities, and turn that care into action.",
      },
      { type: "p", text: "From Bayanihan Para sa Dingalan to Síkat-Baler." },
      { type: "p", text: "From Síkat-Baler to Síkat-Aurora." },
      {
        type: "p",
        text: "From one act of volunteerism to a growing movement of young people choosing to serve.",
      },
      { type: "p", text: "Because ang pagsíkat ay nagsisimula sa pagkilos." },
      { type: "p", text: "And this is only the beginning." },
    ],
  },
  {
    slug: "our-first-eight-months",
    title: "Our First Eight Months of Abot Ko Ang Libro",
    excerpt:
      "From a pioneer cycle in Brgy. Ilaya to almost 500 learners reached in eight months — RJ looks back at every first that shaped ABKL into what it is today.",
    category: "Abot Ko Ang Libro",
    date: "2022-03-10",
    readTime: "7 min read",
    img: getFolderPhotos("RJ Belen", "1")[0] || PHOTOS.communityAssembly,
    author: { name: "RJ Belen", role: "Co-Founder", avatar: logoImg },
    body: [
      {
        type: "p",
        text: "I’ve always dreamt of establishing a youth organization in my home province – an organization of, for, and by the youth of Aurora. So when Síkat-Baler was founded in August 2021, I was on cloud nine because I got the opportunity to meet a lot of youth in the province who have the heart for service. And I get to see their potential, mentor them, and pass on my passion for volunteerism to them.",
      },
      {
        type: "p",
        text: "And when I look back, I couldn’t imagine we would have come this far. Never in my wildest dreams did I think that SIKAT BALER would grow into 70 strong active members with over 30 pending applications. Never did I imagine that we would have concluded our 4th cycle of Abot Ko Ang Libro (ABKL) last February 26 in Brgy. Reserva. Never did I think we would reach almost 500 learners in a span of 8 months amid the pandemic.",
      },
      {
        type: "p",
        text: "And cycle in cycle out for our primary project ABKL, we experienced so many firsts. And every time a new cycle would start, we made sure to build on our previous ones.",
      },
      {
        type: "p",
        text: "The cycle in Ilaya was the pioneer cycle so it gave us all our firsts. It was our first time to try out the five Saturday ABKL in a community setting, to have parents sign a photo/video release form, and to introduce a classroom routine (opening and closing prayer and songs, sing & dance, rules, attention-getters), among others. For some of our volunteers, it was also their first time to tell a story to kids.",
      },
      {
        type: "image",
        src: getFolderPhotos("RJ Belen", "1")[1],
        alt: "Abot Ko Ang Libro storytelling session during an early ABKL cycle",
      },
      {
        type: "p",
        text: "For our cycle in Calabuanan, it was the start of SÍKAT members stepping up and leading the ABKL implementation. We called them co-leads who would coordinate with our SK partners, prepare the materials and taskings, and mobilize their fellow volunteers every Saturday. It was also the first time that we introduced the ABKL kit – a kit that contained basic school supplies and a storybook and that served as a token of our co-learners for completing the 5-Saturday ABKL.",
      },
      {
        type: "image",
        src: getFolderPhotos("RJ Belen", "1")[2],
        alt: "ABKL co-leads mobilizing volunteers during a Saturday cycle",
      },
      {
        type: "p",
        text: "Moreover, our Brgy.5 cycle gave us the first of creating our own storybook lesson plans to have more structured storytelling sessions. The lesson plans gave our volunteers more confidence to tell a story as they had a guide to follow. It allowed our co-learners to understand even better the books that we read to them.",
      },
      {
        type: "p",
        text: "For our cycle in Reserva, we had our first student with special needs in the name of Danreb. And we’re glad to have a SPED Major in the house to guide us in dealing with him.",
      },
      {
        type: "p",
        text: "And when we launched Abot Ko Ang Libro last year, our vision for the project was clear. It was only to provide an easy access to books and inculcate a love of reading among kids in the middle of a pandemic. But cycle in cycle out, we saw the project evolved right before our eyes.",
      },
      {
        type: "p",
        text: "From what was once a reading corner, ABKL became a full alternative classroom learning experience during a time that our co-learners yearned for one. It did not just introduce our co-learners to the magical world of reading but it actually went above and beyond by providing a well-rounded development for each of them. They acquired knowledge from the storybooks in our mini-library cart and from our story telling sessions. They got exposed to their same aged compatriots – allowing them to practice empathy, participation, and friendship. They also got to channel their energy into more sociable avenues through our opening and closing songs, breakout sessions, and play time during breaks.",
      },
      {
        type: "image",
        src: getFolderPhotos("RJ Belen", "1")[3],
        alt: "Kids joining an Abot Ko Ang Libro reading session",
      },
      {
        type: "p",
        text: "And as schools gradually reopen its doors, we are excited for our co-learners to return to their classrooms or set foot for the first time in a classroom. We look forward to them honing their skills, developing their identities, and widening their horizons. We hope to see them flourish and succeed in school.",
      },
      {
        type: "p",
        text: "But on the other hand, we, in SÍKAT BALER, will surely miss singing the ‘O Kay Sarap Magbasa’ and ‘Paalam Na’ songs with them. We will miss waking up early on a Saturday to meet and tell a story to them. We will miss hearing the anecdotes of parents every cycle:",
      },
      {
        type: "p",
        text: "“Naku sir. Sila na nga po ang gumigising sa amin tuwing Sabado kasi excited mag-ABKL.”",
      },
      {
        type: "p",
        text: "“Si Nicolas sir binibilang ang araw bago mag Sabado kasi excited na bumalik kayo at mag ABKL.”",
      },
      {
        type: "p",
        text: "Indeed, it was a good 8-month run of Abot Ko Ang Libro. But know that this is not goodbye. This is just see you later. 🤔🤔",
      },
      {
        type: "p",
        text: "SÍKAT-BALER, whose name is a tribute to the rise (pagsíkat) of a new face of youth volunteerism in a place where the sun rises, will always come up with new initiatives that are geared towards brighter, better, and bolder communities. 😊",
      },
      {
        type: "p",
        text: "#AbotKoAngLibro",
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
    img: getFolderPhotos("RJ Belen", "2")[0] || PHOTOS.communityOutreach,
    author: { name: "RJ Belen", role: "Co-Founder", avatar: logoImg },
    body: [
      {
        type: "p",
        text: "Minsan talaga, kapag nagiging bahagi na ng pang-araw-araw na buhay ang mga gawain, nakakalimutan natin bigyang halaga ‘yung impact ng mga ginagawa natin.",
      },
      {
        type: "p",
        text: "But today, I choose to remember.",
      },
      {
        type: "p",
        text: "During our debrief session for our 4th of 5th Saturday of Abot Ko Ang Libro in Sitio Aguang, I was reminded of the ripples of impact we have created in Síkat-Aurora.",
      },
      {
        type: "p",
        text: "Dahil maraming bagong mukha, I asked our volunteers to introduce themselves by stating their name, where they live, and kailan sila “sumikat” (o nag join ng Síkat).",
      },
      {
        type: "p",
        text: "I was surprised to know that majority of them came all the way from San Luis and Maria Aurora – a 20-30-minute travel from Baler. Hindi kami aktibong nagre-recruit sa Síkat pero karamihan sa kanila ay kusang sumali ng Síkat dahil nakikita nila sa Facebook, through their friends of friends’ post, ‘yung mga ginagawa namin sa organisasyon.",
      },
      {
        type: "image",
        src: getFolderPhotos("RJ Belen", "2")[1],
        alt: "Síkat-Aurora volunteers during the Sitio Aguang debrief session",
      },
      {
        type: "p",
        text: "Nanlumo rin ako kasi aside sa gumising sila nang maaga on a Saturday, namasahe pa sila ng Php 100-150 para lang mag volunteer sa Síkat. 🥺",
      },
      {
        type: "p",
        text: "Karamihan din sa mga kasama namin ngayon na volunteers ay mga tumakbong SK na hindi pinalad sa kakatapos lang ng eleksyon. Matagal na rin namin silang kasama sa Síkat pero muling nagbabalik loob kasi parang naging breather o pahingahan daw nila ang Síkat ngayon matapos ang madugong kampanya.",
      },
      {
        type: "p",
        text: "Nakaka-inspire dahil sa kabila ng kanilang pagkabigo, andun pa rin yung kagustuhan na maglingkod – may posisyon man o wala. 🥺",
      },
      {
        type: "p",
        text: "Ngayong araw din, nagkita ulit kami Zhiantino. Nakilala namin siya noong 13 years old pa siya dahil naging estudyante namin siya sa Abot Ko Ang Libro sa Brgy. 5, way back in 2021 na kasagsagan pa ng pandemya.",
      },
      {
        type: "image",
        src: getFolderPhotos("RJ Belen", "2")[2],
        alt: "Síkat-Aurora volunteers gathered in Sitio Aguang",
      },
      {
        type: "p",
        text: "Ngayon, 15 years old na siya, binata na, at kasama na rin namin siya na nagboboluntaryo. What a full circle moment. 🥹🥰",
      },
      {
        type: "p",
        text: "Punong puno ang puso ko ngayong araw dahil sa pinagsamang lakas ng mga kabataan. Hindi ko lubos akalain na ito na ‘yung samahan na nabuo ng Síkat sa dalawang taong pagkakatatag. It is now a home to more than 150 Aurora’s finest youth leaders na patuloy na maglilingkod nang walang inaasahang kapalit. ✨",
      },
      {
        type: "p",
        text: "Síkat-Aurora, ang layo na nang narating natin pero malayo layo pa rin ang ating lakbayin. Kaya tuloy lang sa pagsíkat. 🌅",
      },
    ],
  },
  {
    slug: "dalawang-bayani-ng-bansa-topnhs",
    title: "Dalawang Bayani ng Bansa: Reading Rizal and Bonifacio with TOPNHS Students",
    excerpt:
      "A return visit to Teresita Ong Palmero NHS, where round-robin reading of Rene Villanueva's 'Dalawang Bayani ng Bansa' sparks a student's reflection on justice, poverty, and what makes someone a hero.",
    category: "Abot Ko Ang Libro",
    date: "2026-06-09",
    readTime: "2 min read",
    img: getFolderPhotos("Reaiah Codiapit", "1")[0] || PHOTOS.communityOutreach,
    author: { name: "Reaiah Codiapit", role: "Co-Founder", avatar: logoImg },
    body: [
      {
        type: "p",
        text: "Four days ago, we went to Teresita Ong Palmero NHS. Galing na rin kami dito last year, at ang nakakatuwa, narito pa rin ang books sponsored by Bell Kenz Foundation.",
      },
      {
        type: "p",
        text: "What makes this encounter special is we get to read these books with TOPNHS students.",
      },
      {
        type: "p",
        text: "And this time, we encourage them to choose which book they want to read together as a group.",
      },
      {
        type: "p",
        text: "Para mas engaging, ginawa namin ang round-robin reading.",
      },
      {
        type: "p",
        text: "Bawat isa ay may pagkakataong buklatin, basahin, at ipaliwanag ang bawat pahina ng libro sa mas simple at relax na paraan.",
      },
      {
        type: "p",
        text: "Tampok sa aming kwentuhan ang librong isinulat ni Rene Villanueva na pinamagatang “Dalawang Bayani ng Bansa”.",
      },
      {
        type: "p",
        text: "Nakakatuwa na sa pamamagitan ng pagbabasa nito, mas nagiging bukas ang mga bata sa kaaalaman tungkol sa buhay ni Rizal at Bonifacio — na kung saan hindi nasusukat ang pagkakaiba ng katayuan, pinagdaanan, at kalagayan sa lipunan para kilalanin bilang isang bayani.",
      },
      {
        type: "p",
        text: "At iyan ang isinulat ni Joana Marie ng tanungin kung anong maitutulong ng kwento sa mga Filipino.",
      },
      {
        type: "p",
        text: "Nahuli man siyang nakasama sa aming pagbabasa, may isinulat na hanggang ngayon ay tumatak sa akin.",
      },
      {
        type: "p",
        text: "“Para sa akin, mahirap o mayaman, kaya pa rin nating ipaglaban ang ating karapatan”",
      },
      {
        type: "p",
        text: "Sana sa huli, hindi na kailangang ipaglaban ang karapatan. Wala nang labanan. Wala nang ingay.. hindi dahil may natalo o nanalo, o may nanakop, kundi dahil natatamasa at nararanasan na ng bawat Filipino ang karapatang noong una pa lamang ay naibigay na sa kanila.",
      },
      {
        type: "p",
        text: "At bago tuluyang mangyari 'yan, dito muna ang mga bata.. mag-aaral, magbabasa at nanamnamin ang mga aral na ititinuturo ng librong abot kamay na nila. Salamat sa mga aklat ng Ibong Adarna",
      },
    ],
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

export const getPostBody = (post) => post?.body ?? [];

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
