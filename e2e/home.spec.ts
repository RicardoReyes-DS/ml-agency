import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ML Agency/);
  });

  test("has a stable value-focused hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /machine learning systems that cut manual work/i,
      })
    ).toBeVisible();
  });

  test("routes the primary homepage CTA to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /book technical review/i }).first().click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("keeps demos accessible as a secondary path", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /see live demos/i }).first().click();
    await expect(page).toHaveURL(/\/demos\/computer-vision/);
  });
});
