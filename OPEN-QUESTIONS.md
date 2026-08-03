# OPEN-QUESTIONS.md — otevřené otázky na klienta

Vyřešit **před zahájením Fáze 2**. Blokují finální rozhodnutí o rozsahu.

---

## 1. Design směr

**Otázka:** Chce zachovat aktuální vzhled 1:1, nebo modernizovat?

**Doporučení:** Modernizace. Elementor šablona z ~2018 zastarala a
B2B strojírenská firma získá důvěryhodnost profesionálním designem.
Ukázat rychlý mockup homepage před stavbou.

**Bloky:** vše ve Fázi 2 (design tokens, layout, komponenty).

---

## 2. Objem poptávek přes web

**Otázka:** Kolik ročně přijímá poptávek přes web?

**Proč:** Rozhodne investici do formuláře.
- < 10 / rok → prostý formulář, e-mail
- 10–50 / rok → formulář + admin s přehledem poptávek
- 50+ / rok → CRM napojení, notifikace, statistiky

**Bloky:** rozsah adminu (2.5), rate limit, workflow poptávek.

---

## 3. Anglická mutace

**Otázka:** Má EN verzi využitou? Kolik zahraničních klientů z ní chodí?
Rozšířit nebo dát pryč?

**Doporučení:** Pokud < 5 % návštěvnosti, **odstranit** (redirect na CS).
Jinak dodělat plnou EN mutaci (všech 6 stránek).

**Bloky:** i18n vrstva, obsah, hreflang, Convex `locale`.

---

## 4. Portfolio / reference

**Otázka:** Chce mít portfolio zakázek s fotkami?

**Proč:** Pro B2B strojařinu obrovský prodejní argument. Fotky
skutečných dílců říkají víc než texty o tolerancích.

**Rozsah:**
- 8–12 vzorových zakázek (foto + krátký popis)
- Případně kategorie: soustružení / svařování / montáž
- Nová Convex tabulka `projects`, admin CRUD

**Bloky:** nová stránka `/reference`, nová tabulka, admin obrazovka.

---

## 5. Kdo bude web spravovat

**Otázka:** Kdo bude web editovat a jaká je jeho technická úroveň?

**Varianty:**
- **Nikdo** — texty hardcode v TSX, kontakty v Convexu (edit adminem)
- **Sekretářka / asistent** — jednoduchý admin (kontakty, kariéra, poptávky)
- **Nikdo, ale já** — dělám edit přes PR / push, klient neplatí za CMS

**Doporučení:** Střední varianta — admin pro kontakty + kariéra + poptávky.

---

## 6. Kariéra — reálný stav

**Otázka:** Přijímá firma aktivně lidi? Kolik pozic bývá otevřených?

**Proč:** Pokud roky nikoho nehledali, stačí obecná stránka
„pošlete životopis". Pokud aktivně nabírají, admin s CRUD pozic.

---

## 7. Rozpočet a termín

**Otázka:** Kdy má nový web spustit? Jaký je rozpočet?

**Odhad:** ~6 dní práce (viz BRIEF.md). Kalendářně **2–3 týdny** včetně
konzultací, mockupu, revizí a DNS okna.

---

## 8. Provozní

- **Doména:** kdo drží registraci `okfinal.cz`? Kdo drží DNS?
- **E-mail:** kde běží pošta (aby DNS přepnutí nesundalo mail)?
- **Stávající hosting:** kdy vypnout WordPress? Zálohy?
- **Google:** má klient Search Console + Analytics účet? Předat mi přístup.
- **Google Business:** pobočka na Google Maps, aktualizovat?
