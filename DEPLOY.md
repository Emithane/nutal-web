# NUTAL web — deploy

**Živi sajt (Cloudflare Workers):** https://nutal-web.kenan-hajdarevic.workers.dev/bs

**Slanje paketa:** ZIP u `1-download/` u radnom folderu → dupli klik na `posalji.command` (skripta raspakuje, ogleda u `nutal-web`, commit + push). Cloudflare gradi ~2 min.

---

# Sedmica 1 — od ZIP-a do živog linka na Cloudflareu (korak po korak)

Cilj dana: vidjeti privremeni URL koji radi. Ništa više.
Vrijeme: ~20 minuta. Preduslovi: GitHub nalog + Cloudflare nalog (besplatan, dash.cloudflare.com).

## 1. Raspakuj projekat
Raspakuj `nutal-web.zip` u folder gdje držiš projekte, npr. `Documents/nutal-web`.

## 2. Napravi GitHub repozitorij
1. github.com → dugme **New**
2. Repository name: `nutal-web`
3. Ostavi **Private**
4. NE dodavaj README ni .gitignore (već ih imamo) → **Create repository**

## 3. Pošalji kod na GitHub
Otvori terminal U FOLDERU projekta (Windows: desni klik → "Open in Terminal";
Mac: povuci folder na Terminal ikonu) i kucaj redom:

```bash
git init
git add .
git commit -m "Sedmica 1: temelji projekta"
git branch -M main
git remote add origin https://github.com/TVOJ-USERNAME/nutal-web.git
git push -u origin main
```

Zamijeni `TVOJ-USERNAME` svojim GitHub imenom (tačna linija piše i na GitHub
stranici iz koraka 2). Ako te pita za login — prati upute na ekranu.

## 4. Deploy na Cloudflare Pages
1. dash.cloudflare.com → u lijevom meniju **Workers & Pages** → **Create**
2. Izaberi karticu **Pages** → **Connect to Git**
3. Poveži GitHub nalog (jednokratna dozvola) → izaberi repo `nutal-web`
4. Podešavanja builda:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. **Save and Deploy** → sačekaj ~2 minute
6. Dobiješ link tipa `nutal-web.pages.dev`

**Otvori link. Ako vidiš zeleni logo i "Sabrati prave sastojke." — sedmica 1 je gotova.**
(Adresa `/` te sama prebaci na `/bs` — to radi fajl `public/_redirects`.)

## Šta si upravo naučio (deploy ciklus)
Od sada, SVAKA promjena ide ovako i to je cijela magija:
```bash
git add .
git commit -m "opis šta si promijenio"
git push
```
Cloudflare vidi push i sam objavi novu verziju za ~2 min. Nema FTP-a, nema ručnog uploada.

## Kasnije (ne danas)
- **Domena:** kad kupiš nutal.ba, u Pages projektu → Custom domains → dodaš je.
- **Kontakt forma (sedmica 4):** ide kroz Pages Functions — jedan fajl u projektu, bez servera.

## Ako nešto zapne
Kopiraj tačnu poruku greške u naš chat — ništa od ovoga ne može trajno pokvariti,
najgore što se desi je da obrišemo i krenemo ispočetka (5 min).
