# Zadání: okfinal.cz — migrace na Next.js

**Klient:** OK FINAL s.r.o., Nádražní 608, 564 01 Žamberk
**Obor:** přesné soustružení a svařování kovů (B2B strojírenství)
**Původní web:** https://okfinal.cz/ (WordPress + Elementor)
**Metodika:** PLAYBOOK.md (Claude → Cursor → Next.js starter)

---

## Inventura původního webu

6 stránek — malý rozsah, migrace bude rychlá:

| URL | Obsah |
|---|---|
| `/` | Home (rozcestník + o firmě + reference) |
| `/o-firme` | O firmě |
| `/certifikaty` | Certifikáty |
| `/nase-sluzby` | Naše služby (Soustružení / Svařování / Montáž) |
| `/kariera` | Kariéra |
| `/kontakt` | Kontakt |
| `/home_en/` | English verze (rozsah neznámý — pravděpodobně jen homepage) |

## Zjištěné problémy (opravit při migraci)

- Fake e-mail v patičce `admin@demolink.com` — zbytek Elementor demo dat
- Překlep v kontaktu: `jiri.divisek@[www.okfinal.cz]` → má být `jiri.divisek@okfinal.cz`
- `og:locale` = `en_US` — má být `cs_CZ`
- Copyright „2016" v patičce — 9 let zastaralé
- EN mutace nedokončená

## Priority

- **P1** — Homepage, Kontakt (formulář, mapa, viditelné kontakty)
- **P2** — O firmě, Naše služby (čitelnost + dobré fotky výroby)
- **P3** — Kariéra, Certifikáty (funkčně stačí)

## Doporučení klientovi

**Modernizace vzhledu, ne pixel-perfect kopie.** Elementor šablona
z ~2018 vypadá zastarale. B2B strojírenská firma získá důvěryhodnost
profesionálním designem. Navrhnout mockup před stavbou.

## Design směr (varianta A — modernizace)

- Průmyslová paleta: tmavá modrá / šedá + oranžový akcent
- Font: Inter (moderní sans-serif)
- Velké výrobní fotky, hodně bílého prostoru
- Karty služeb s ikonami / čísly

## Odhad rozsahu

| Fáze | Práce | Odhad |
|---|---|---|
| Fáze 1 (Claude, plán) | Sitemapa + požadavky + design mockup | 1 den |
| Fáze 2 (Cursor) — struktura | Klon starteru, homepage, podstránky, admin | 3–4 dny |
| Fáze 2 — kontaktní formulář | Convex action + Resend + admin | 0,5 dne |
| Fáze 2 — responsivita | Průchod všech stránek | 0,5 dne |
| Fáze 3 — parita, deploy | Skript, Netlify, DNS, Search Console | 0,5 dne |
| **Celkem** | | **~6 dní** |

## SEO — cílové fráze

- „přesné soustružení Žamberk / Pardubický kraj"
- „ruční svařování kovů"
- „výroba dílců podle výkresové dokumentace"
- „CNC soustružení Ústí nad Orlicí"

Plus JSON-LD `Organization` + `LocalBusiness` + `Service` a FAQ stránka.
