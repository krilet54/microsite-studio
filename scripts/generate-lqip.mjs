#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const root = process.cwd();
const input = path.join(root, 'src', 'assets', 'video11.mp4');
const outDir = path.join(root, 'src', 'assets');
const output = path.join(outDir, 'video11-lqip.jpg');

if (!fs.existsSync(input)) {
  console.error('Video input not found:', input);
  process.exit(1);
}

try {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const args = [
    '-y',
    '-ss', '0.5',
    '-i', input,
    '-frames:v', '1',
    '-vf', 'scale=320:-1,boxblur=10:1',
    output
  ];

  console.log('Running:', ffmpegPath, args.join(' '));
  const res = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status || 1);

  const stats = fs.statSync(output);
  console.log('Generated LQIP:', output, `${Math.round(stats.size/1024)} KB`);
} catch (err) {
  console.error('Failed to generate LQIP:', err);
  process.exit(1);
}
