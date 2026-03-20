import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import LocaleHomePage from "./[locale]/page";

describe("localized home page", () => {
  test("renders spanish content for es locale", async () => {
    const element = await LocaleHomePage({ params: Promise.resolve({ locale: "es" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Sistemas de machine learning");
    expect(html).toContain("Hablar sobre tu flujo");
  });

  test("renders english content for en locale", async () => {
    const element = await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Machine learning systems");
    expect(html).toContain("Talk Through Your Workflow");
  });
});
