#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const root = process.cwd();
const svgPath = path.join(root, 'public', 'og', 'top6-passive-income.svg');
const pngPath = path.join(root, 'public', 'og', 'top6-passive-income.png');

if (!fs.existsSync(svgPath)) {
  console.error('SVG not found at', svgPath);
  process.exit(1);
}

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

(async () => {
  try {
    // background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    // inner rounded rectangle gradient
    const rx = 60, ry = 60, rw = 1080, rh = 510, r = 24;
    const grad = ctx.createLinearGradient(rx, ry, rx + rw, ry);
    grad.addColorStop(0, '#FF6B6B');
    grad.addColorStop(1, '#FF2B2B');
    // draw rounded rect background
    ctx.beginPath();
    ctx.moveTo(rx + r, ry);
    ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
    ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
    ctx.arcTo(rx, ry + rh, rx, ry, r);
    ctx.arcTo(rx, ry, rx + rw, ry, r);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // headline text
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 44px Poppins, Inter, sans-serif';
    ctx.fillText('Top 6 Legit Passive Income Ideas', rx + 60, ry + 60);
    ctx.font = '700 36px Poppins, Inter, sans-serif';
    ctx.fillText('For Students', rx + 0 + 60, ry + 60 + 64);

    // subtext wrap
    ctx.font = '400 20px Poppins, Inter, sans-serif';
    const sub = 'Short, real experiments: referrals, digital products, POD, UGC, templates & short-form content';
    const maxWidth = 840;
    const words = sub.split(' ');
    let line = '';
    let y = ry + 130;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, rx + 60, y);
        line = words[n] + ' ';
        y += 28;
      } else {
        line = testLine;
      }
    }
    if (line) ctx.fillText(line, rx + 60, y);

    // footer tag
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '14px Poppins, Inter, sans-serif';
    ctx.fillText('micro-site.studio', rx + rw - 110, ry + rh - 18);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(pngPath, buffer);
    const size = Math.round(fs.statSync(pngPath).size / 1024);
    console.log('Wrote PNG via canvas draw:', pngPath, `${size} KB`);
  } catch (err) {
    console.error('Failed to draw PNG:', err);
    process.exit(1);
  }
})();
(async () => {
  try {
    try {
      const sharpModule = await import('sharp');
      const svgBuffer = fs.readFileSync(svgPath);
      await sharpModule.default(svgBuffer).png({ quality: 90 }).toFile(pngPath);
      const size = Math.round(fs.statSync(pngPath).size / 1024);
      console.log('Wrote PNG via sharp:', pngPath, `${size} KB`);
      return;
    } catch (sharpErr) {
      console.warn('sharp conversion failed (falling back to canvas):', sharpErr && sharpErr.message ? sharpErr.message : sharpErr);
    }

    let img;
    try {
      // some environments support loading SVG by file path
      img = await loadImage(svgPath);
    } catch (e) {
      // fallback: use data URL
      const svg = fs.readFileSync(svgPath, 'utf8');
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      img = await loadImage(dataUrl);
    }
    ctx.drawImage(img, 0, 0, width, height);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(pngPath, buffer);
    const size = Math.round(fs.statSync(pngPath).size / 1024);
    console.log('Wrote PNG via canvas:', pngPath, `${size} KB`);
  } catch (err) {
    console.error('Failed to convert SVG to PNG:', err);
    process.exit(1);
  }
})();
