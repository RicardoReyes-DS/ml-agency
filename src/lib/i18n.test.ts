import { describe, expect, test } from "vitest";
import {
  defaultLocale,
  getDictionary,
  getLocaleFromPathname,
  localizeHref,
} from "./i18n";
import { CONTACT_EMAIL } from "./site";

describe("i18n", () => {
  test("defaults to spanish and resolves locale from pathname", () => {
    expect(defaultLocale).toBe("es");
    expect(getLocaleFromPathname("/es/demos")).toBe("es");
    expect(getLocaleFromPathname("/en/demos/nlp")).toBe("en");
    expect(getLocaleFromPathname("/unknown")).toBe("es");
  });

  test("localizes internal hrefs", () => {
    expect(localizeHref("es", "/demos")).toBe("/es/demos");
    expect(localizeHref("en", "/#contact")).toBe("/en/#contact");
    expect(localizeHref("en", `mailto:${CONTACT_EMAIL}`)).toBe(`mailto:${CONTACT_EMAIL}`);
  });

  test("provides spanish and english marketing copy", () => {
    const spanish = getDictionary("es");
    const english = getDictionary("en");

    expect(spanish.navbar.links[0]?.label).toBe("Inicio");
    expect(english.navbar.links[0]?.label).toBe("Home");
    expect(spanish.home.hero.title).toContain("trabajo manual");
    expect(english.home.hero.title).toContain("manual work");
  });
});
