import { test, expect } from "@playwright/test";

const routes = [
  { path: "/",             expectHeading: /Kovové dílce/i },
  { path: "/o-firme",      expectHeading: /Rodinná dílna/i },
  { path: "/nase-sluzby",  expectHeading: /Od výkresu/i },
  { path: "/certifikaty",  expectHeading: /Doklady kvality/i },
  { path: "/kariera",      expectHeading: /Práce, kde/i },
  { path: "/kontakt",      expectHeading: /Ozvěte se/i },
  { path: "/faq",          expectHeading: /Otázky/i },
];

for (const { path, expectHeading } of routes) {
  test(`${path} loads, headline present, no h-scroll, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
    });

    const res = await page.goto(path);
    expect(res?.status(), `${path} should return 200`).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(expectHeading);

    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      vp: window.innerWidth,
    }));
    expect(
      overflow.doc,
      `${path} — page overflows viewport (doc ${overflow.doc}px vs vp ${overflow.vp}px)`
    ).toBeLessThanOrEqual(overflow.vp);

    expect(errors, `${path} — console errors: ${errors.join(" | ")}`).toEqual([]);
  });
}
