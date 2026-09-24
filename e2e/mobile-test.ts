import { test as base, expect } from "@playwright/test";

// Applied to every mobile test, including the normal graphics policy cases.
// Simulated GL failures still must produce zero uncaught/hydration errors.
export const test = base.extend<{ runtimeErrors: void }>({
  runtimeErrors: [async ({ page }, use, testInfo) => {
    const pageErrors: string[] = [];
    const hydrationErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
      if (/hydration|didn't match|did not match/i.test(message.text())) hydrationErrors.push(message.text());
    });
    await use();
    await testInfo.attach("runtime-errors", {
      body: JSON.stringify({ pageErrors, hydrationErrors, consoleErrors }, null, 2), contentType: "application/json",
    });
    expect(pageErrors, "uncaught page errors (no generic exclusions)").toEqual([]);
    expect(hydrationErrors).toEqual([]);
    // Three emits this exact console diagnostic when the eligible desktop
    // getContext-null probe is injected. The thrown probe is caught locally.
    const allowed = testInfo.titlePath.some((part) => /desktop GL (missing|throws)$/.test(part))
      ? ["THREE.WebGLRenderer: Error creating WebGL context.", "THREE.WebGLRenderer: Simulated local GL initialization failure"] : [];
    expect(consoleErrors.filter((message) => !allowed.includes(message))).toEqual([]);
  }, { auto: true }],
});
export { expect } from "@playwright/test";
