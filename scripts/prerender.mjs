#!/usr/bin/env node
/**
 * Post-build Prerender Script
 *
 * Launches a local preview server, visits each route with Puppeteer,
 * and saves the fully-rendered HTML so crawlers see JSON-LD + meta
 * on first load without executing JavaScript.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const JOURNAL_SLUGS = [
  'powder-coat-vs-patina-finishes',
  'lake-leelanau-spiral-staircase-case-study',
  'anatomy-of-an-anvil',
  'hot-rolled-vs-cold-rolled-steel',
  'the-lost-art-of-structural-riveting',
  'blacksmith-vs-welder-whats-the-difference',
  'wrought-iron-vs-cast-iron-vs-mild-steel',
];

const CATEGORY_SLUGS = [
  'railings-fences-and-gates',
  'custom-furniture',
  'commercial',
  'art-and-decor',
  'doors-and-windows',
  'behind-the-scenes',
  'custom-projects',
  'outdoor-metal-decor',
  'kitchens-and-bar-tops',
];

const ROUTES = [
  '/',
  '/services',
  '/process',
  ...CATEGORY_SLUGS.map(s => `/services/${s}`),
  '/about',
  '/contact',
  '/contact-form',
  '/journal',
  '/discover',
  '/glossary',
  ...JOURNAL_SLUGS.map(s => `/journal/${s}`),
];

async function startServer(dir, port) {
  const { default: handler } = await import('serve-handler').catch(() => null) || {};

  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);
      let filePath = join(dir, url.pathname);

      if (!filePath.includes('.')) {
        filePath = join(dir, 'index.html');
      }

      if (existsSync(filePath)) {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          jpeg: 'image/jpeg',
          jpg: 'image/jpeg',
          png: 'image/png',
          webp: 'image/webp',
          svg: 'image/svg+xml',
          xml: 'application/xml',
          txt: 'text/plain',
          woff2: 'font/woff2',
          woff: 'font/woff',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } else {
        const fallback = readFileSync(join(dir, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      }
    });

    server.listen(port, () => {
      console.log(`  Preview server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function main() {
  console.log('🖨️  Prerendering routes...\n');

  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `npm run build` first (without prerender).');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch {
    console.error('❌ puppeteer not installed. Run `npm install -D puppeteer`.');
    process.exit(1);
  }

  const PORT = 4936;
  const server = await startServer(DIST_DIR, PORT);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  let success = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForSelector('script[type="application/ld+json"]', { timeout: 10000 }).catch(() => {});

      const html = await page.content();

      const outPath = route === '/'
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, route, 'index.html');

      const outDir = dirname(outPath);
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      writeFileSync(outPath, html, 'utf-8');

      const schemaCount = (html.match(/application\/ld\+json/g) || []).length;
      console.log(`  ✅ ${route} (${schemaCount} JSON-LD blocks)`);
      success++;
    } catch (err) {
      console.error(`  ❌ ${route}: ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n📊 Prerender complete: ${success} succeeded, ${failed} failed out of ${ROUTES.length} routes.`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
