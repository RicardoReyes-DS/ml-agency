import { describe, expect, test } from "vitest";
import DemosPage from "./page";

describe("root demos route", () => {
  test("redirects to the spanish demos hub", () => {
    expect(() => DemosPage()).toThrowError("NEXT_REDIRECT");
  });
});
