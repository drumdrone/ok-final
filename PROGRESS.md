# PROGRESS.md — progress board

Zaškrtávej během práce. Když je celá sekce hotová, přesuň ji dolů pod
„Hotovo". Trvá to 5 sekund a vidím, kde jsem.

---

## Fáze 1 — Plán (Claude)

- [x] Sitemapa a inventura původního webu
- [x] Priorita stránek (P1/P2/P3)
- [x] Doporučení: modernizace vs. pixel-perfect
- [x] Design tokens (barvy, font, spacing)
- [x] Datový model (Convex)
- [x] Otázky pro klienta → `OPEN-QUESTIONS.md`
- [ ] Schůzka s klientem — projít otevřené otázky
- [ ] Mockup homepage (Figma / v0 / rychlý HTML) — po schůzce

## Fáze 2 — Stavba (Cursor)

### 2.1 Setup
- [ ] Klon starteru `nextjs-web-starter` do nového projektu
- [ ] `pnpm install`, ověřit dev server
- [ ] Convex projekt založit, `npx convex dev`
- [ ] `.env.local` s dev keys (Convex, ADMIN_PASSWORD, Resend, Turnstile)
- [x] Nahradit tokeny Tailwind podle `PLAN.md` §2
- [ ] Nahradit favicon a apple-touch-icon

### 2.2 Layout a globální komponenty
- [ ] Header — logo, nav (6 položek), CTA „Poptávka", mobile
- [ ] Footer — kontakty, mapa webu, IČ/DIČ, aktuální rok
- [ ] `Section` a `SectionHeader` wrapper
- [ ] `Reveal` animace (přenést ze starteru)
- [ ] `JsonLd` komponenta

### 2.3 Obsah — stránky
- [ ] Homepage — hero, služby, „33 let" band, segmenty, CTA
- [ ] `/o-firme` — timeline, storytelling
- [ ] `/nase-sluzby` — 3 sekce s kotvami
- [ ] `/certifikaty` — grid osvědčení
- [ ] `/kariera` — dynamický list z Convexu, fallback „momentálně nenabíráme"
- [ ] `/kontakt` — kontakty, mapa, formulář
- [ ] `/faq` (P2) — 10 otázek pro SEO

### 2.4 Kontaktní formulář
- [ ] `ContactForm.tsx` — pole, validace
- [ ] Cloudflare Turnstile integrace
- [ ] Upload souboru → Convex file storage
- [ ] `POST /api/contact` route handler
- [ ] Convex mutation `inquiries:create`
- [ ] Convex action `sendInquiryMail` (Resend)
- [ ] Rate limit 3/IP/hod
- [ ] Success stav + potvrzovací e-mail odesilateli

### 2.5 Admin
- [ ] `/admin/login` + JWT cookie auth
- [ ] Middleware `/admin/*`
- [ ] Dashboard (počet nových poptávek)
- [ ] `/admin/kontakty` — edit `contacts`
- [ ] `/admin/kariera` — CRUD `jobs`
- [ ] `/admin/poptavky` — list `inquiries` + detail

### 2.6 SEO
- [ ] `generateMetadata` per stránka
- [ ] `sitemap.ts`, `robots.ts`
- [ ] JSON-LD `Organization` v layoutu
- [ ] JSON-LD `LocalBusiness` na `/`
- [ ] JSON-LD `Service` × 3 na `/nase-sluzby`
- [ ] JSON-LD `FAQPage` na `/faq`
- [ ] OG obrázky per stránka

### 2.7 Responsivita a QA
- [ ] Průchod 375 px
- [ ] Průchod 768 px
- [ ] Průchod 1440 px
- [ ] Lighthouse ≥ 90 na všech metrikách
- [ ] axe check na hlavní stránky
- [ ] Odeslat testovací poptávku end-to-end

## Fáze 3 — Deploy

- [ ] Paritní check — všech 6 URL vrací 200, meta OK
- [ ] Vizuální diff s klientem (screenshoty)
- [ ] Netlify prod deploy s produkčním Convexem
- [ ] DNS přepnutí (TTL snížit den předem)
- [ ] Search Console — submit sitemap
- [ ] Google Analytics 4 / Plausible
- [ ] Sledovat coverage 14 dní

---

## Hotovo

*(sem přesouvat dokončené celé sekce)*
