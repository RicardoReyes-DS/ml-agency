import { test, expect } from "@playwright/test";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(new RegExp(SITE_NAME, "i"));
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

  test("routes the primary homepage CTA to email", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /talk through your workflow/i }).first()).toHaveAttribute(
      "href",
      new RegExp(`^mailto:${CONTACT_EMAIL}`)
    );
  });

  test("keeps demos accessible as a secondary path", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /see live demos/i }).first().click();
    await expect(page).toHaveURL(/\/demos\/computer-vision/);
  });
});
