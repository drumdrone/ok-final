# Convex `_generated/` stubs

Tyto soubory jsou **placeholdery**. Convex je při `npx convex dev`
kompletně přepíše skutečnými typed handles vygenerovanými ze schema
a funkcí v tomto adresáři.

Do gitu commitujeme jen tyto stuby, aby:
- TypeScript build prošel před inicializací Convexu (týká se hlavně
  `src/app/kariera`, `src/app/admin/*`, `src/app/api/contact` — všechny
  mají fallback, když Convex není nakonfigurovaný).
- Nový vývojář mohl `npm install && npm run dev` bez Convex účtu.

Po `npx convex dev` běží skutečná Convex codegen a tyto soubory
mají být přepsané. Když se změní schéma nebo funkce, Convex je zaktualizuje.
