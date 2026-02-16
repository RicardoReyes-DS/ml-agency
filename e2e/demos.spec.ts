import { test, expect } from "@playwright/test";

test.describe("Demos section", () => {
  test("demos page loads", async ({ page }) => {
    await page.goto("/demos");
    await expect(page).toHaveTitle(/ML Demos|Demos/);
  });

  test("computer vision demo loads", async ({ page }) => {
    await page.goto("/demos/computer-vision");
    await expect(page).toHaveTitle(/Object Detection|Computer Vision/);
  });

  test("nlp demo loads", async ({ page }) => {
    await page.goto("/demos/nlp");
    await expect(page).toHaveTitle(/RAG|NLP/);
  });
});
