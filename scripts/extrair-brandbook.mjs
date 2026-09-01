import { readFileSync } from 'node:fs';
import { inflateSync, inflateRawSync } from 'node:zlib';
import sharp from 'sharp';

const file = process.argv[2] ?? 'o_marceneiro_digital_brand_book_by_pomelli.pdf';
const raw = readFileSync(file);
const text = raw.toString('latin1');

function inflate(buf) {
  try { return inflateSync(buf); } catch {
    try { return inflateRawSync(buf); } catch { return null; }
  }
}

const streams = [];
const streamRe = /stream\r?\n([\s\S]*?)endstream/g;
let m;
while ((m = streamRe.exec(text))) {
  const s = inflate(Buffer.from(m[1], 'latin1'));
  if (s) streams.push(s.toString('latin1'));
}
const all = streams.join('\n');

const fonts = [...new Set([
  ...(all.match(/\/BaseFont\s*\/[^\s/]+/g) ?? []),
  ...(all.match(/\/FontName\s*\/[^\s/]+/g) ?? []),
])];
console.log('=== FONTES ===');
console.log(fonts.join('\n'));

function hexOf(vals) {
  return '#' + vals.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

const tokens = all.split(/\s+/);
const colorOps = ['rg', 'RG', 'g', 'G'];
const freq = {};
for (let i = 0; i < tokens.length; i++) {
  if (colorOps.includes(tokens[i])) {
    const nums = [];
    let ok = true;
    for (let j = 1; j <= 3; j++) {
      const v = parseFloat(tokens[i - j]);
      if (isNaN(v) || v < 0 || v > 1) { ok = false; break; }
      nums.push(v * 255);
    }
    if (ok) {
      const key = `${tokens[i]} ${hexOf(nums)}`;
      freq[key] = (freq[key] ?? 0) + 1;
    }
  }
}
console.log('\n=== CORES VETORIAIS (rg/RG/g) ===');
for (const [k, n] of Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
  console.log(k, 'x' + n);
}

const imageRe = /\/Subtype\s*\/Image([\s\S]*?)stream\r?\n([\s\S]*?)endstream/g;
let im;
const images = [];
while ((im = imageRe.exec(text))) {
  const attrs = im[1];
  const body = Buffer.from(im[2], 'latin1');
  const w = Number((attrs.match(/\/Width\s+(\d+)/) ?? [])[1]);
  const h = Number((attrs.match(/\/Height\s+(\d+)/) ?? [])[1]);
  const bpc = Number((attrs.match(/\/BitsPerComponent\s+(\d+)/) ?? [])[1]);
  const cs = (attrs.match(/\/ColorSpace\s+(\S+)/) ?? [])[1];
  const filter = (attrs.match(/\/Filter\s+(\S+)/) ?? [])[1];
  const isFlate = (attrs.match(/\/Filter\s*\[([^\]]*)\]/) ?? [])[1]?.includes('FlateDecode');
  images.push({ w, h, bpc, cs, filter, isFlate, body });
}
console.log(`\n=== IMAGENS EMBUTIDAS: ${images.length} ===`);

async function dominantColors(img, topN = 6) {
  try {
    let pipeline;
    if (img.filter === '/DCTDecode') {
      pipeline = sharp(img.body);
    } else if (img.cs === '/DeviceRGB' && img.bpc === 8 && (img.isFlate || img.filter === '/FlateDecode')) {
      const inflated = inflate(img.body);
      if (!inflated) return null;
      const { data } = await sharp(inflated, { raw: { width: img.w, height: img.h, channels: 3 } })
        .resize(160, 90, { fit: 'fill' })
        .raw()
        .toBuffer({ resolveWithObject: true });
      return data;
    } else {
      return null;
    }
    const { data } = await pipeline.resize(160, 90, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
    return data;
  } catch { return null; }
}

async function quantize(data) {
  const buckets = {};
  for (let i = 0; i < data.length; i += 3) {
    const r = Math.round(data[i] / 24) * 24;
    const g = Math.round(data[i + 1] / 24) * 24;
    const b = Math.round(data[i + 2] / 24) * 24;
    const key = `${r},${g},${b}`;
    buckets[key] = (buckets[key] ?? 0) + 1;
  }
  const ranked = Object.entries(buckets).sort((a, b) => b[1] - a[1]);
  const merged = [];
  for (const [key, n] of ranked) {
    const v = key.split(',').map(Number);
    const lum = 0.299 * v[0] + 0.587 * v[1] + 0.114 * v[2];
    if (lum > 235 || lum < 12) continue;
    const dup = merged.some(([mv]) => Math.abs(mv[0] - v[0]) < 28 && Math.abs(mv[1] - v[1]) < 28 && Math.abs(mv[2] - v[2]) < 28);
    if (!dup) merged.push([v, n]);
    if (merged.length >= 8) break;
  }
  return merged.map(([v, n]) => `${hexOf(v)} (${v.join(',')}) x${n}`);
}

(async () => {
  console.log('\n=== PALETA DOMINANTE POR IMAGEM ===');
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (!img.w || !img.h) continue;
    const data = await dominantColors(img);
    if (!data) continue;
    const palette = await quantize(data);
    console.log(`img${i}: ${img.w}x${img.h} ${img.cs} ${img.filter ?? 'Flate'} -> ${palette.join(' | ')}`);
  }
})().catch(e => { console.error(e); process.exit(1); });