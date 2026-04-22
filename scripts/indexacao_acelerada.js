import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const SITEMAP_PATH = join(__dirname, '..', 'dist', 'sitemap-index.xml');
const API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

function loadCredentials() {
  const credPath = join(__dirname, '..', 'google-credentials.json');
  if (!existsSync(credPath)) {
    throw new Error(`Credenciais não encontradas em: ${credPath}`);
  }
  return JSON.parse(readFileSync(credPath, 'utf-8'));
}

function extractUrlsFromSitemap(xmlContent) {
  const urlRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function publishUrl(auth, url) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: auth.access_token,
    refresh_token: auth.refresh_token,
    expiry_date: auth.expiry_date
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${oauth2Client.credentials.access_token}`
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
  const auth = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uri
  );

  auth.setCredentials({
    refresh_token: credentials.refresh_token
  });

  const { data: tokenData } = await google.oauth2('v2').tokenInfo({
    access_token: auth.credentials.access_token
  });

  let successCount = 0;
  let errorCount = 0;

  for (const url of urls) {
    try {
      await publishUrl(auth, url);
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