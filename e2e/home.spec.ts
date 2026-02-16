import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ML Agency/);
  });

  test("has hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("navigates to demos", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /demos?/i }).first().click();
    await expect(page).toHaveURL(/\/demos/);
    await expect(page).toHaveTitle(/Demos/);
  });
});
