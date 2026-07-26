# NUTAL — web sajt

Sajt tvornice boja i lakova NUTAL d.o.o. Vitez.
Izvor istine za sve odluke: `NUTAL-Dizajn-Brief.md`.

## Stack
- **Next.js (App Router, TypeScript)** — statički export (`output: "export"`)
- **Hosting: Cloudflare Pages** — git push → automatski deploy; redirect / → /bs kroz `public/_redirects`
- **CSS Modules + dizajn tokeni** u `src/app/globals.css` (mapirani 1:1 iz briefa §4)
- **Fontovi:** self-hostani kroz `@fontsource` (Playfair Display, Inter, JetBrains Mono)
- **Podaci:** `src/data/products.json` — seed izvučen iz master kataloga; sedmica 2-3 prespaja se na CMS kroz `src/lib/content/`

## Struktura
```
src/
├── app/
│   ├── globals.css        # dizajn tokeni — jedino mjesto sa HEX vrijednostima
│   ├── layout.tsx         # fontovi, globalni metadata
│   ├── page.tsx           # / → redirect na /bs
│   └── [lang]/            # i18n-ready rute (/bs sada, /en kasnije)
│       ├── layout.tsx     # validacija jezika
│       └── page.tsx       # privremena stranica (sedmica 1)
├── lib/
│   ├── i18n.ts            # lista jezika — EN se dodaje ovdje
│   └── content/
│       └── products.ts    # sloj sadržaja — stranice čitaju SAMO odavde
├── data/
│   └── products.json      # 140 proizvoda (Web=DA iz kataloga v5)
scripts/
└── extract_katalog.py     # xlsx → products.json (jednokratni seed)
```

## Komande
```bash
npm install        # jednom, poslije kloniranja
npm run dev        # lokalni razvoj → http://localhost:3000
npm run build      # produkcijski build (Vercel ovo radi sam)
```

## Napomena o podacima
Katalog sadrži 140 redova Web=DA (brief kaže 139) — postoje dva reda
"RAZRJEĐIVAČ ZA BRZOSUŠIVU BOJU" (jedan sa `*`). Otvoreno pitanje za klijenta;
do odluke oba ostaju u seedu.
