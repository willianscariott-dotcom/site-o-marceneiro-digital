# Padrão de Capas do Blog Técnico — O Marceneiro Digital

Documento de referência para **criação e manutenção das capas visuais** dos artigos do Blog Técnico (`/blog/[slug]`). Leia este documento antes de gerar ou alterar qualquer capa.

---

## 1. Como funcionam as capas

As capas são **SVG renderizados para WebP** via `sharp`, gerados por script Node. Não são imagens feitas à mão — cada capa é uma composição determinística de **layout + paleta + badge + chip + logo**.

| Item | Valor |
|---|---|
| Tamanho | 1280×720 (16:9, `aspect-video`) |
| Formato | WebP, quality 88 |
| Pasta de produção | `public/Mini Sites/<slug>.webp` |
| Script gerador | `scripts/gerar-capas-artigos.mjs` |
| Logo (canto sup. direito) | CorteCloud (`public/CorteCloud.svg`, branco, ~210px) |

## 2. Comando para gerar

```sh
node scripts/gerar-capas-artigos.mjs
```

Gera (e sobrescreve) as capas diretamente em `public/Mini Sites/`. O script é **idempotente** — o resultado é determinístico a partir do array `covers`. Para validar mudanças sem publicar, copie o script/array para um rascunho local ou gere e confira antes de rodar o build.

## 3. Paleta oficial (brand book Pomelli)

| Papel | Cor | Uso |
|---|---|---|
| Base | `#100C0B` | Fundo escuro (nunca preto puro) |
| Camada | `#1A1816` | Gradientes/áreas secundárias |
| Branco | `#FFFFFF` | Títulos |
| Cinza | `#F3F3F3` | Subtítulos |
| Âmbar | `#984E00` | Acento A (`accent: 'amber'`) |
| Azul | `#3BB0FB` | Acento B (`accent: 'blue'`) |
| Teal escuro | `#084B42` | Acento C (`accent: 'teal'`) |
| Teal claro | `#7DCDC1` | Acento D (`accent: 'tealLight'`) |
| Tinta escura | `#0B1412` | Texto sobre acentos claros (azul/teal claro) |

**Regra de contraste:** texto branco sobre âmbar/teal escuro; texto tinta escura sobre azul `#3BB0FB` e teal claro `#7DCDC1`.

Acentos combinados: `amberblue` (diagonal âmbar→azul) e `tealblue` (diagonal teal→azul) — usados apenas no layout `split`.

## 4. Layouts disponíveis (campo `layout`)

| Layout | Descrição | Título |
|---|---|---|
| `full` | Fundo inteiro em cor de acento (gradiente escuro→cor) | 72px, 26 chars/linha |
| `column` | Coluna colorida à esquerda (300px) com rótulo vertical "MÉTODO SIM" | 62px, 22 chars/linha, x=380 |
| `band` | Faixa horizontal colorida inferior (y=540–720) com chip dentro | 62px, 26 chars/linha |
| `wash` | Lavada radial de cor no canto superior direito sobre fundo escuro | 70px, 26 chars/linha |
| `split` | Diagonal: cor no canto inferior direito, área escura ampla à esquerda | 54px, 22 chars/linha |
| `frame` | Cantoneiras grossas (8px) nas 4 bordas + glow no canto | 68px, 26 chars/linha |

Métricas completas no objeto `METRICS` do script (posição x, tamanho, limite de caracteres por linha, clamp do subtítulo). **Não altere as métricas** sem validar contra os limites da seção 7.

### Estrutura da imagem (ordem de camadas)
1. Fundo (gradiente/lavada/banda/diagonal conforme layout)
2. Elementos do layout (cantoneiras, rótulo da coluna, card do split)
3. Badge de categoria (topo, com linha de apoio de 200px)
4. Título (máx. 2 linhas, negrito, alinhado à esquerda)
5. Subtítulo (abaixo do título, sempre dentro do canvas)
6. Chip técnico (canto inferior esquerdo — ou na banda/card, conforme layout)
7. Logo CorteCloud (topo direito, opacidade 0.6–0.75)

## 5. Badges de categoria (campo `badge`)

Textos padrão, em caixa alta, com `&` escapado no SVG:
`CUSTOS & ORÇAMENTO` · `PLATAFORMA` · `FERRAGENS` · `ESTRUTURA & VÃOS` · `MATERIAIS` · `INSTALAÇÃO`

Novas categorias são permitidas, mas **mantenha o padrão**: 2 palavras, caixa alta, sem pontuação final.

## 6. Chips técnicos (campo `chip`)

Detalhe de engenharia único por artigo, em Courier New (mono). Regras obrigatórias:

- **Unidades em minúsculo:** `30mm`, `45cm`, `15mm` (nunca `30MM`, `45CM`)
- **"mil" em minúsculo:** `R$ 18 mil → R$ 10 mil`
- Caixa alta para o restante: `30mm FOLGA`, `COLA PUR`, `SKETCHUP + HELLOMOB`
- Tamanho automático do card via comprimento do texto (script calcula largura)

Exemplos em uso: `IEC 85%` · `CPF x CNPJ` · `COLA PUR` · `1–3 CHAPAS` · `R$ 18 mil → R$ 10 mil` · `30mm FOLGA` · `MDF ULTRA` · `0 ADIVINHAÇÃO` · `ESPELHAMENTO` · `PLINTO` · `SKETCHUP + HELLOMOB` · `DESCONTO ESQUADRIA` · `RM-221` · `15mm → 45cm` · `MULTI-CENTRAL`.

## 7. Limites de segurança (validação de overflow)

Regras aplicadas no código — **não quebre**:
- Nenhum texto pode ultrapassar `1280 - 20px` no eixo X.
- Layout `split`: título e subtítulo devem terminar antes da diagonal (`x = 800 - (720 - y) / 7.2`); card do chip em `x ≥ 725`.
- Layout `column`: chip deve caber dentro da coluna (x ≤ 300); título começa em x=380.
- Layout `band`: subtítulo clampado em y=500 (a banda começa em 540); chip centralizado na banda.
- Card do chip `split`: `cardX = 1280 - 40 - cardW`, `cardW = 44 + chars × 16`.

Verificação automatizada (linha de comando) após gerar:

```sh
# (script de checagem reproduz os limites da seção 7)
```

## 8. Fluxo de publicação de uma capa

1. Adicionar entrada no array `covers` do script (slug, título, subtítulo, badge, chip, layout, accent).
2. Gerar: `node scripts/gerar-capas-artigos.mjs` (escreve em `public/Mini Sites/`).
3. Conferir visualmente as capas geradas e, se necessário, ajustar o array e regerar.
4. `npm run build` e deploy (Vercel, automático no push).

## 9. Estrutura de uma entrada do array `covers`

```js
{
  slug: 'meu-novo-artigo',              // = nome do arquivo .md e da URL /blog/meu-novo-artigo
  title: 'Título exibido na capa',      // texto visível (pode diferir do title do artigo)
  subtitle: 'Subtítulo curto da capa',  // 1 linha, ~40 chars máx.
  badge: 'PLATAFORMA',                  // categoria (seção 5)
  chip: '30mm FOLGA',                   // spec técnica (seção 6)
  layout: 'frame',                      // full | column | band | wash | split | frame
  accent: 'blue',                       // amber | blue | teal | tealLight | amberblue | tealblue
}
```

## 10. Boas práticas

- **Cada capa única:** nunca repita layout+accent em sequência; distribua para evitar duas capas iguais na listagem `/blog`.
- Título da capa: máximo ~42 caracteres (2 linhas de 22–26 chars conforme layout).
- Não use círculos (identidade "engineering blueprint"); use retângulos e linhas.
- Não adicione textos técnicos decorativos (cotas, "SPEC", coordenadas) — foram removidos a pedido do cliente.
- Sempre regenere TODAS as capas (script é idempotente), nunca edite o WebP manualmente.