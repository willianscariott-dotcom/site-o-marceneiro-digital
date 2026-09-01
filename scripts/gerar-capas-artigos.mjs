import sharp from 'sharp';
import { mkdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/Mini Sites');

const cortecloudSvg = readFileSync(resolve(__dirname, '../public/CorteCloud.svg'), 'utf8');
const CORTECLOUD_INNER = (cortecloudSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/) ?? [])[1] ?? '';

const W = 1280;
const H = 720;

const PALETTE = {
  base: '#100C0B',
  layer: '#1A1816',
  white: '#FFFFFF',
  gray: '#F3F3F3',
  amber: '#984E00',
  amberLight: '#C2711F',
  blue: '#3BB0FB',
  blueLight: '#7DCDC1',
  teal: '#084B42',
  tealLight: '#7DCDC1',
  ink: '#0B1412',
};

const covers = [
  { slug: 'corte-cloud-mais-caro-que-marcenaria', title: 'Corte Cloud ficou mais caro que marcenaria?', subtitle: 'Onde está o erro e como baratear', badge: 'CUSTOS & ORÇAMENTO', chip: 'IEC 85%', layout: 'full', accent: 'amber' },
  { slug: 'pessoa-fisica-cpf-pode-comprar-no-corte-cloud', title: 'Pessoa Física pode comprar no Corte Cloud?', subtitle: 'CPF x CNPJ na Central de Corte', badge: 'PLATAFORMA', chip: 'CPF x CNPJ', layout: 'column', accent: 'blue' },
  { slug: 'ferragens-parafusos-fita-inclusos-corte-cloud', title: 'Ferragens e fita de borda vêm inclusos?', subtitle: 'O que a Central de Corte entrega', badge: 'FERRAGENS', chip: 'COLA PUR', layout: 'band', accent: 'teal' },
  { slug: 'sobras-de-mdf-corte-cloud-aproveitamento', title: 'Sobras de MDF no Corte Cloud', subtitle: 'Como eliminar o lixo e economizar chapas', badge: 'CUSTOS & ORÇAMENTO', chip: '1–3 CHAPAS', layout: 'wash', accent: 'tealLight' },
  { slug: 'custo-loja-vs-custo-central-cozinha-planejada', title: 'Loja x Central: cozinha de R$ 18 mil', subtitle: 'Para onde vai o dinheiro e como economizar', badge: 'CUSTOS & ORÇAMENTO', chip: 'R$ 18 mil → R$ 10 mil', layout: 'split', accent: 'amberblue' },
  { slug: 'paredes-fora-de-esquadro-folgas-moveis', title: 'Paredes fora de esquadro e prumo', subtitle: 'Folgas para o móvel não travar', badge: 'ESTRUTURA & VÃOS', chip: '30mm FOLGA', layout: 'frame', accent: 'blue' },
  { slug: 'mdf-comum-vs-mdf-ultra-verde-umidade', title: 'MDF Comum x MDF Ultra (Verde)', subtitle: 'O mito da fita de borda', badge: 'MATERIAIS', chip: 'MDF ULTRA', layout: 'full', accent: 'teal' },
  { slug: 'contratar-montador-profissional-corte-cloud', title: 'Contratar só o montador dá certo?', subtitle: 'Projeto do Corte Cloud sem abandono de obra', badge: 'INSTALAÇÃO', chip: '0 ADIVINHAÇÃO', layout: 'column', accent: 'amber' },
  { slug: 'pecas-com-erro-espelhamento-corte-cloud', title: 'Peça veio errada ou espelhada?', subtitle: 'De quem é a culpa e como resolver', badge: 'INSTALAÇÃO', chip: 'ESPELHAMENTO', layout: 'band', accent: 'blue' },
  { slug: 'rodapes-tamponamento-roda-teto-areas-molhadas', title: 'Rodapés e Roda-teto: áreas molhadas', subtitle: 'Plinto de pedra, selante PU e iluminação', badge: 'ESTRUTURA & VÃOS', chip: 'PLINTO', layout: 'wash', accent: 'amber' },
  { slug: 'erro-de-colisao-e-usinagem-corte-cloud', title: 'Erro de colisão e travamento', subtitle: 'Por que acontece e como evitar no Corte Cloud', badge: 'PLATAFORMA', chip: 'SKETCHUP + HELLOMOB', layout: 'frame', accent: 'amber' },
  { slug: 'portas-de-vidro-reflecta-e-perfil-aluminio', title: 'Portas de Vidro e Perfil de Alumínio', subtitle: 'Reflecta no Corte Cloud: como fazer', badge: 'FERRAGENS', chip: 'DESCONTO ESQUADRIA', layout: 'split', accent: 'tealblue' },
  { slug: 'desconto-puxador-perfil-cava-aluminio', title: 'Desconto de Puxador Perfil', subtitle: 'O erro que custa uma chapa de MDF inteira', badge: 'FERRAGENS', chip: 'RM-221', layout: 'full', accent: 'blue' },
  { slug: 'espessura-mdf-15mm-vs-18mm-vaos', title: 'MDF 15mm x 18mm x 25mm', subtitle: 'Vãos máximos para o armário não envergar', badge: 'ESTRUTURA & VÃOS', chip: '15mm → 45cm', layout: 'band', accent: 'amber' },
  { slug: 'site-corte-cloud-vs-plugin-hellomob-sketchup', title: 'Site do Corte Cloud x Hellomob', subtitle: 'A diferença real de projetar no SketchUp', badge: 'PLATAFORMA', chip: 'MULTI-CENTRAL', layout: 'column', accent: 'teal' },
];

const ACCENTS = {
  amber: { main: PALETTE.amber, light: PALETTE.amberLight, onAccent: PALETTE.white, dark: '#3D1E00' },
  blue: { main: PALETTE.blue, light: PALETTE.blueLight, onAccent: PALETTE.ink, dark: '#0A2030' },
  teal: { main: PALETTE.teal, light: '#0E6B57', onAccent: PALETTE.white, dark: '#02241E' },
  tealLight: { main: PALETTE.tealLight, light: PALETTE.blueLight, onAccent: PALETTE.ink, dark: '#0A2E28' },
  amberblue: { main: PALETTE.amber, light: PALETTE.blue, onAccent: PALETTE.white, dark: '#3D1E00' },
  tealblue: { main: PALETTE.teal, light: PALETTE.blue, onAccent: PALETTE.white, dark: '#02241E' },
};

const SANS = 'Inter, &quot;Segoe UI&quot;, Arial, sans-serif';
const MONO = '&quot;Courier New&quot;, monospace';

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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

function buildBackground(layout, acc) {
  const { main, light, dark } = acc;
  if (layout === 'full') {
    return `<defs><linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${dark}"/>
      <stop offset="1" stop-color="${main}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>`;
  }
  if (layout === 'column') {
    return `<defs><linearGradient id="col" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${main}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PALETTE.base}"/>
      <stop offset="1" stop-color="${PALETTE.layer}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="300" height="${H}" fill="url(#col)"/>`;
  }
  if (layout === 'band') {
    return `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PALETTE.base}"/>
      <stop offset="1" stop-color="${PALETTE.layer}"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${main}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="540" width="${W}" height="180" fill="url(#band)"/>`;
  }
  if (layout === 'wash') {
    return `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PALETTE.base}"/>
      <stop offset="1" stop-color="${PALETTE.layer}"/>
    </linearGradient>
    <radialGradient id="wash" cx="0.85" cy="0.15" r="0.9">
      <stop offset="0" stop-color="${main}" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="${light}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${main}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#wash)"/>`;
  }
  if (layout === 'split') {
    return `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PALETTE.base}"/>
      <stop offset="1" stop-color="${PALETTE.layer}"/>
    </linearGradient>
    <linearGradient id="diag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${main}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <polygon points="800,0 1280,0 1280,720 700,720" fill="url(#diag)"/>`;
  }
  if (layout === 'frame') {
    return `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PALETTE.base}"/>
      <stop offset="1" stop-color="${PALETTE.layer}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.12" r="0.7">
      <stop offset="0" stop-color="${main}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${main}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>`;
  }
  return '';
}

function buildLayoutExtras(layout, acc, chipText) {
  const { main, light, dark, onAccent } = acc;
  const parts = [];
  if (layout === 'frame') {
    const s = 46, t = 130;
    parts.push(`<path d="M${t} ${s} L${s} ${s} L${s} ${t}" fill="none" stroke="${main}" stroke-width="8"/>`);
    parts.push(`<path d="M${W - t} ${s} L${W - s} ${s} L${W - s} ${t}" fill="none" stroke="${main}" stroke-width="8"/>`);
    parts.push(`<path d="M${t} ${H - s} L${W - s} ${H - s} L${W - s} ${H - t}" fill="none" stroke="${main}" stroke-width="8"/>`);
    parts.push(`<path d="M${s} ${H - s} L${s} ${H - t}" fill="none" stroke="${main}" stroke-width="8"/>`);
  }
  if (layout === 'band') {
    parts.push(`<text x="${W / 2}" y="655" font-family="${MONO}" font-size="34" font-weight="700" fill="${onAccent}" text-anchor="middle">${esc(chipText)}</text>`);
  }
  if (layout === 'column') {
    parts.push(`<text x="44" y="273" font-family="${SANS}" font-size="20" letter-spacing="6" font-weight="700" fill="${onAccent}" transform="rotate(90 44 273)">MÉTODO SIM</text>`);
  }
  if (layout === 'split') {
    const cardW = 44 + chipText.length * 16;
    const cardX = W - 40 - cardW;
    parts.push(`<rect x="${cardX}" y="540" width="${cardW}" height="86" fill="none" stroke="${onAccent}" stroke-width="2.5" opacity="0.9"/>`);
    parts.push(`<text x="${cardX + 22}" y="596" font-family="${MONO}" font-size="26" font-weight="700" fill="${onAccent}">${esc(chipText)}</text>`);
  }
  return parts.join('');
}

const METRICS = {
  full: { titleX: 80, titleSize: 72, maxChars: 26, titleY: 300, subSize: 26, subClamp: 560 },
  column: { titleX: 380, titleSize: 62, maxChars: 22, titleY: 330, subSize: 25, subClamp: 560 },
  band: { titleX: 80, titleSize: 62, maxChars: 26, titleY: 320, subSize: 25, subClamp: 500 },
  wash: { titleX: 80, titleSize: 70, maxChars: 26, titleY: 330, subSize: 26, subClamp: 560 },
  split: { titleX: 80, titleSize: 54, maxChars: 22, titleY: 330, subSize: 24, subClamp: 560 },
  frame: { titleX: 110, titleSize: 68, maxChars: 26, titleY: 330, subSize: 26, subClamp: 560 },
};

function buildSvg(cover, idx) {
  const acc = ACCENTS[cover.accent];
  const { main, light, dark, onAccent } = acc;
  const m = METRICS[cover.layout];

  const titleSize = m.titleSize;
  const maxChars = m.maxChars;
  const lines = wrapPhrase(cover.title, maxChars);
  const lineHeight = Math.round(titleSize * 1.08);

  const isAccentBg = cover.layout === 'full';
  const titleX = m.titleX;
  const startY = m.titleY;
  const subY = Math.min(startY + lines.length * lineHeight + 46, m.subClamp);

  const tspans = lines
    .map((line, i) => `<tspan x="${titleX}" y="${startY + i * lineHeight}">${esc(line)}</tspan>`)
    .join('');

  const titleFill = isAccentBg ? PALETTE.white : PALETTE.white;
  const badgeFill = isAccentBg ? PALETTE.white : main;
  const subFill = isAccentBg ? PALETTE.gray : PALETTE.gray;
  const badgeX = cover.layout === 'column' ? 380 : cover.layout === 'frame' ? 110 : 80;

  const isColumn = cover.layout === 'column';
  const chipW = isColumn ? 30 + cover.chip.length * 12 : 70 + cover.chip.length * 13;
  const chipX = cover.layout === 'column' ? 36 : cover.layout === 'frame' ? 110 : 80;
  const chipY = cover.layout === 'band' ? 588 : 614;
  const chipBorder = cover.layout === 'band' || cover.layout === 'column' ? onAccent : main;
  const chipFont = isColumn ? 20 : 24;

  const logoScale = 210 / 1315.2;
  const logoW = 1315.2 * logoScale;
  const logoX = W - 40 - logoW;
  const logoOpacity = isAccentBg ? 0.75 : 0.6;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${buildBackground(cover.layout, acc)}
  ${buildLayoutExtras(cover.layout, acc, cover.chip)}
  <text x="${badgeX}" y="112" font-family="${SANS}" font-size="21" letter-spacing="7" font-weight="700" fill="${badgeFill}">${esc(cover.badge)}</text>
  <line x1="${badgeX}" y1="132" x2="${badgeX + 200}" y2="132" stroke="${badgeFill}" stroke-width="3" opacity="0.9"/>
  <text font-family="${SANS}" font-size="${titleSize}" font-weight="800" fill="${titleFill}">${tspans}</text>
  <text x="${titleX}" y="${subY}" font-family="${SANS}" font-size="${m.subSize}" font-weight="500" fill="${subFill}" opacity="0.92">${esc(cover.subtitle)}</text>
  ${cover.layout !== 'band' && cover.layout !== 'split' ? `
  <rect x="${chipX}" y="${chipY}" width="${chipW}" height="56" fill="none" stroke="${chipBorder}" stroke-width="2"/>
  <line x1="${chipX}" y1="${chipY}" x2="${chipX + 12}" y2="${chipY}" stroke="${chipBorder}" stroke-width="4"/>
  <line x1="${chipX}" y1="${chipY + 56}" x2="${chipX + 12}" y2="${chipY + 56}" stroke="${chipBorder}" stroke-width="4"/>
  <text x="${chipX + 18}" y="${chipY + 37}" font-family="${MONO}" font-size="${chipFont}" font-weight="700" fill="${chipBorder}">${esc(cover.chip)}</text>` : ''}
  <g transform="translate(${logoX}, 58) scale(${logoScale})" fill="#FFFFFF" opacity="${logoOpacity}">
    ${CORTECLOUD_INNER}
  </g>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

(async () => {
  let ok = 0;
  for (let i = 0; i < covers.length; i++) {
    const svg = buildSvg(covers[i], i);
    const out = resolve(outDir, `${covers[i].slug}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(out);
    const meta = await sharp(out).metadata();
    const sizeKb = Math.round(statSync(out).size / 1024);
    if (!existsSync(out) || meta.width !== W || meta.height !== H) {
      throw new Error(`Falha ao gerar ${covers[i].slug}`);
    }
    ok++;
    console.log(`${covers[i].slug}.webp -> ${meta.width}x${meta.height} (${sizeKb}KB) [${covers[i].layout}/${covers[i].accent}]`);
  }
  console.log(`\n[ok] ${ok}/${covers.length} capas geradas em public/Mini Sites/.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});