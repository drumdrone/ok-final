# okfinal.cz — Next.js migrace

Web pro **OK FINAL s.r.o.** (přesné soustružení a svařování kovů),
migrace z WordPress/Elementor na Next.js 15 + Convex.

## Rychlý start

```bash
cp .env.example .env.local          # doplnit klíče (viz níže)
npm install
npm run dev
```

Otevře se na `http://localhost:3000`.

Doplň nejdřív `ADMIN_PASSWORD` a `ADMIN_JWT_SECRET`, ať funguje `/admin`.
Zbytek klíčů (Convex, Resend, Turnstile) je pro produkční feature.

## Testy

```bash
npm run typecheck                   # TS bez emitu
npm run build                       # produkční build
npx playwright install chromium     # jednou stačí
npm run test:e2e                    # 42 e2e testů × 3 viewporty
npm run test:e2e:ui                 # interaktivní UI runner
```

CI běží ve `.github/workflows/ci.yml` — typecheck + build + Playwright na
každý PR.

## Struktura

```
src/
  app/
    layout.tsx           root layout + font + Organization JSON-LD
    page.tsx             /              — homepage
    o-firme/             /o-firme
    nase-sluzby/         /nase-sluzby   (+ kotvy #soustruzeni …)
    certifikaty/         /certifikaty
    kariera/             /kariera       (fallback bez Convexu)
    kontakt/             /kontakt       (karty + mapa + formulář)
    faq/                 /faq           (SEO — 10 otázek + JSON-LD)
    admin/               /admin         (login, dashboard, poptavky, kariera, kontakty)
    api/
      contact/           POST — přijme poptávku (zatím stub log)
      admin/
        login/           POST — přihlášení
        logout/          POST — odhlášení
    sitemap.ts           /sitemap.xml
    robots.ts            /robots.txt
    icon.svg             favicon
  components/
    Header.tsx / Footer.tsx / Section.tsx / Reveal.tsx / JsonLd.tsx
    ContactForm.tsx
  lib/
    site.ts              zdroj pravdy — adresa, kontakty, služby, nav
    schema.ts            JSON-LD generátory (Organization / LocalBusiness / Service / FAQ)
    auth.ts              minimal cookie session pro admin
  middleware.ts          brána /admin/*
convex/
  schema.ts              tabulky contacts, jobs, inquiries, rateLimits
```

## Plánovací dokumenty

| Soubor | K čemu je |
|---|---|
| [`BRIEF.md`](./BRIEF.md) | Původní zadání od klienta |
| [`PLAN.md`](./PLAN.md) | Stack, tokeny, routing, data model, komponenty |
| [`PROGRESS.md`](./PROGRESS.md) | Textový checklist per úkol |
| [`planner.html`](./planner.html) | Interaktivní progress board (Artifact) |
| [`PROMPTS.md`](./PROMPTS.md) | Prompty pro Cursor, když budeš dostavovat zbytek |
| [`OPEN-QUESTIONS.md`](./OPEN-QUESTIONS.md) | Věci na klienta před dokončením |

## Co ještě chybí (potřebuje tvůj vstup)

- **Convex** — založit projekt (`npx convex dev`), doplnit `NEXT_PUBLIC_CONVEX_URL`,
  napojit `/kariera`, `/admin/*` a formulář na reálné tabulky.
- **Resend** — API klíč, ověřená doména `okfinal.cz`, `RESEND_FROM`.
- **Cloudflare Turnstile** — site key + secret, přidat widget do `ContactForm`.
- **Netlify** — deploy, ENV proměnné, DNS přepnutí.
- **Klient** — schválit design, dodat fotky výroby, potvrdit texty.

Detaily viz `OPEN-QUESTIONS.md`.
