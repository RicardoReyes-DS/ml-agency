import { describe, expect, test } from "vitest";
import Home from "./page";

describe("root homepage route", () => {
  test("redirects to the spanish homepage", () => {
    expect(() => Home()).toThrowError("NEXT_REDIRECT");
  });
});
