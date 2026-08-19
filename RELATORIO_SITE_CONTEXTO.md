# RELATÓRIO DE CONTEXTO DO SITE — O MARCENEIRO DIGITAL

> **Objetivo:** Fornecer contexto completo para uma LLM externa gerar artigos super nichados sobre house flipping nas regiões de SP, RJ e POA, alinhados à marca, ao tom de voz e à arquitetura editorial existente.

---

## 1. IDENTIDADE DA MARCA

| Campo | Valor |
|---|---|
| **Nome** | O Marceneiro Digital |
| **Responsável** | Willian Scariott |
| **Cargo** | Marceneiro Digital / Projetista Especialista em Cortecloud e Hellomob |
| **Especialidade** | Projeto técnico para móveis planejados com compra direta de fábrica via Marcenaria 4.0 |
| **Marca registrada** | Método SIM (Sistema Inteligente de Marcenaria) |
| **URL** | https://www.omarceneirodigital.com.br |
| **WhatsApp** | +55 51 99653-2525 |
| **E-mail** | previstiplanejados@gmail.com |
| **Instagram** | @marceneirodigital.oficial |
| **YouTube** | @marceneirodigital.oficial |

---

## 2. TOM DE VOZ DA MARCA

### Características centrais
- **Técnico mas acessível:** O texto nunca é elitista. Explica jargão industrial (IEC, nesting, D-to-M, cola PUR) de forma direta e didática.
- **Autoridade com vivência:** Willian se posiciona como quem "já montou e já viu dar errado". Usa frases como "cansei de ver projetos lindos no papel que não cabiam na realidade da obra".
- **Direto e sem enrolação:** Tom consultivo, sem vendedorices exageradas. O CTA principal é sempre o WhatsApp.
- **Transparência de preço:** Sempre cita economia real (40% a 60%) com base concreta, nunca promete "grátis" ou "o mais barato".
- **Foco em execução, não em design:** A marca se diferencia não pelo visual bonito, mas pela garantia de que o que foi projetado será executado sem erros na fábrica.
- **Inglês técnico pontual:** Usa termos como "D-to-M" (Design-to-Manufacturing), "ready-to-saw", "raio-x" (auditoria).

### Frases recorrentes da marca
- "Móveis Planejados de Alto Padrão com Preço Direto de Fábrica"
- "Projeto à prova de erros"
- "Economize até 60%"
- "Plano de corte otimizado"
- "Índice de Eficiência de Chapa (IEC)"
- "Visão de quem monta"
- "Zero surpresas no orçamento"
- "Método SIM — Sistema Inteligente de Marcenaria"
- "Compra direta e transparente"
- "Sem lucros embutidos de lojas e marcenarias"

### Vocabulário técnico recorrente
Cortecloud, Hellomob, SketchUp, CNC, MDF, nesting, IEC (Índice de Eficiência de Chapa), cola PUR, Minifix, VB (Vidraçaria), corrediças ocultas com sincronização, D-to-M, usinagem, fita de borda Rehau, Dossiê Técnico Executivo, raio-x (auditoria técnica).

### Público-alvo primário
- Pessoa física que deseja móveis planejados para casa própria e quer economizar em relação a lojas tradicionais.
- Marcenários e montadores que buscam terceirizar o projeto técnico.

### Público-alvo secundário (FOCO DOS ARTIGOS)
- **Investidores de house flipping** em São Paulo (SP), Rio de Janeiro (RJ) e Porto Alegre (POA).
- Investidores que reformam imóveis para revenda e precisam mobiliar com qualidade, velocidade e baixo custo.

---

## 3. ESTRUTURA TÉCNICA DO SITE

| Item | Detalhe |
|---|---|
| **Framework** | Astro 6.1.5 (SSG — Static Site Generation) |
| **Estilo** | Tailwind CSS 4.2.2 |
| **Idioma** | pt-BR |
| **Tema visual** | Dark mode (fundo #0B0C10), acentos em dourado (#FBB03B) e azul (#004E98) |
| **Fonte** | Inter (Google Fonts) |
| **Hospedagem** | Vercel |
| **Sitemap** | Gerado automaticamente via @astrojs/sitemap (/sitemap-index.xml) |
| **Analytics** | Google Analytics 4 (G-0CL6TV9225 e G-QQFCVXF57B) + Microsoft Clarity |
| **Indexação** | Script de Indexação Acelerada via Google Indexing API (scripts/indexacao_acelerada.js) |

### Mapa de páginas

```
/                              → Home (index.astro)
/#como-funciona                → Seção "Como Funciona" (FeaturesBento + Journey)
/blog                          → Listagem de artigos
/blog/[slug]                   → Artigo individual (25 artigos)
/estudos-de-caso               → Listagem de estudos de caso
/estudos-de-caso/[slug]        → Estudo de caso individual (2 estudos)
/estudos-de-caso/quarto-arquiteta-cortecloud → Estudo de caso avulso
/guia-de-medicao               → Guia completo de medição (6 passos)
/faq                           → Perguntas frequentes (17 perguntas)
/politica-de-privacidade       → Política de privacidade
/termos-de-uso                 → Termos de uso
```

---

## 4. CONTEÚDO DA HOME — TEXTOS PRINCIPAIS

### Hero (Título principal)
> **Móveis Planejados de Alto Padrão com Preço Direto de Fábrica.**

### Subtítulo do Hero
> Sou Willian Scariott, projetista, montador há mais de 6 anos e especialista em Cortecloud. Eu crio o projeto técnico para você comprar móveis direto da fábrica, garantindo:
> - **Otimização máxima do seu MDF** (plano de corte inteligente).
> - **Zero lucros embutidos** de lojas e marcenarias.
> - **Execução e montagem** sem erros.

### CTAs principais
- "Falar sobre o Meu Projeto" → WhatsApp
- "Como funciona a economia" → âncora para #como-funciona

### TrustedBy
> Produção Automatizada: Seu projeto conectado diretamente com as máquinas das maiores fábricas do Brasil: Cortecloud, Hellomob, SketchUp.

### Seção "Como Funciona" (FeaturesBento)
**Título:** "Como o Método SIM garante a qualidade do seu móvel."

Cards:
1. **A Visão de quem Monta** — "Softwares não montam móveis, pessoas montam. Com minha experiência prática, seu projeto já é feito pensando no encaixe perfeito no local, evitando gambiarras na hora da instalação."
2. **Compra Direta e Transparente** — "Seu projeto vai direto para o maquinário das fábricas parceiras (via Cortecloud). Você paga apenas pelo material e pelo serviço de corte, sem intermediários."
3. **Até 60% mais barato** — "Ao eliminar a loja tradicional e as comissões de vendedores, você investe apenas no material real e no meu planejamento, garantindo um móvel premium por uma fração do preço."

### Seção "Jornada da Economia" (Journey)
**Título:** "A Jornada da Economia: Como funciona na prática?"

4 passos:
1. **O Alinhamento** — Cliente entra em contato, Willian analisa as medidas e complexidade.
2. **O Planejamento 3D** — Projeto visual em 3D + detalhamento executivo oculto. Gera lista exata de materiais.
3. **A Compra Direta** — Plano de corte otimizado vai direto para a fábrica via Cortecloud. Cliente paga valor real do material.
4. **A Montagem** — Material chega pronto. Entrega do Dossiê de Execução + suporte total ao montador.

### Seção "Métricas" (Metrics)
**Título:** "Planejamento que elimina o desperdício."

- **85%** — Mais de 85% de aproveitamento de cada chapa de MDF.
- **0%** — 0% de surpresas no orçamento de materiais.
- **60%** — Até 60% de economia real em relação às lojas.

CTA: "Não compre móveis no escuro. Receba o projeto técnico completo e a lista exata para comprar direto da fábrica com segurança."

### Depoimentos (Testimonials)
- **Ricardo Colleti:** "Economizei em torno de 65% perto de outros orçamentos. Tudo muito rápido e prático."
- **Daniel Mendes:** "O detalhamento facilita demais o trabalho do montador... economizei mais de 40%."
- **Carmém Wander:** "O próprio montador elogiou o projeto. Tivemos paredes fora de esquadro, mas eles conseguem adaptar."

### CTA Final
> **Seu ambiente merece mais que um simples desenho.**
> Fale diretamente comigo no WhatsApp e descubra como a Marcenaria Digital e um projeto focado na fabricação inteligente podem transformar sua casa com economia e perfeição.

---

## 5. ESTUDO DE CASO — ARTIGO EXISTENTE SOBRE HOUSE FLIPPING

O site já possui **um artigo** diretamente sobre house flipping:

### `house-flipping-marcenaria-inteligente.md`
- **Título:** Como Aumentar o Lucro no House Flipping com Marcenaria Inteligente
- **Data:** 2026-07-19
- **Tags:** house flipping, investimento imobiliário, lucro na reforma, método SIM, cortecloud, móveis planejados
- **Resumo:** Apresenta como o Método SIM + Cortecloud pode aumentar o lucro em operações de house flipping. Destaca redução de 40% no custo de marcenaria e entrega 30-45 dias mais rápida comparado ao modelo tradicional, permitindo colocar imóveis à venda antes.

> **Nota:** Este artigo já existe e aborda o tema de forma geral. Os novos artigos devem ser **mais nichados**, focando em regiões específicas (SP, RJ, POA) e em aspectos operacionais do house flipping.

---

## 6. MAPA DOS 25 ARTIGOS DO BLOG

### Artigos publicados (visíveis)
| # | Título | Data | Tema Principal |
|---|---|---|---|
| 1 | O que é a Marcenaria Digital (e como ela deixa seu móvel até 60% mais barato) | 2026-04-17 | Conceito de Marcenaria 4.0 |
| 2 | Marcenaria 4.0 vs. Tradicional | 2026-04-16 | Comparativo Marcenaria 4.0 vs tradicional (com vídeo) |
| 3 | Como Aumentar o Lucro no House Flipping com Marcenaria Inteligente | 2026-07-19 | **House flipping + Método SIM** |
| 4 | O Guia Definitivo da Marcenaria 4.0 e o Método SIM | 2026-04-19 | Guia completo de Marca. 4.0 |
| 5 | Detalhamento Técnico no LayOut (Aula 2) | 2026-04-19 | Tutorial LayOut (recuos, rodapé) |
| 6 | Cotas e Instruções no LayOut (Aula 3) | 2026-04-19 | Tutorial LayOut (ferragens) |
| 7 | Como preparar o SketchUp para LayOut (Aula 1) | 2026-04-19 | Tutorial SketchUp → LayOut |
| 8 | Cortecloud e usinagens avulsas | 2026-04-16 | Peças especiais no Cortecloud |

### Artigos ocultos (hidden: true)
| # | Título | Tema Principal |
|---|---|---|
| 9 | Projetista Cortecloud e Hellomob: Terceirização Inteligente | Papel do projetista |
| 10 | Plano de corte MDF online | Nesting e IEC no Cortecloud |
| 11 | Orçamento online para móveis planejados | Hellomob + orçamento preciso |
| 12 | O que é o Cortecloud e como funciona | Explicação da plataforma |
| 13 | Móveis planejados quarto pequeno | Soluções para quartos compactos |
| 14 | Móveis planejados escritório residencial | Home office + dimensionamento |
| 15 | Móveis planejados cozinha pequena preço | Custo-benefício cozinhas |
| 16 | Projeto cortecloud guarda-roupa | Tutorial guarda-roupa no Cortecloud |
| 17 | Cortecloud puxador cava | Limitações de usinagem de puxadores |
| 18 | Cortecloud painel ripado | Produção de painéis ripados |
| 19 | Cortecloud ou Promob | Comparativo de softwares |
| 20 | Cortecloud gabinetes de banheiro | MDF umidade + COLA PUR |
| 21 | Onde comprar móveis planejados pela internet | Comparativo 3 modelos de compra |
| 22 | Como integrar o Hellomob ao Cortecloud | Workflow de integração |
| 23 | Como usar o aplicativo Cortecloud | Review do app mobile |
| 24 | Eficiência do Cortecloud | Revisão manual do plano de corte |
| 25 | Dossiê de Montagem | Dossiê Técnico Executivo do Método SIM |

---

## 7. ESTUDOS DE CASO PUBLICADOS

### Closet Carina (Alphaville, SP)
- **Desafio:** Dois closets em 3,5m x 1,6m, porta piso-teto de 2,4m.
- **Solução:** Desempenos metálicos embutidos, rodapé de nivelamento separado, corrediças ocultas com sincronização.
- **IEC:** 89%
- **Investimento:** R$ 5.616,52 (material + corte e furação CNC)
- **Materiais:** 4 chapas MDF 6mm + 9 chapas MDF 18mm

### Cozinha da Angela (Novo Hamburgo, RS)
- **Desafio:** Apartamento compacto "Minha Casa, Minha Vida", tubulação de gás externa, múltiplos obstáculos.
- **Solução:** Projeto com precisão industrial no SketchUp, contorno da tubulação de gás, "passa prato" estratégico.
- **IEC:** 92%
- **Investimento:** R$ 9.540,00
- **Economia:** 47% (de R$ 18.000 → R$ 9.540)

---

## 8. OTIMIZAÇÃO PARA IAS (SEO, META TAGS, JSON-LD)

### 8.1 Arquivo `robots.txt` (proativamente aberto a IAs)
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://www.omarceneirodigital.com.br/sitemap-index.xml
```

> **Observação:** O site já permite explicitamente a leitura por bots de IA generativa (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).

### 8.2 Arquivo `llms.txt`
O site possui um `llms.txt` na raiz do `/public` com contexto estruturado para LLMs:
- Descrição da marca e do Método SIM
- Proposta de valor com dados técnicos (IEC 85+, economia 40-60%)
- Serviços e preços (Projeto a partir de R$ 420, Auditoria a partir de R$ 150)
- Público-alvo secundário mencionado explicitamente: **"Investidores de Real Estate e House Flipping"**
- Tags e entidades relacionadas

### 8.3 JSON-LD (Schema.org) — Implementações

#### Layout global (`Layout.astro`)
- `Organization` — Dados da empresa + redes sociais
- `Person` — Willian Scariott + knowsAbout detalhado
- `LocalBusiness` — Business local com aggregateRating (5 estrelas, 3 reviews)
- `Review` x3 — Ricardo Colleti, Daniel Mendes, Carmém Wander
- `Service` — "Projeto Técnico de Móveis Planejados"

#### Página de Blog (`blog/[slug].astro`)
- `TechArticle` + `Article` — Dupla marcação para cada artigo
- `VideoObject` — Para artigos com vídeo do YouTube

#### FAQ (`faq.astro`)
- `FAQPage` — 17 perguntas e respostas com `Question` + `Answer`

#### Guia de Medição (`guia-de-medicao.astro`)
- `HowTo` — 6 passos com `HowToStep` + `HowToTool`

#### Estudos de Caso (`estudos-de-caso/[slug].astro`)
- `Article` — Schema de artigo para cada estudo de caso

### 8.4 Meta Tags por Página
- **Título dinâmico** via props do Layout
- **Description dinâmica** via props do Layout
- **Open Graph** (og:type, og:url, og:title, og:description, og:image)
- **Twitter Cards** (summary_large_image)
- **Canonical URL** configurada
- **Robots** — index, follow
- **Google Analytics 4** — Dois IDs configurados
- **Microsoft Clarity** — Heatmaps e sessões

### 8.5 Indexação Acelerada
Script em `scripts/indexacao_acelerada.js` que:
1. Lê o `sitemap-0.xml` gerado no build
2. Autentica via Service Account (google-credentials.json)
3. Publica cada URL no Google Indexing API

---

## 9. DIRETRIZES PARA GERAÇÃO DE ARTIGOS NOVOS

### Formato esperado
- **Extensão:** Markdown (.md)
- **Localização:** `src/content/blog/`
- **Frontmatter obrigatório:** title, description, pubDate, author, tags
- **Frontmatter opcional:** video_id, video_title, video_description, heroImage, cover_image, seo_keywords, hidden

### Estrutura do artigo
1. **Título H1** (frontmatter title)
2. **Introdução** — 2-3 parágrafos contextualizando o problema
3. **Desenvolvimento** com H2 e H3
4. **Dados técnicos** — Sempre citar IEC, economia %, prazos, valores quando aplicável
5. **CTA final** — Link para WhatsApp com mensagem pré-definida

### Tom para artigos de house flipping
- Falar com o investidor como alguém que entende de **ROI, margem de lucro, velocidade de entrega, custo de reforma**.
- Citar regiões específicas (SP, RJ, POA) e suas peculiaridades de mercado imobiliário.
- Posicionar o Método SIM como ferramenta de **otimização de caixa** e **redução de prazo** na reforma.
- Nunca perder o foco técnico: sempre conectar house flipping com Cortecloud, IEC, economia de MDF.
- Usar dados reais dos estudos de caso (IEC 89%, 92%, economia 47%, investimentos em reais).

### Tags sugeridas para artigos de house flipping
`house flipping`, `investimento imobiliário`, `lucro na reforma`, `método SIM`, `cortecloud`, `móveis planejados`, `reforma inteligente`, `ROI reforma`, `[cidade]` (ex: `são paulo`, `rio de janeiro`, `porto alegre`)

### Zonas de cobertura geográfica
- **São Paulo (SP):** Alphaville, São Paulo capital, Grande SP. Mercado de alto padrão e apartamentos compactos.
- **Rio de Janeiro (RJ):** Zona Sul, Barra, Centro. Mercado de coberturas e apartamentos com vista.
- **Porto Alegre (POA):** Novo Hamburgo, Porto Alegre, Grande POA. Mercado de casas e MCMV.

---

## 10. ECOSSISTEMA DE FERRAMENTAS (Contexto para IA)

| Ferramenta | Função |
|---|---|
| **SketchUp** | Modelagem 3D do móvel |
| **Hellomob** | Plugin do SketchUp para parametrização técnica (furações, ferragens) |
| **Cortecloud** | Marketplace que conecta projetistas a centrais de serviços CNC |
| **LayOut** | Geração do Dossiê Técnico de Montagem (PDF com vistas explodidas) |
| **Método SIM** | Workflow completo: SketchUp → Hellomob → Cortecloud → Dossiê → Montagem |
| **IEC** | Índice de Eficiência de Chapa — % de aproveitamento do MDF |
| **Nesting** | Algoritmo de encaixe de peças na chapa para minimizar desperdício |
| **D-to-M** | Design-to-Manufacturing — fluxo do projeto direto para a fábrica |
| **Cola PUR** | Cola poliuretano para fitamento industrial, resistente à umidade |

---

*Relatório gerado automaticamente em 2026-08-19 para fins de contexto de LLM externa.*
