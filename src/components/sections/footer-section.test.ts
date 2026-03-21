import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

describe("FooterSection implementation", () => {
  test("does not opt out of SSR with next/dynamic", () => {
    const filePath = path.resolve(__dirname, "footer-section.tsx");
    const source = readFileSync(filePath, "utf8");

    expect(source).not.toContain("dynamic(");
    expect(source).not.toContain("ssr: false");
  });
});
