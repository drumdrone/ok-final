# PLAN.md — stavební plán

Detailní plán, podle kterého se v Cursoru staví. Doplňuje BRIEF.md
o *jak konkrétně to postavit*.

---

## 1. Stack a nástroje

- **Framework:** Next.js 15 (App Router, RSC, TypeScript)
- **Styling:** Tailwind CSS 3
- **Font:** Inter (`next/font/google`, subsets `latin`, `latin-ext`)
- **Backend / data:** Convex (kontakty, poptávky, pozice, případně novinky)
- **E-mail:** Resend (free plán, 3000/měsíc) — potvrzení poptávky
- **Anti-spam:** Cloudflare Turnstile (free)
- **Hosting:** Netlify (s produkčním Convexem)
- **Repo:** GitHub (tenhle repozitář)

Starter: **`nextjs-web-starter`** (z cajeapotheke iterace, viz PLAYBOOK).

## 2. Design tokens

```
Barvy:
  steel-950  #111721  (pozadí sekce, tmavý band)
  steel-900  #1c2431  (heading, tmavý text)
  steel-700  #354458
  steel-500  #526a87
  steel-300  #a1b1c4
  steel-100  #e4e9f0  (linky, borders)
  steel-50   #f5f7fa  (light sekce)
  accent-500 #f97316  (oranžový akcent, CTA)
  accent-600 #e35d0f  (hover)
  bílá / černá

Font:
  Inter — sans + display (jedna rodina, různé weights)
  Body:    400
  UI:      500
  Nadpis:  700

Radius:  rounded-md (6px) pro UI, rounded-lg (8px) pro karty
Spacing: sekce py-16 lg:py-24, container padding 1rem → 2rem
```

Volitelně druhý font (např. `Space Grotesk`) na displays — až po mockupu.

## 3. Sitemapa + routing

```
src/app/
  layout.tsx            # Header, Footer, meta, font
  page.tsx              # /                  — homepage
  o-firme/page.tsx      # /o-firme
  nase-sluzby/page.tsx  # /nase-sluzby       (+ fragmenty #soustruzeni, #svarovani, #montaz)
  certifikaty/page.tsx  # /certifikaty
  kariera/page.tsx      # /kariera
  kontakt/page.tsx      # /kontakt
  faq/page.tsx          # /faq               (P2, kvůli SEO)
  sitemap.ts            # generated
  robots.ts             # generated
  api/
    contact/route.ts    # POST → Convex mutation → Resend
  admin/
    layout.tsx          # heslo (env ADMIN_PASSWORD, cookie auth)
    page.tsx            # dashboard
    kontakty/page.tsx   # editace contacts
    kariera/page.tsx    # CRUD jobs
    poptavky/page.tsx   # list inquiries (read-only)
```

**URL parita s originálem:** ano, kvůli SEO — všechny stejné slugy.

**EN mutace:** zatím **odložit**, dokud klient neřekne, kolik reálně
přináší (viz OPEN-QUESTIONS.md). Připravit strukturu pole `locale` na
Convex entitách, ale žádné `/en/*` routy zatím nedělat.

## 4. Datový model (Convex)

```ts
// convex/schema.ts (kostra)

contacts: {
  key: string,          // 'main', 'sales', 'career'
  name: string,
  role?: string,
  phone?: string,
  email?: string,
  address?: string,
  order: number,
  locale: 'cs' | 'en',
}

jobs: {
  slug: string,
  title: string,
  location: string,
  type: 'plný úvazek' | 'brigáda' | 'DPP',
  summary: string,
  body: string,          // markdown
  active: boolean,
  order: number,
  locale: 'cs' | 'en',
  createdAt: number,
}

inquiries: {              // odeslané poptávky, jen ke čtení v adminu
  name: string,
  company?: string,
  email: string,
  phone?: string,
  message: string,
  fileId?: string,        // Convex file storage (výkres)
  turnstileOk: boolean,
  status: 'new' | 'read' | 'archived',
  createdAt: number,
}

pages?: {                 // pokud má klient chtít editovat texty
  slug: string,
  title: string,
  body: string,           // md
  updatedAt: number,
  locale: 'cs' | 'en',
}
```

Kontakty jsou v Convexu, protože se mění a klient je má chtít editovat
z adminu. Texty stránek zpočátku hardcode v TSX (rychlejší); až klient
řekne, že chce texty editovat, přesunout do `pages`.

## 5. Komponentní vrstva

```
src/components/
  Header.tsx             # sticky nav + mobile
  Footer.tsx             # kontakty, mapa webu, CTA
  Section.tsx            # <section> wrapper + SectionHeader
  Hero.tsx               # variant "dark industrial"
  ServiceCard.tsx
  StatBand.tsx           # velké číslo + label
  ContactCard.tsx        # ikona + řádek
  MapEmbed.tsx           # Google Maps iframe
  ContactForm.tsx        # klient-side, POST /api/contact
  Reveal.tsx             # scroll-in animace (ze starteru)
  JsonLd.tsx             # <script type="application/ld+json">
  admin/
    AdminNav.tsx
    JobsEditor.tsx
    ContactsEditor.tsx
    InquiriesList.tsx
```

## 6. Homepage — struktura

1. **Hero** (dark) — H1 „Kovové dílce podle vaší výkresové dokumentace",
   perex, CTA „Nezávazná poptávka" + „Naše služby", stat řada (33 let /
   500+ zakázek / IT6 / 24 h odezva)
2. **Sekce služeb** — 3 karty (Soustružení / Svařování / Montáž)
3. **Band „33 let"** — tmavá sekce, velké číslo, storytelling odstavec
4. **Segmenty zákazníků** — 2 karty (živnostníci vs. zahraniční výrobci)
5. **CTA band** — oranžový pás „Máte výkres? Ozvěte se."

## 7. Kontaktní formulář

Pole:
- Jméno / firma
- Telefon *nebo* e-mail (jedno povinné)
- Popis poptávky (textarea)
- Upload souboru — PDF / DWG / DXF (Convex file storage, max 20 MB)
- Cloudflare Turnstile token
- Souhlas s GDPR (checkbox)

Flow:
1. Client validuje pole + Turnstile.
2. `POST /api/contact` s multipart form.
3. Route ověří Turnstile tokenu na Cloudflare API.
4. Convex `inquiries:create` uloží záznam + uploadne soubor do storage.
5. Convex `actions:sendInquiryMail` pošle přes Resend:
   - e-mail na `info@okfinal.cz` s obsahem + přílohou
   - potvrzení odesilateli
6. Redirect na `/kontakt/dekujeme` nebo inline success stav.

Rate limit: 3 odeslání / IP / hodinu (Convex counter s TTL).

## 8. SEO vrstva

- `generateMetadata` per stránka
- `sitemap.ts` — všech 6 statických URL
- `robots.ts` — allow all, sitemap odkaz
- **JSON-LD** v `<head>`:
  - `Organization` (globální, v layoutu)
  - `LocalBusiness` (kontakt, hlavní stránka)
  - `Service` × 3 (na `/nase-sluzby`)
  - `FAQPage` na `/faq`
- OG obrázky — 1200×630, generované staticky do `/public/og/`
- Hreflang připravený, ale bez EN aktivní

## 9. Admin

- Login: prostý formulář, ověří `ADMIN_PASSWORD` (env), nastaví HTTP-only
  cookie s tokenem (JWT stačí, HS256, secret v env).
- Middleware `/admin/*` — cookie check, jinak redirect na `/admin/login`.
- Obrazovky: dashboard → kontakty (edit) → kariéra (CRUD) → poptávky (list).
- Wysiwyg pro popisy pozic: prostý `<textarea>` + preview markdown.

## 10. Deploy

- **Netlify** (Next.js 15 runtime).
- **Convex** production deployment.
- ENV proměnné:
  ```
  CONVEX_URL
  CONVEX_DEPLOY_KEY
  ADMIN_PASSWORD
  ADMIN_JWT_SECRET
  RESEND_API_KEY
  RESEND_FROM              # noreply@okfinal.cz
  RESEND_TO_INQUIRIES      # info@okfinal.cz
  TURNSTILE_SITE_KEY
  TURNSTILE_SECRET_KEY
  NEXT_PUBLIC_SITE_URL     # https://okfinal.cz
  ```
- DNS přepnutí až po vizuální kontrole a paritním checku.
- Search Console: submit sitemap, hlídat coverage 14 dní.

## 11. Co nedělat (proti scope creep)

- **Žádný e-shop, katalog produktů** — není potřeba.
- **Žádný carousel** — B2B, na klik získáváme důvěru, ne pozornost.
- **Žádné bloby / dekorace** z cajeapotheke starteru — jiný obor.
- **Žádný blog v první iteraci** — až klient řekne, že bude psát.
- **EN mutace až po potvrzení** — nedělat naslepo.
