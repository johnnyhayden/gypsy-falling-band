/*
 * Keys the background out of the Gold Dust & Wildflowers logo.
 *
 * The source file ships as PNG color-type 2 — no alpha channel at all. What looks
 * like transparency is a checkerboard painted into the pixels (#EFEFEF / #FEFEFE).
 * Dropped on the site as-is it renders a gray checkered box.
 *
 * So we build the alpha ourselves from darkness rather than thresholding: pencil
 * strokes keep their antialiasing instead of going jagged, and the checkerboard
 * (luminance 239-254) lands cleanly on alpha 0 with no haze or seams. The ink is
 * flattened to a single cream so CSS can tint and glow it however it likes.
 *
 * Run: node scripts/make-logo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const SOURCE = path.join(publicDir, "gold_dust_wildflowers_transparent.png");
const OUTPUT = path.join(publicDir, "gdw-logo.png");

/** Anything at or above this luminance is background. */
const WHITE_POINT = 228;
/** Flat ink color for the line art — --color-cream. */
const INK = [0xf2, 0xec, 0xe0];

function readChunks(buffer) {
  let header = null;
  const idat = [];
  let pos = 8; // skip PNG signature

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString("ascii", pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + length);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      idat.push(data);
    }

    pos += 12 + length;
  }

  return { header, data: Buffer.concat(idat) };
}

/** Undo the per-scanline filters (PNG spec 9.2) and return raw samples. */
function unfilter(raw, width, height, channels) {
  const stride = width * channels;
  const out = Buffer.alloc(stride * height);
  let prev = Buffer.alloc(stride);
  let pos = 0;

  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = Buffer.from(raw.subarray(pos, pos + stride));
    pos += stride;

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? line[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;

      switch (filter) {
        case 1:
          line[x] = (line[x] + a) & 0xff;
          break;
        case 2:
          line[x] = (line[x] + b) & 0xff;
          break;
        case 3:
          line[x] = (line[x] + ((a + b) >> 1)) & 0xff;
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          line[x] = (line[x] + pred) & 0xff;
          break;
        }
      }
    }

    line.copy(out, y * stride);
    prev = line;
  }

  return out;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);

  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(body) >>> 0);

  return Buffer.concat([length, body, crc]);
}

function writePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA

  // Filter type 0 (none) on every scanline — the encoder stays trivial and zlib
  // still crushes it, since the image is overwhelmingly one flat color.
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const { header, data } = readChunks(fs.readFileSync(SOURCE));

if (!header) throw new Error("No IHDR chunk in source PNG");
if (header.depth !== 8) throw new Error(`Expected 8-bit source, got ${header.depth}`);
if (header.interlace !== 0) throw new Error("Interlaced source PNGs are not supported");

const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[header.colorType];
if (!channels) throw new Error(`Unsupported color type ${header.colorType}`);

const { width, height } = header;
const pixels = unfilter(zlib.inflateSync(data), width, height, channels);
const rgba = Buffer.alloc(width * height * 4);

for (let i = 0, o = 0; i < pixels.length; i += channels, o += 4) {
  const r = pixels[i];
  const g = channels >= 3 ? pixels[i + 1] : r;
  const b = channels >= 3 ? pixels[i + 2] : r;

  // Rec. 601 luma — matches how the eye weights the pencil's gray values.
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const alpha = Math.max(0, Math.round(((WHITE_POINT - luma) / WHITE_POINT) * 255));

  rgba[o] = INK[0];
  rgba[o + 1] = INK[1];
  rgba[o + 2] = INK[2];
  rgba[o + 3] = Math.min(255, alpha);
}

// Trim the empty margin so the mark's own bounds are its layout bounds — otherwise
// every `width` we set in CSS is really sizing a box of invisible padding.
let top = height;
let left = width;
let right = -1;
let bottom = -1;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (rgba[(y * width + x) * 4 + 3] < 8) continue;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
    if (x < left) left = x;
    if (x > right) right = x;
  }
}

const cropW = right - left + 1;
const cropH = bottom - top + 1;
const cropped = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  const from = ((top + y) * width + left) * 4;
  rgba.copy(cropped, y * cropW * 4, from, from + cropW * 4);
}

fs.writeFileSync(OUTPUT, writePng(cropW, cropH, cropped));

const kb = (fs.statSync(OUTPUT).size / 1024).toFixed(0);
console.log(
  `Wrote ${path.relative(process.cwd(), OUTPUT)} — ${cropW}x${cropH} ` +
    `(trimmed from ${width}x${height}), ${kb} KB`
);
