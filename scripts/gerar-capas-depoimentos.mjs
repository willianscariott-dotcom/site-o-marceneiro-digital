import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images/estudos-de-caso');

const W = 1280;
const H = 720;

const covers = [
  { slug: 'depoimento-daniel-sao-bernardo-sp', phrase: 'Economia de mais de 40%', client: 'Daniel', city: 'São Bernardo do Campo/SP' },
  { slug: 'depoimento-alexandre-rio-de-janeiro-rj', phrase: 'Um móvel extra com as sobras', client: 'Alexandre', city: 'Rio de Janeiro/RJ' },
  { slug: 'depoimento-ellen-roberta-macapa-ap', phrase: 'R$ 3.500 de economia', client: 'Ellen Roberta', city: 'Macapá/AP' },
  { slug: 'depoimento-ricardo-colleti-americana-sp', phrase: '65% de economia na casa toda', client: 'Ricardo Colleti', city: 'Americana/SP' },
  { slug: 'depoimento-paulo-belo-jardim-pe', phrase: 'MDF 18mm com 40% de economia', client: 'Paulo', city: 'Belo Jardim/PE' },
  { slug: 'depoimento-rogers-pelle-rio-brilhante-ms', phrase: 'Segurança para projetar sem medo', client: 'Rogers Pelle', city: 'Rio Brilhante/MS' },
  { slug: 'depoimento-carmem-wander-valparaiso-go', phrase: 'Perfeito até em paredes tortas', client: 'Carmém Wander', city: 'Valparaíso/GO' },
  { slug: 'depoimento-catiele-santos-santo-antonio-da-patrulha-rs', phrase: 'Orçamento 100% previsível', client: 'Catiéle Santos', city: 'Santo Antônio da Patrulha/RS' },
  { slug: 'depoimento-juliana-schons-sao-miguel-do-oeste-sc', phrase: 'Autonomia total na montagem', client: 'Juliana Schons', city: 'São Miguel do Oeste/SC' },
  { slug: 'depoimento-leandro-rio-de-janeiro-rj', phrase: 'Elogiado pela central CNC', client: 'Leandro', city: 'Rio de Janeiro/RJ' },
];

function wrapPhrase(phrase, maxChars) {
  const words = phrase.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg({ phrase, city }) {
  const fontSize = 70;
  const maxChars = 20;
  const lines = wrapPhrase(phrase, maxChars);
  const lineHeight = Math.round(fontSize * 1.18);
  const startY = 360 - ((lines.length - 1) * lineHeight) / 2;

  const tspans = lines
    .map((line, i) => `<tspan x="640" y="${startY + i * lineHeight}">${line}</tspan>`)
    .join('');

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B0C10"/>
      <stop offset="0.55" stop-color="#101F33"/>
      <stop offset="1" stop-color="#004E98"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.65">
      <stop offset="0" stop-color="#FBB03B" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#FBB03B" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="1150" cy="110" r="190" fill="none" stroke="#FBB03B" stroke-width="2" opacity="0.30"/>
  <circle cx="1150" cy="110" r="125" fill="none" stroke="#FBB03B" stroke-width="1.5" opacity="0.20"/>
  <circle cx="90" cy="640" r="210" fill="#FFFFFF" opacity="0.045"/>
  <circle cx="90" cy="640" r="135" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.12"/>
  <path d="M0 600 Q 320 500 640 620 T 1280 540 L 1280 720 L 0 720 Z" fill="#FBB03B" opacity="0.07"/>
  <line x1="640" y1="258" x2="640" y2="282" stroke="#FBB03B" stroke-width="3" opacity="0.8"/>
  <text x="640" y="236" font-family="Segoe UI, Arial, sans-serif" font-size="22" letter-spacing="8" fill="#FBB03B" text-anchor="middle" font-weight="600">DEPOIMENTO MÉTODO SIM</text>
  <text x="640" y="0" font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#FFFFFF" text-anchor="middle">${tspans}</text>
  <text x="640" y="${startY + lines.length * lineHeight + 58}" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#C8CDD8" text-anchor="middle" font-weight="500">${city}</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

(async () => {
  for (const cover of covers) {
    const svg = buildSvg(cover);
    const out = resolve(outDir, `${cover.slug}-capa.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(out);
    const meta = await sharp(out).metadata();
    const stats = await sharp(out).stats();
    const amber = stats.channels[2]; // R
    console.log(`${cover.slug} -> ${meta.width}x${meta.height} ok (${Math.round((await import('node:fs')).statSync(out).size / 1024)}KB)`);
    if (!existsSync(out) || meta.width !== W) {
      throw new Error(`Falha ao gerar ${cover.slug}`);
    }
  }
  console.log('Todas as 10 capas geradas.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
