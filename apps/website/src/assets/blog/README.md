# Blog source material

Organize new drops as: `<Writer Name>/<post number>/`

  RJ Belen/1/          -> text.txt + photos for RJ's first post
  RJ Belen/2/          -> text.txt + photos for RJ's second post
  Reaiah Codiapit/1/   -> text.txt + photos for Reaiah's first post

Each numbered folder holds the post's write-up (`text.txt`) and its photos
(`.jpg`, `.jpeg`, `.png`, or `.webp`). Photos are picked up automatically by
the site once the post entry references that folder via `getFolderPhotos("<Writer Name>", "<post number>")`
in `src/lib/posts.js` — first photo becomes the hero image, the rest can be
used as inline gallery images in the body.

The write-up itself is not auto-published — add each post's title, date,
category, and excerpt by hand in `src/lib/posts.js`, copying the `text.txt`
content into `body` blocks verbatim (no edits, no invented headings).
