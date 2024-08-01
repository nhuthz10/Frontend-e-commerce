export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/user/*", "/admin/*"],
    },
    sitemap: [
      `${process.env.VERCEL_URL ?? 'localhost:3000'}/sitemap.xml`,
    ],
  };
}
