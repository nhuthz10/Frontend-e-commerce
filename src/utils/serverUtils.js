import slugify from "slugify";

export const convertSlugUrl = (slug) => {
    if (!slug) return "";
    slug = slugify(slug, {
      lower: true,
      locale: "vi",
    });
    return slug;
}