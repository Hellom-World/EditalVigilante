# Edital Vigilante — Web App

Dashboard de contratação pública municipal. Construído com Next.js 16 + Tailwind CSS 4.

---

## Stack

- **Next.js 16** (App Router, SSG)
- **Tailwind CSS 4**
- **TypeScript**
- **next-themes** — dark mode

---

## Estrutura

```
src/
├── app/
│   ├── layout.tsx              — layout global + providers
│   ├── page.tsx                — landing page com cards de municípios
│   ├── globals.css
│   └── [municipio]/
│       └── page.tsx            — dashboard dinâmico (/arouca, /porto, …)
├── components/
│   ├── Dashboard.tsx           — orquestrador do dashboard
│   ├── SummaryCards.tsx        — cards de totais
│   ├── CategoryCard.tsx        — card expansível por categoria
│   ├── EmpresasGrid.tsx        — ranking de empresas
│   ├── YearDropdown.tsx        — dropdown custom de ano
│   ├── ThemeToggle.tsx         — botão dark/light mode
│   └── Providers.tsx           — ThemeProvider
├── lib/
│   ├── formatters.ts           — formatação de moeda e datas
│   ├── empresas.ts             — agregação de empresas
│   └── municipios.ts           — registo de municípios disponíveis
└── types/
    └── contracts.ts            — tipos TypeScript dos dados
```

---

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
```

Os dados são lidos de `public/arouca.json`. Para actualizar:

```bash
cp ../data/contratos_base_arouca.json public/arouca.json
```

---

## Adicionar um município

1. Gerar os dados com os scrapers (ver `../scrapers/README.md`)
2. Copiar o JSON para `public/<slug>.json`
3. Em `src/lib/municipios.ts`, alterar `ativo: false` para `ativo: true`

---

## Deploy (Vercel)

```bash
npx vercel        # primeiro deploy
npx vercel --prod # deploys seguintes
```
