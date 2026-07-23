/** Post status values — kept in sync with the database CHECK constraint. */
export const POST_STATUS = {
  DRAFT: "draft",
  IN_REVIEW: "in_review",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

/** User roles — kept in sync with the database enum. */
export const USER_ROLE = {
  WRITER: "writer",
  EDITOR: "editor",
  ADMIN: "admin",
};

/** Human-readable labels for post statuses. */
export const STATUS_LABELS = {
  [POST_STATUS.DRAFT]: "Draft",
  [POST_STATUS.IN_REVIEW]: "In Review",
  [POST_STATUS.SCHEDULED]: "Scheduled",
  [POST_STATUS.PUBLISHED]: "Published",
  [POST_STATUS.ARCHIVED]: "Archived",
};

/** Human-readable labels for user roles. */
export const ROLE_LABELS = {
  [USER_ROLE.WRITER]: "Writer",
  [USER_ROLE.EDITOR]: "Editor",
  [USER_ROLE.ADMIN]: "Admin",
};

/** Maximum upload file size in bytes (5 MB). */
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

/** Accepted image MIME types for upload. */
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

/** Site name used for page titles and metadata. */
export const SITE_NAME = "Síkat-Aurora Inc.";
