/**
 * Renders the raster icons from public/favicon.svg, which stays the source:
 *
 *   public/favicon.ico           16, 32 and 48 px — for the clients that
 *                                request /favicon.ico directly and never read
 *                                <link rel="icon"> (Bing, some AI chat UIs).
 *   public/apple-touch-icon.png  180 px — iOS ignores an SVG touch icon.
 *                                Square and full-bleed: iOS rounds the corners
 *                                itself and paints transparent ones black.
 *
 * Run after changing favicon.svg, then commit the two files:
 *   node scripts/make-icons.mjs
 *
 * Uses sharp, which Astro already installs for its image service.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const PUBLIC = new URL('../public/', import.meta.url);
const svg = readFileSync(new URL('favicon.svg', PUBLIC), 'utf8');

const png = (source, size) =>
  sharp(Buffer.from(source), { density: 72 * (size / 64) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** An .ico holding PNG images, which every browser since IE 11 reads. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(async (size) => ({ size, data: await png(svg, size) })));
writeFileSync(new URL('favicon.ico', PUBLIC), ico(images));
console.log(`public/favicon.ico — ${sizes.join(', ')} px`);

// Full-bleed square for iOS: drop the rounded corners of the background.
const square = svg.replace(/(<rect width="64" height="64") rx="\d+"/, '$1');
if (square === svg) throw new Error('favicon.svg changed shape — update the rounded-corner pattern above.');
writeFileSync(new URL('apple-touch-icon.png', PUBLIC), await png(square, 180));
console.log('public/apple-touch-icon.png — 180 px');
