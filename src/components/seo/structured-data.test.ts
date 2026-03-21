import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { OrganizationStructuredData, WebSiteStructuredData } from "./structured-data";

describe("structured data localization", () => {
  test("renders organization schema in spanish for the es locale", () => {
    const html = renderToStaticMarkup(createElement(OrganizationStructuredData, { locale: "es" }));

    expect(html).toContain("Soluciones de visión por computadora");
    expect(html).toContain("Servicios de machine learning para empresas en México");
    expect(html).toContain("México");
  });

  test("renders website schema in spanish for the es locale", () => {
    const html = renderToStaticMarkup(createElement(WebSiteStructuredData, { locale: "es" }));

    expect(html).toContain("Servicios de machine learning para empresas en México");
    expect(html).toContain("\"inLanguage\":\"es-MX\"");
  });
});
