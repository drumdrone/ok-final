import { test, expect } from "@playwright/test";

test.describe("Kontakt — formulář", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt");
  });

  test("na mobilu se formulář ukáže před kartami", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 1024, "Test jen pro <lg");
    const form = page.getByRole("heading", { name: "Nezávazná poptávka" });
    const firstCard = page.getByRole("heading", { name: "Adresa" });
    const formY = (await form.boundingBox())?.y ?? Infinity;
    const cardY = (await firstCard.boundingBox())?.y ?? -Infinity;
    expect(formY, "form should be above the first contact card").toBeLessThan(cardY);
  });

  test("prázdný submit ukáže validaci", async ({ page }) => {
    await page.getByRole("button", { name: "Odeslat poptávku" }).click();
    await expect(
      page.getByText(/Vyplňte prosím alespoň e-mail nebo telefon/i)
    ).toBeVisible({ timeout: 8000 });
  });

  test("krátká zpráva ukáže validaci", async ({ page }) => {
    await page.getByLabel("E-mail").fill("test@example.com");
    await page.getByLabel("Popis poptávky *").fill("krátká");
    await page.getByLabel(/Souhlasím/).check();
    await page.getByRole("button", { name: "Odeslat poptávku" }).click();
    await expect(page.getByText(/alespoň 20 znaků/i)).toBeVisible({
      timeout: 8000,
    });
  });

  test("valid submission jde do success stavu", async ({ page }) => {
    await page.getByLabel("Jméno *").fill("Jan Novák");
    await page.getByLabel("E-mail").fill("test@example.com");
    await page.getByLabel("Popis poptávky *").fill(
      "Potřebujeme vyrobit 20 ks dílců podle přiloženého výkresu, materiál nerez."
    );
    await page.getByLabel(/Souhlasím/).check();
    await page.getByRole("button", { name: "Odeslat poptávku" }).click();
    await expect(page.getByText(/Poptávka odeslána/i)).toBeVisible({ timeout: 8000 });
  });
});
