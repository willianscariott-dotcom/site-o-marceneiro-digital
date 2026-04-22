import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP_PATH = join(__dirname, '..', 'dist', 'sitemap-0.xml');
const API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

function loadCredentials() {
  const credPath = join(__dirname, '..', 'google-credentials.json');
  if (!existsSync(credPath)) {
    throw new Error(`Credenciais não encontradas em: ${credPath}`);
  }
  return JSON.parse(readFileSync(credPath, 'utf-8'));
}

function extractUrlsFromSitemap(xmlContent) {
  const urls = [];

  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
  let blockMatch;
  while ((blockMatch = urlBlockRegex.exec(xmlContent)) !== null) {
    const urlBlock = blockMatch[1];
    const locMatch = urlBlock.match(/<loc>([^<]+)<\/loc>/);
    if (locMatch) {
      urls.push(locMatch[1]);
    }
  }

  return urls;
}

function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const jwtToken = jwt.sign(payload, credentials.private_key, { algorithm: 'RS256' });

  return fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtToken
    })
  }).then(res => res.json());
}

async function publishUrl(accessToken, url) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED'
    })
  });

  return response.json();
}

async function main() {
  console.log('\n🚀 Iniciando indexação acelerada...\n');

  if (!existsSync(SITEMAP_PATH)) {
    console.error('❌ Sitemap não encontrado. Execute o build primeiro: npm run build');
    process.exit(1);
  }

  const sitemapContent = readFileSync(SITEMAP_PATH, 'utf-8');
  const urls = extractUrlsFromSitemap(sitemapContent);

  console.log(`📋 Encontradas ${urls.length} URLs para indexar\n`);

  const credentials = loadCredentials();
  console.log('🔐 Autenticando com Service Account...\n');

  const tokenData = await getAccessToken(credentials);
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    console.error('❌ Erro ao obter access_token:', tokenData);
    process.exit(1);
  }

  console.log('✅ Autenticado com sucesso!\n');

  let successCount = 0;
  let errorCount = 0;

  for (const url of urls) {
    try {
      const result = await publishUrl(accessToken, url);
      console.log(`✅ URL enviada: ${url}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Erro ao enviar ${url}: ${error.message}`);
      errorCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Sucessos: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`\n✨ Indexação concluída!\n`);
}

main().catch(console.error);