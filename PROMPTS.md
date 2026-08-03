# PROMPTS.md — prompty pro Cursor

Krok po kroku. Každý prompt je samostatný — spusť ho v Cursoru
(Composer / Chat), počkej na výstup, ověř, commit. Ne dávat všechny
najednou, Cursor začne halucinovat.

**Kontext, který dej Cursoru na začátek každé session:**

> Otevři a přečti `BRIEF.md`, `PLAN.md` a `PROGRESS.md`. Držíme se plánu.
> Když se rozhodneš odchýlit, řekni proč. Nezavádět nové závislosti bez
> souhlasu. Píšeme česky (UI, komentáře v kódu anglicky).

---

## 0. Sanity check před stavbou

```
Přečti BRIEF.md a PLAN.md. Napiš mi třemi větami, co budeme stavět,
jaký je stack a co se úmyslně NEDĚLÁ. Když v plánu vidíš rozpor nebo
mezeru, řekni to teď — než začnu kódovat.
```

---

## 1. Setup projektu ze starteru

```
Naklonuj šablonu `nextjs-web-starter` do tohoto repa (do rootu, ne do
podadresáře). Odstraň z ní všechno, co je specifické pro cajeapotheke:
- produktová karta a produkt modal
- e-shop import skripty
- orbitální hero carousel
- dekorační bloby, ilustrace bylin
- veškerý přírodní / bylinný obsah v komponentách

Nechej:
- App Router strukturu, layout, font setup
- Tailwind config (přepíšu tokeny sám)
- Reveal animace
- Convex client, admin auth šablonu
- SEO vrstvu (generateMetadata, sitemap, robots)

Po úklidu spusť `pnpm dev` a ověř, že se homepage otevře bez chyb.
Napiš seznam smazaných souborů.
```

---

## 2. Design tokens

```
Přepiš `tailwind.config.ts` podle PLAN.md §2:

Barvy: paleta `steel` (50–950) a `accent` (400–700) — hodnoty viz PLAN.
Font: Inter přes `next/font/google`, subsets `latin` a `latin-ext`,
weights 400/500/600/700, jako `--font-inter`, přiřadit do `font-sans`
a `font-display`.

V `globals.css` udělej:
- @tailwind direktivy
- base: html scroll-smooth, body bg-white text-steel-900 antialiased
- headings font-display, tracking-tight
- components: .btn, .btn-primary, .btn-ghost, .btn-dark, .eyebrow, .section, .container-tight

Ověř, že build (`pnpm build`) projde a barevná paleta odpovídá.
```

---

## 3. Header a Footer

```
V `src/components/Header.tsx` vytvoř sticky header:
- Logo vlevo: čtvereček bg-steel-900 s textem "OK" + název firmy "OK FINAL s.r.o."
- Nav (6 položek podle `src/lib/site.ts` — vytvoř tento soubor s exportem `nav`,
  `services` a `site`):
  Úvod, O firmě, Naše služby, Certifikáty, Kariéra, Kontakt
- CTA vpravo "Poptávka" (btn-primary) → /kontakt
- Mobile: horizontální scrollovací nav pod hlavičkou

V `src/components/Footer.tsx`:
- 3 sloupce: brand + slogan / kontakt (adresa, tel, mail z site.ts) / mapa webu
- Spodní řada: © 2026, IČ, DIČ, "Vyrobeno v Next.js"
- Tmavé pozadí steel-950, text steel-200

`site.ts` obsahuje:
- name, tagline, description, url
- address (street, city, zip, country)
- contacts (phone, email, contactPerson: name, email, phone)
- company (ico, dic, founded)
- hours[]
- nav[]
- services[] (slug, title, short, body, bullets)

Použij plné, reálné hodnoty z BRIEF.md (opravený e-mail
jiri.divisek@okfinal.cz, ne demolink).
```

---

## 4. Homepage

```
Postav `src/app/page.tsx` podle PLAN.md §6:

1. HERO (tmavý, bg-steel-950, radial-gradient accent):
   - Eyebrow "Přesné strojírenství · Žamberk"
   - H1: "Kovové dílce podle vaší <span text-accent-500>výkresové dokumentace</span>"
   - Perex (2 věty)
   - CTA "Nezávazná poptávka" (primary) + "Naše služby" (ghost, dark border)
   - Stat řada: 33 let / 500+ zakázek / IT6 tolerance / 24 h odezva

2. SEKCE SLUŽEB (světlá): 3 karty ze `services` array, každá jako
   <Link href="/nase-sluzby#slug">, s číslem 01/02/03 v tmavém čtverci.

3. BAND "33 LET" (bg-steel-950):
   - Vlevo velké číslo 33 v accent-500
   - Vpravo storytelling odstavec + CTA "O firmě" a "Certifikáty"

4. SEGMENTY: 2 karty (Živnostníci / Zahraniční výrobci).

5. CTA BAND (bg-accent-500, bílý text): "Máte výkres?" + "Sjednat schůzku".

Použij komponenty <Section> a <SectionHeader> pro sjednocení. Reveal
animace omez na 2 sekce — víc ruší.
```

---

## 5. Podstránky (dávkově)

```
Postav v jedné dávce 4 podstránky. Pro každou:
- <section> hero pás (bg-steel-50, border-b), eyebrow + h1 + perex
- Hlavní obsah v <Section>
- Konzistentní typografie (text-lg leading-relaxed text-steel-700)

/o-firme — storytelling odstavce + timeline milníků (1992/2001/2010/2018/2026).
  Data si vymysli podle BRIEF.md, drž se tónu "rodinná dílna, řemeslo".

/nase-sluzby — 3 sekce s kotvami (#soustruzeni, #svarovani, #montaz).
  Každá: velké číslo 01/02/03, název, perex, plný text, bullet list.
  Data ze `site.services`.

/certifikaty — grid karet (6 osvědčení). Data v souboru, ne v Convexu.
  Každá karta: název, tag (Svařování / Metrologie / Kvalita), popis.

/kariera — dynamický list z Convexu `jobs` (query `getActiveJobs`).
  Pokud prázdný: sekce "Momentálně nenabíráme, ale pošlete životopis"
  s CTA na kariera@okfinal.cz.

Meta pro každou stránku: title + description v `metadata`.
```

---

## 6. Kontakt + formulář

```
Postav /kontakt:

Sekce 1 — HERO pás (jako ostatní podstránky).

Sekce 2 — GRID 2 sloupce:
  Vlevo: kontaktní karty (adresa, telefon, e-mail, kontaktní osoba,
         otevírací doba) — data ze site.ts.
  Vpravo: <ContactForm>.

Sekce 3 — MAPA (Google Maps iframe, adresa Nádražní 608, Žamberk).

ContactForm (client component):
  Pole: jméno, firma, e-mail, telefon, popis poptávky (textarea),
        upload PDF/DWG/DXF (max 20 MB), Turnstile widget, GDPR checkbox.
  Validace: e-mail povinný, popis povinný (min 20 znaků), GDPR povinný.
  Submit: FormData → POST /api/contact.
  Stavy: idle / submitting / success / error.

/api/contact route:
  1. Ověř Turnstile token proti Cloudflare API.
  2. Zavolej Convex mutation `inquiries.create` (bez souboru).
  3. Pokud je soubor: upload do Convex file storage, uložit fileId.
  4. Convex action `sendInquiryMail` → Resend na info@okfinal.cz +
     potvrzení odesilateli.
  5. Rate limit: Convex counter, max 3 odeslání/IP/hod, jinak 429.

Napiš i schema pro `inquiries` tabulku v Convexu.
```

---

## 7. Admin

```
Postav admin podle PLAN.md §9:

/admin/login — jednoduchý form, POST ověří ADMIN_PASSWORD (env),
  nastaví HTTP-only cookie s JWT (HS256, secret v env, 7 dní).

middleware.ts — chraň /admin/*, redirect na /admin/login.

/admin (dashboard) — počet nových poptávek, quick links.

/admin/kontakty — edit tabulky `contacts` (klíč / role / telefon /
  e-mail / adresa / pořadí). Inline edit, save mutation.

/admin/kariera — CRUD pozic: list + modal edit. Pole: title, slug,
  location, type, summary, body (markdown), active, order.

/admin/poptavky — read-only list `inquiries` (nejnovější první),
  detail s obsahem + odkaz na stažení přílohy. Filtry status
  new/read/archived, toggle status jedním klikem.

Design adminu držet minimalistický (steel paleta, žádná animace),
ať se používá.
```

---

## 8. SEO vrstva

```
1. generateMetadata na každé stránce (title, description, openGraph,
   alternates.canonical).

2. src/app/sitemap.ts — export defaultní funkce vracející všech 6 URL
   + /faq, se změnou lastModified na build time.

3. src/app/robots.ts — allow all, sitemap odkaz.

4. Komponenta <JsonLd> co bere object → <script type="application/ld+json">.

5. V layoutu injectni JSON-LD Organization (adresa, kontakt, sameAs).

6. Na / injectni LocalBusiness (Žamberk, geo, opening hours).

7. Na /nase-sluzby injectni 3× Service (soustružení, svařování, montáž).

8. Postav /faq s 10 otázkami (viz níže) a JSON-LD FAQPage.

Otázky pro FAQ (návrh):
- Jaké tolerance zvládáte?
- Vyrábíte i kusové zakázky?
- Jaké materiály zpracováváte?
- Jaké svařovací metody používáte?
- Máte certifikované svářeče?
- Jak dlouho trvá výroba typické zakázky?
- V jaké formě přijímáte výkresovou dokumentaci?
- Zajišťujete i povrchové úpravy?
- Dodáváte do zahraničí?
- Jak se dostaneme k nabídce?
```

---

## 9. Responsivita a QA

```
Projdi všechny stránky ve třech šířkách: 375, 768, 1440.
Report každé stránky:
- Co se láme (přetečení, malé fonty, zalomení nadpisů).
- Screenshot popisem, kde je problém.

Oprav vše, co najdeš, a znovu projdi 375 px. Pak spusť Lighthouse
na / a /kontakt, cíl ≥ 90 na všech čtyřech metrikách. Pokud nedosáhne,
identifikuj a oprav top 3 blocker.

Nakonec spusť axe check na / a /kontakt, oprav critical + serious.
```

---

## 10. Deploy

```
Připrav Netlify deploy:
1. netlify.toml s [build] příkazem a Next.js pluginem.
2. Seznam ENV proměnných (viz PLAN §10) do Netlify dashboardu.
3. Convex production deployment (`npx convex deploy --prod`).
4. Testovací deploy na preview URL, projít 6 URL + poslat testovací
   poptávku.

Napiš mi checklist DNS přepnutí:
- Snížit TTL A/CNAME den předem
- Ověřit, kde běží pošta (MX záznamy nechat)
- Přepnout A/CNAME na Netlify
- Ověřit HTTPS (Netlify auto)
- Search Console → submit sitemap
- Analytics event tracking (poptávka odeslána)
```

---

## Pravidla pro Cursor session

- **Jeden prompt = jeden PR / commit.** Ne slepovat.
- **Když se plán mění, updatni PLAN.md a PROGRESS.md ve stejném commitu.**
- **Vždy commitni před dalším promptem** — jinak Cursor přepíše, co jsi
  chtěl zachovat.
- **Odmítej nové závislosti.** Když Cursor navrhne balíček, který není
  v PLAN.md, řekni „bez toho".
- **Testovací data ne v produkčním Convexu.** Dev deployment jinam.
