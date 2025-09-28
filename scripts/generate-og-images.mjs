#!/usr/bin/env node
/**
 * OG Image Generator
 * Generates 1200x630 JPEG cards with title + subtitle using @napi-rs/canvas.
 */
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Register a fallback font (system fallback assumed). If you want a specific brand font,
// drop a .ttf into scripts/fonts and register it here.
try {
  GlobalFonts.registerFromPath(resolve('scripts', 'fonts', 'Inter-Bold.ttf'), 'InterBold');
} catch {}

const OUT_DIR = resolve('public', 'og');
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const brand = {
  bg: '#0E1116',
  accent: '#6366F1', // indigo-like accent
  textPrimary: '#FFFFFF',
  textSecondary: '#CBD5E1'
};

const cards = [
  { file: 'home-default.jpg', title: 'Build & Launch Faster', subtitle: 'Modern Web & Brand Services' },
  { file: 'website-packages.jpg', title: 'Website Packages', subtitle: 'Fast. Responsive. SEO Ready.' },
  { file: 'social-media-plans.jpg', title: 'Social Media Plans', subtitle: 'Grow Audience Consistently' },
  { file: 'branding-kits.jpg', title: 'Branding Kits', subtitle: 'Cohesive Visual Identity' },
  { file: 'plans.jpg', title: 'Pricing & Plans', subtitle: 'Transparent. Flexible. Scalable.' }
];

function drawCard({ title, subtitle }) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#111827');
  grad.addColorStop(1, '#1E293B');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Accent radial glow
  const radial = ctx.createRadialGradient(width - 200, height - 150, 50, width - 200, height - 150, 400);
  radial.addColorStop(0, 'rgba(99,102,241,0.35)');
  radial.addColorStop(1, 'rgba(99,102,241,0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  // Accent bar
  ctx.fillStyle = brand.accent;
  ctx.fillRect(0, 0, 16, height);

  // Title
  ctx.fillStyle = brand.textPrimary;
  ctx.font = '700 84px "InterBold", sans-serif';
  ctx.textBaseline = 'top';
  wrapText(ctx, title, 80, 140, width - 160, 92);

  // Subtitle
  ctx.fillStyle = brand.textSecondary;
  ctx.font = '400 40px "InterBold", sans-serif';
  wrapText(ctx, subtitle, 80, 400, width - 160, 56);

  // Watermark / brand
  ctx.font = '600 32px "InterBold", sans-serif';
  ctx.fillStyle = brand.accent;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('bolt3.io', 80, height - 70);

  return canvas;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

for (const card of cards) {
  const canvas = drawCard(card);
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.9, progressive: true });
  const outPath = resolve(OUT_DIR, card.file);
  writeFileSync(outPath, buf);
  console.log('Generated', card.file, (buf.length / 1024).toFixed(1) + 'KB');
}

console.log('OG images generated in', OUT_DIR);
