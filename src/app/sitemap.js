export default function sitemap() {
    return [
      {
        url: process.env.VERCEL_URL ?? 'http://localhost:3000/',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: process.env.VERCEL_URL ?? 'http://localhost:3000/user',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    ]
  }