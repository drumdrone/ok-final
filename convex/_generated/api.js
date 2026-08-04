/**
 * Placeholder — nahradí se automaticky při `npx convex dev`.
 * Před inicializací Convexu tento modul volání odmítne (chybová
 * hláška je informativní); po inicializaci Convex vygeneruje reálný
 * typed handle.
 */
const notInitialized = (path) => {
  throw new Error(
    `Convex není inicializovaný — nemohu zavolat ${path}. Spusť 'npx convex dev'.`,
  );
};

const proxy = (prefix) =>
  new Proxy(
    {},
    {
      get(_, key) {
        const path = `${prefix}.${String(key)}`;
        return new Proxy(() => notInitialized(path), {
          get() {
            return notInitialized(path);
          },
          apply() {
            notInitialized(path);
          },
        });
      },
    },
  );

export const api = proxy("api");
export const internal = proxy("internal");
