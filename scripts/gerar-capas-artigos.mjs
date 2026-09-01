import sharp from 'sharp';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/Mini Sites');

const W = 1280;
const H = 720;

const covers = [
  { slug: 'corte-cloud-mais-caro-que-marcenaria', title: 'Corte Cloud ficou mais caro que marcenaria?', subtitle: 'Onde está o erro e como baratear' },
  { slug: 'pessoa-fisica-cpf-pode-comprar-no-corte-cloud', title: 'Pessoa Física pode comprar no Corte Cloud?', subtitle: 'CPF x CNPJ na Central de Corte' },
  { slug: 'ferragens-parafusos-fita-inclusos-corte-cloud', title: 'Ferragens e fita de borda vêm inclusos?', subtitle: 'O que a Central de Corte entrega' },
  { slug: 'sobras-de-mdf-corte-cloud-aproveitamento', title: 'Sobras de MDF no Corte Cloud', subtitle: 'Como eliminar o lixo e economizar chapas' },
  { slug: 'custo-loja-vs-custo-central-cozinha-planejada', title: 'Loja x Central: cozinha de R$ 18 mil', subtitle: 'Para onde vai o dinheiro e como economizar' },
  { slug: 'paredes-fora-de-esquadro-folgas-moveis', title: 'Paredes fora de esquadro e prumo', subtitle: 'Folgas para o móvel não travar' },
  { slug: 'mdf-comum-vs-mdf-ultra-verde-umidade', title: 'MDF Comum x MDF Ultra (Verde)', subtitle: 'O mito da fita de borda' },
  { slug: 'contratar-montador-profissional-corte-cloud', title: 'Contratar só o montador dá certo?', subtitle: 'Projeto do Corte Cloud sem abandono de obra' },
  { slug: 'pecas-com-erro-espelhamento-corte-cloud', title: 'Peça veio errada ou espelhada?', subtitle: 'De quem é a culpa e como resolver' },
  { slug: 'rodapes-tamponamento-roda-teto-areas-molhadas', title: 'Rodapés e Roda-teto: áreas molhadas', subtitle: 'Plinto de pedra, selante PU e iluminação' },
  { slug: 'erro-de-colisao-e-usinagem-corte-cloud', title: 'Erro de colisão e travamento', subtitle: 'Por que acontece e como evitar no Corte Cloud' },
  { slug: 'portas-de-vidro-reflecta-e-perfil-aluminio', title: 'Portas de Vidro e Perfil de Alumínio', subtitle: 'Reflecta no Corte Cloud: como fazer' },
  { slug: 'desconto-puxador-perfil-cava-aluminio', title: 'Desconto de Puxador Perfil', subtitle: 'O erro que custa uma chapa de MDF inteira' },
  { slug: 'espessura-mdf-15mm-vs-18mm-vaos', title: 'MDF 15mm x 18mm x 25mm', subtitle: 'Vãos máximos para o armário não envergar' },
  { slug: 'site-corte-cloud-vs-plugin-hellomob-sketchup', title: 'Site do Corte Cloud x Hellomob', subtitle: 'A diferença real de projetar no SketchUp' },
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

function buildSvg({ title, subtitle }) {
  const fontSize = 64;
  const maxChars = 26;
  const lines = wrapPhrase(title, maxChars);
  const lineHeight = Math.round(fontSize * 1.14);
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
  <text x="640" y="236" font-family="Segoe UI, Arial, sans-serif" font-size="22" letter-spacing="8" fill="#FBB03B" text-anchor="middle" font-weight="600">BLOG TÉCNICO · MÉTODO SIM</text>
  <text x="640" y="0" font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#FFFFFF" text-anchor="middle">${tspans}</text>
  <text x="640" y="${startY + lines.length * lineHeight + 58}" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#C8CDD8" text-anchor="middle" font-weight="500">${subtitle}</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

(async () => {
  for (const cover of covers) {
    const svg = buildSvg(cover);
    const out = resolve(outDir, `${cover.slug}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(out);
    const meta = await sharp(out).metadata();
    const sizeKb = Math.round(statSync(out).size / 1024);
    console.log(`${cover.slug}.webp -> ${meta.width}x${meta.height} ok (${sizeKb}KB)`);
    if (!existsSync(out) || meta.width !== W || meta.height !== H) {
      throw new Error(`Falha ao gerar ${cover.slug}`);
    }
  }
  console.log(`Todas as ${covers.length} capas geradas em public/Mini Sites/.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});