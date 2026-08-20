# Prompt: Checklister — univerzální task-board s AI generováním

Zkopíruj vše mezi `--- START ---` a `--- END ---` a vlož do Claude Code
v prázdné složce (nebo mu řekni „naklonuj svou vlastní kostru, jsi tady
sám"). Prompt je **komplet self-contained** — Claude si sám udělá plán,
nastaví Next.js + Convex, napíše UI, deployne na Netlify.

Reference vizuálního stylu, který má napodobit:
- https://claude.ai/code/artifact/dfea1ddd-fa95-4d17-b399-9ebf0b022a5b
  (deploy checklist pro OK FINAL — přesně ten styl tabulky, cyklení
  stavů, ukládání)

---

## --- START ---

Postav mi aplikaci **Checklister**. Cíl: napíšu do inputu, čeho chci
dosáhnout (např. „nasadit Next.js web na Netlify", „naučit se React
Hooks", „refaktorovat naši payment infrastrukturu"), stisknu Enter, AI
mi to rozdělí do fází A/B/C… a v každé fázi na kroky s políčky **# ·
Co uděláš · Kde přesně · Jak (klik za klikem) · Když se zasekneš ·
Hotovo**. Stav klikatelný (čeká → probíhá → hotovo), realtime sync mezi
zařízeními, sdílení odkazem.

### Vize

Přesně ten druh checklistu, který se dělá ručně v Excelu před každým
novým úkolem — ale generovaný AI. Cíl na jeden řádek → strukturovaný
runbook s prakticky použitelnými kroky. Ne todo aplikace, ne project
management. **Operating manual pro konkrétní úkol.**

### Stack (fixní — neřeš alternativy)

- **Next.js 16** (App Router, TypeScript strict, RSC)
- **Tailwind CSS 3**
- **Convex** (data + realtime + auth + LLM action)
- **Convex Auth** s GitHub OAuth (nejjednodušší)
- **Anthropic API** (Claude Sonnet 5) pro generování — Convex action
  drží klíč, nikdy nejde na klient
- **Netlify** deploy (`@netlify/plugin-nextjs`)
- **Node 22** LTS

Nepoužívej: shadcn/ui (přílišná abstrakce pro tenhle rozsah), tRPC
(Convex nahrazuje), react-query (Convex reactive queries), zustand
(useState + Convex stačí).

### Datový model (`convex/schema.ts`)

```ts
users:        // řeší Convex Auth automaticky
  { email, name, image, githubId? }

checklists:
  { ownerId, title, goalPrompt, isPublic, createdAt, updatedAt }
  index: by_owner, by_public

sections:
  { checklistId, code, title, hint, order, colorSeed }
  index: by_checklist_order

tasks:
  { checklistId, sectionId, n, what, where, how, stuck,
    status: "queue"|"wip"|"done", order }
  index: by_section_order, by_checklist_status
```

### Obrazovky

**1. `/` — Přihlášení / dashboard**
- Nepřihlášený: uvítací obrazovka + „Přihlásit přes GitHub"
- Přihlášený: seznam mých checklistů (grid karet: titulek, cíl kurzívou,
  progress bar, počet kroků, poslední úprava) + velké tlačítko „Nový
  checklist"

**2. `/new` — Nový checklist**
- Jeden velký textarea: „Čeho chceš dosáhnout?" (placeholder má tři
  příklady rotující)
- Volitelně: „Kontext" (short textarea) — např. „mám Netlify účet,
  domain je u Wedosu, tým 2 lidi"
- Enter nebo tlačítko „Vygenerovat"
- Loading stav: „Claude přemýšlí…" + skeleton řádků
- Po vygenerování → redirect na `/c/[id]`

**3. `/c/[id]` — Board**
- Přesný layout **jako reference výše**: hlavička s progres barem
  (velké %, chipy hotovo/probíhá/čeká, celkem), pod ní tabulka s
  barevně odlišenými hlavičkami sekcí A/B/C… a řádky.
- Sloupce: **#, Co uděláš, Kde přesně, Jak (klik za klikem), Když
  se zasekneš, Hotovo**
- **Klik na zaškrtávátko cyklí** `queue → wip → done → queue`. Update
  jde přes Convex mutation → realtime k ostatním viewerům.
- **Inline edit** jakéhokoli textu: klik → contenteditable → blur/Enter
  → Convex mutation. Vlastník i editovat, hosté jen zaškrtávat.
- Reorder: drag & drop řádků v rámci sekce (dnd-kit).
- Toolbar vpravo nahoře: **Sdílet** (kopíruje link + toggle public),
  **Regenerovat** (AI přeformuluje sekce/kroky, ale zachová hotové),
  **Přidat sekci** manuálně, **Motiv**, **Reset stavů**.
- Prázdný stav sekce: „Přidat krok" tlačítko na konci.

**4. `/c/[id]/embed` (nice-to-have)** — read-only iframe verze bez
tabulky navigace, pro vložení do wiki / dokumentu.

### AI generování — Convex action

Soubor `convex/ai.ts`, `"use node"`. Action `generateChecklist({
goalPrompt, context? })` → volá Anthropic `messages.create` s modelem
`claude-sonnet-5`, nutí tool use přes `tool_choice: { type: "tool",
name: "emit_checklist" }`, tool má schéma:

```json
{
  "name": "emit_checklist",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {"type": "string"},
      "sections": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "code": {"type": "string", "description": "A, B, C …"},
            "title": {"type": "string"},
            "hint": {"type": "string"},
            "tasks": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "what": {"type": "string"},
                  "where": {"type": "string"},
                  "how": {"type": "string"},
                  "stuck": {"type": "string"}
                },
                "required": ["what", "how"]
              }
            }
          },
          "required": ["code", "title", "tasks"]
        }
      }
    },
    "required": ["title", "sections"]
  }
}
```

System prompt pro Claude (Czech):

> Jsi asistent, který uživatelův cíl rozebere do praktického runbooku.
> Vytvoř **3–7 fází (A, B, C…)**, každá po **3–8 krocích**. Každý krok
> je konkrétní akce, ne obecné doporučení. Piš krátce, přímo, aktivně
> v druhé osobě („Otevři…", „Klikni…", „Zadej…"). Pro každý krok:
>
> - **what** — imperativ, max ~8 slov („Nainstaluj závislosti", ne „Je
>   potřeba nainstalovat")
> - **where** — konkrétní místo: URL, jméno menu, cesta souboru, název
>   dashboardu. Ne obecně („v prohlížeči"). Používej `<code>` tagy
>   kolem cest a názvů.
> - **how** — klik-za-klikem 1–3 věty. Pokud jde o příkaz, obal ho
>   `<code class="inline">…</code>`.
> - **stuck** — 1 věta, co dělat, když to nejde. Píše se jen když má
>   smysl. Jinak vynech.
>
> První fáze je typicky „Setup / předpoklady". Pořadí kroků odráží
> reálný sled, nejsou to nezávislé taskly. Jazyk odpovídá jazyku
> vstupu (uživatel píše česky → výstup česky, anglicky → anglicky).

Action vrátí strukturu → Convex mutation ji rozseká do tabulek
`checklists`, `sections`, `tasks` v jedné transakci.

**„Regenerate"**: zachová hotové kroky (matching podle `what`), doplní
jen chybějící / nedokončené. Nastav teplotu 0.4 pro první generaci,
0.2 pro regenerace (méně kreativity).

### Design (napodob referenci)

Paleta: chladná neutrální (steel-blue) + jedna akcentní barva. Nabídni
uživateli výběr akcentu při vytváření checklistu (přednastavené: crimson
`#c8102e`, indigo `#4f46e5`, emerald `#059669`, amber `#d97706`).
Barevné hlavičky sekcí generuj z akcentu (různé odstíny — HSL rotace
o ±30° saturation ±20).

Typo: Inter (přes `next/font/google`) + `ui-monospace` na kódy a čísla.
Radius 8px karty, 6px inputy. Progres bar oranžová/akcent výplň, šedé
pozadí. Podpora light/dark motivu přes `data-theme` + `prefers-color-
scheme` (viz naše implementace v deploy-checklist.html).

Řádky tabulky mají `line-through` na hotových, žlutý left-border na
probíhajících.

### Non-goals (nedělat v první iteraci)

- Kanban / kalendář view — jen tabulka
- Přiřazování uživatelů (assignee) — každý checklist má jednoho vlastníka
- Notifikace / e-maily
- Placené plány, subscription
- Mobilní aplikace — jen responzivní web
- Multi-language UI — jen CS (AI výstup respektuje jazyk vstupu)
- Export do PDF/Excel — až později

### Deploy

- Convex production: `npx convex deploy --prod`, do dashboardu přidat
  `ANTHROPIC_API_KEY`
- Netlify: import z GitHubu, `netlify.toml` s Next pluginem, ENV:
  ```
  NEXT_PUBLIC_CONVEX_URL, CONVEX_DEPLOY_KEY
  NEXT_PUBLIC_SITE_URL
  ```
- Convex Auth GitHub OAuth: v GitHub Developer Settings → OAuth App →
  callback `https://<convex-url>/api/auth/callback/github`

### Iterace — první deliverable

1. Setup: `create-next-app` + Tailwind + `npx convex dev` + Convex Auth
   s GitHub
2. Data model (schema.ts + kompletní mutations/queries pro
   checklists/sections/tasks)
3. `/` dashboard + `/new` s AI generováním (Anthropic action)
4. `/c/[id]` board s cyklením stavů (bez inline editu)
5. Deploy na Netlify + prod Convex
6. Až pak: inline edit, regenerate, sdílení, drag & drop, embed

Než začneš kódovat, **udělej mi PLAN.md** a **PROGRESS.md** ve
stylu klasického dev checklistu (viz můj OK FINAL projekt na
`drumdrone/ok-final` pro referenci, jak vypadá dobrá struktura).
Pak commituj po logických blocích, ať vidím postup.

Až budeš mít MVP hotové, řekni si o **ANTHROPIC\_API\_KEY** a **GitHub
OAuth credentials** — dodám. Vše ostatní udělej sám.

## --- END ---

---

## Jak to spustit

```bash
mkdir checklister && cd checklister
claude
# do promptu vlož vše mezi --- START --- a --- END ---
```

Nebo v Cursor Chat s vybraným Claude modelem — stejně.

## Odhad

Podle mé zkušenosti z OK FINAL (58% přes 3 sessions):
- **MVP (kroky 1–5 v iteraci)**: ~4–6 sessions s Claude Code
- **Plná verze**: ~2–3 týdny při 1–2 h denně
- **Náklady na AI provoz**: cca $0.02–0.05 na vygenerování jednoho
  checklistu (Sonnet 5, ~2k tokenů out). Když má checklister 100
  aktivních uživatelů generujících 3× týdně, měsíčně ~$30.

## Co to bude umět (rekapitulace)

- Zadáš cíl → dostaneš strukturovaný runbook s 3–7 fázemi
- Klikáš stavy, sync do všech zařízení
- Sdílíš odkaz, ostatní vidí live progress
- Regenerace přes AI — zachová co je hotové
- Manuálně přidáváš / edituješ řádky
- Public odkaz → hosté mohou zaškrtávat (nebo read-only, dle nastavení)
- Motiv light/dark, akcentní barva per checklist
