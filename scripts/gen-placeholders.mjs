/**
 * Generates labelled placeholder images for the Osaka trip so the build works
 * before real photos exist. Text is rendered in the project's iannnnn-DOG font
 * via @resvg/resvg-js; the result is encoded to JPEG with sharp.
 *
 * Replace the files in src/assets/osaka-2026/ with real images (max 1600px
 * wide, 3:2 hero / 1:1 grid) — frontmatter paths stay the same.
 *
 * Run: bun run placeholders
 */
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = join(ROOT, 'src/assets/osaka-2026');
const FONT_REGULAR = join(ROOT, 'public/iannnnn-DOG/iannnnn-DOG-Regular.ttf');
const FONT_BOLD = join(ROOT, 'public/iannnnn-DOG/iannnnn-DOG-Bold.ttf');

/** Read the font family name (name table, nameID 1) straight from a TTF. */
function fontFamily(ttfPath) {
  const buf = readFileSync(ttfPath);
  const numTables = buf.readUInt16BE(4);
  let nameTable = -1;
  for (let i = 0; i < numTables; i++) {
    const rec = 12 + i * 16;
    if (buf.toString('ascii', rec, rec + 4) === 'name') {
      nameTable = buf.readUInt32BE(rec + 8);
      break;
    }
  }
  if (nameTable < 0) return null;
  const count = buf.readUInt16BE(nameTable + 2);
  const storage = nameTable + buf.readUInt16BE(nameTable + 4);
  let win = null;
  let mac = null;
  for (let i = 0; i < count; i++) {
    const r = nameTable + 6 + i * 12;
    const platformID = buf.readUInt16BE(r);
    const nameID = buf.readUInt16BE(r + 6);
    const len = buf.readUInt16BE(r + 8);
    const off = buf.readUInt16BE(r + 10);
    if (nameID !== 1) continue;
    const start = storage + off;
    if (platformID === 3 || platformID === 0) {
      let s = '';
      for (let j = 0; j + 1 < len; j += 2) s += String.fromCharCode(buf.readUInt16BE(start + j));
      win = s;
    } else if (platformID === 1) {
      mac = buf.toString('latin1', start, start + len);
    }
  }
  return win || mac;
}

const FAMILY = fontFamily(FONT_REGULAR) || 'iannnnn-DOG';

const days = [
  { n: 1, name: 'Kyoto Arrival', c1: '#d63346', c2: '#fbad41', photos: 4 },
  { n: 2, name: 'Kyoto Temples', c1: '#b3283c', c2: '#e8616f', photos: 0 },
  { n: 3, name: 'Kansai Day Trip', c1: '#d63346', c2: '#fbad41', photos: 0 },
  { n: 4, name: 'Osaka USJ', c1: '#e8616f', c2: '#b3283c', photos: 0 },
  { n: 5, name: 'KIX Departure', c1: '#fbad41', c2: '#d63346', photos: 3 },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function poster(w, h, c1, c2, big, label) {
  const cx = w / 2;
  const cy = h / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="22" y="22" width="${w - 44}" height="${h - 44}" rx="26" fill="none"
        stroke="#fffdf7" stroke-width="6" stroke-dasharray="2 24" stroke-linecap="round"/>
  <text x="${cx}" y="${cy + h * 0.04}" text-anchor="middle"
        font-family="'${esc(FAMILY)}'" font-weight="700"
        font-size="${Math.round(h * 0.28)}" fill="#fffdf7">${esc(big)}</text>
  <text x="${cx}" y="${cy + h * 0.2}" text-anchor="middle"
        font-family="'${esc(FAMILY)}'" font-weight="400"
        font-size="${Math.round(h * 0.055)}" fill="#fffdf7" opacity="0.94">${esc(label)}</text>
</svg>`;
}

async function emit(rel, w, h, c1, c2, big, label) {
  const file = join(OUT, rel);
  await mkdir(dirname(file), { recursive: true });
  const resvg = new Resvg(poster(w, h, c1, c2, big, label), {
    font: {
      fontFiles: [FONT_REGULAR, FONT_BOLD],
      loadSystemFonts: false,
      defaultFontFamily: FAMILY,
    },
  });
  const png = resvg.render().asPng();
  await sharp(png).jpeg({ quality: 82 }).toFile(file);
  console.log('  ✓ src/assets/osaka-2026/' + rel);
}

console.log(`Generating placeholder images (font: ${FAMILY})…`);
for (const d of days) {
  await emit(`day-${d.n}/hero.jpg`, 1600, 1067, d.c1, d.c2, `Day ${d.n}`, d.name);
  for (let i = 1; i <= d.photos; i++) {
    await emit(`day-${d.n}/photo-${i}.jpg`, 1200, 1200, d.c2, d.c1, `D${d.n}`, `Photo ${i}`);
  }
}
console.log('Done.');
