# DEPLOY.md — od PR k živému webu

Konkrétní kroky, které tě dostanou z tohoto repa na `okfinal.cz`.

## Předpoklady

- Netlify účet (free tier stačí)
- Convex účet (free tier stačí)
- Resend účet + ověřená doména `okfinal.cz` (free 3 000 e-mailů/měsíc)
- Cloudflare Turnstile — site key + secret (zdarma)
- Přístup k DNS domény `okfinal.cz`
- Google Search Console + Google Analytics (nebo Plausible)

## Krok 1 — Convex (10 min)

```bash
# lokálně
npx convex dev
# → přihlášení, výběr týmu, název projektu 'okfinal'
# → dostaneš NEXT_PUBLIC_CONVEX_URL, ulož do .env.local
```

Convex dashboard → Settings → Environment Variables → přidat:
- `RESEND_API_KEY` (z Resendu, viz krok 2)
- `RESEND_FROM=noreply@okfinal.cz`
- `RESEND_TO_INQUIRIES=info@okfinal.cz`

Deploy do produkce:
```bash
npx convex deploy --prod
# → dostaneš CONVEX_DEPLOY_KEY (do Netlify env)
# → dostaneš production NEXT_PUBLIC_CONVEX_URL
```

## Krok 2 — Resend (5 min)

1. `dashboard.resend.com` → přihlásit
2. Domains → Add Domain → `okfinal.cz`
3. Přidat DKIM + SPF záznamy do DNS (Resend ti je ukáže)
4. Počkat na verifikaci (~15 min)
5. API Keys → Create → uložit klíč (do Convex env, viz krok 1)

## Krok 3 — Cloudflare Turnstile (5 min)

1. `dash.cloudflare.com` → Turnstile → Add site
2. Widget mode: Managed
3. Sitekey → do `.env.local` jako `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Secret → do Netlify env jako `TURNSTILE_SECRET_KEY`

TODO v kódu: aktivovat Turnstile widget ve `ContactForm.tsx`
(momentálně je backend verify připravený, ale UI widget chybí — dodělá
se ve chvíli, kdy budeš mít klíče).

## Krok 4 — Netlify (10 min)

1. `app.netlify.com` → Add new site → Import from GitHub
2. Repo: `drumdrone/ok-final`, branch: `main` (po merge do main)
3. Build appears from `netlify.toml` — nechat výchozí
4. Site settings → Environment variables:

```
NEXT_PUBLIC_SITE_URL=https://okfinal.cz
NEXT_PUBLIC_CONVEX_URL=<z Convex --prod>
CONVEX_DEPLOY_KEY=<z Convex --prod>
ADMIN_PASSWORD=<vygeneruj něco silného>
ADMIN_JWT_SECRET=<`openssl rand -hex 32`>
RESEND_API_KEY=<z Resendu>
RESEND_FROM=noreply@okfinal.cz
RESEND_TO_INQUIRIES=info@okfinal.cz
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<z Cloudflare>
TURNSTILE_SECRET_KEY=<z Cloudflare>
```

5. Deploy → dostaneš preview URL `xyz.netlify.app`
6. Ověřit: projít 6 URL, poslat testovací poptávku, počkat na e-mail

## Krok 5 — DNS přepnutí (den X)

Den před:
- Snížit TTL A/CNAME záznamů na 300 s (5 min)

V okamžik přepnutí:
- Netlify → Domain management → Add custom domain `okfinal.cz`
- Netlify ukáže `xyz.netlify.app` — nastavit CNAME `www` → tam
- Nastavit A record `okfinal.cz` → Netlify load balancer IP (Netlify to řekne)
- **NEDOTÝKAT SE MX** záznamů (jinak sundáš mail!)
- Ověřit HTTPS (Netlify auto, ~5 min)

## Krok 6 — Search Console + Analytics (30 min)

Search Console:
1. `search.google.com/search-console` → Add property `okfinal.cz`
2. Ověřit vlastnictví (DNS TXT nebo HTML tag)
3. Submit sitemap: `https://okfinal.cz/sitemap.xml`
4. Sledovat coverage 14 dní

Analytics — vybrat jedno:
- **Plausible** (~9 €/měsíc, EU, bez cookies, GDPR OK) — přidat `<script>` do layoutu
- **Google Analytics 4** (zdarma, ale cookie banner nutný)

## Rollback

Když něco nesedí:
- Netlify → Deploys → předchozí deploy → Publish deploy
- Nebo v DNS vrátit A/CNAME zpět

## Kontrolní seznam po nasazení

- [ ] Všech 7 URL vrací 200
- [ ] `/kontakt` formulář odešle testovací poptávku a přijde e-mail
- [ ] `/admin/login` s produkčním heslem funguje
- [ ] `/sitemap.xml` obsahuje všechny stránky
- [ ] `/robots.txt` allow / disallow /admin, /api
- [ ] Search Console: property + sitemap
- [ ] Analytics: pageview event přichází
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Testovací poptávka: e-mail dorazí na `info@okfinal.cz` + potvrzení odesilateli
