import { test, expect } from "@playwright/test";

const routes = [
  { path: "/",             expectHeading: /Dobře promyšlené/i },
  { path: "/o-firme",      expectHeading: /Od výrobce schodišť/i },
  { path: "/nase-sluzby",  expectHeading: /Soustružení/i },
  { path: "/certifikaty",  expectHeading: /Systém managementu kvality/i },
  { path: "/kariera",      expectHeading: /Kariéra/i },
  { path: "/kontakt",      expectHeading: /Kontakt/i },
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
