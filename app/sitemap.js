const BASE_URL = 'https://www.shopsoros.com'

export default function sitemap() {
  const now = new Date().toISOString()

  const staticPaths = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/join', changeFrequency: 'monthly', priority: 1.0 },
    { path: '/join/points', changeFrequency: 'daily', priority: 0.8 },
  ]

  const pages = staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  return pages
}
