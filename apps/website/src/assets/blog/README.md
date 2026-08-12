# Blog post photos

Drop a photo here named after the post's slug and it becomes that post's
hero/thumbnail image automatically — no code change needed.

  our-first-eight-months                  -> our-first-eight-months.jpg
  a-full-circle-moment-in-sitio-aguang     -> a-full-circle-moment-in-sitio-aguang.jpg

`.jpg`, `.jpeg`, `.png`, and `.webp` all work. Find the slug for any post in
`src/lib/posts.js` (the `slug` field on each entry). Until a photo exists,
the post falls back to a generic program photo.
