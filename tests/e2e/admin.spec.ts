import { test, expect } from "@playwright/test";

test.describe("Admin — gating", () => {
  test("/admin bez cookie → redirect na login", async ({ page }) => {
    const res = await page.goto("/admin");
    expect(res?.status()).toBe(200);
    expect(page.url()).toContain("/admin/login");
  });

  test("/admin/kariera bez cookie → login s next=…", async ({ page }) => {
    await page.goto("/admin/kariera");
    await expect(page).toHaveURL(/\/admin\/login\?.*next=%2Fadmin%2Fkariera/);
  });

  test("špatné heslo → error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Heslo").fill("wrong-password");
    await page.getByRole("button", { name: "Přihlásit se" }).click();
    await expect(page).toHaveURL(/\/admin\/login\?error=1/);
    await expect(page.getByText(/Nesprávné heslo/)).toBeVisible();
  });
});
