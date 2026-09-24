import { defineConfig } from "@playwright/test";

// Attach only to an already built production server. Never start dev implicitly.
const baseURL = process.env.MOBILE_BASE_URL ?? "http://127.0.0.1:3301";
if (!["127.0.0.1", "localhost", "[::1]"].includes(new URL(baseURL).hostname)) {
  throw new Error("Mobile regression tests require a loopback production server");
}
export default defineConfig({
  testDir: "./e2e",
  testMatch: "mobile-*.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: true,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  outputDir: process.env.MOBILE_OUTPUT ?? "test-results/mobile",
  reporter: [["line"], ["json", { outputFile: process.env.MOBILE_REPORT ?? "test-results/mobile-report.json" }]],
  use: { baseURL, trace: "off" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    ...(process.env.MOBILE_WEBKIT === "1"
      ? [{ name: "webkit", use: { browserName: "webkit" as const } }]
      : []),
  ],
});
