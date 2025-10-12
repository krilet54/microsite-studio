// Simple sitemap generator reading a static route list.
// Run with: node scripts/generate-sitemap.mjs
// Outputs sitemap.xml in project root (or adjust path if public/ is served).

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// If you later centralize routes, you can import them instead.
const baseUrl = 'https://micro-site.studio';

// Add or remove routes here as you add pages.
const routes = [
  '/',
  '/plans',
  '/services',
  '/services/websites',
  '/services/social-media',
  '/services/branding',
  '/portfolio',
  '/about'
];

const now = new Date().toISOString();

const body = routes
  .map(
    (path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.7'}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const outPath = resolve(process.cwd(), 'public', 'sitemap.xml');
await writeFile(outPath, xml, 'utf8');
console.log('Generated sitemap at', outPath);
