import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { getLocalizedDemoContent } from "@/lib/demo-data";
import { DemoTemplate } from "./demo-template";

describe("DemoTemplate locale", () => {
  test("renders spanish demo framing for localized demo pages", () => {
    const html = renderToStaticMarkup(
      createElement(DemoTemplate, {
        content: getLocalizedDemoContent("es", "computerVision"),
        locale: "es",
      })
    );

    expect(html).toContain("Volver a servicios");
    expect(html).toContain("Donde ayuda este demo");
    expect(html).toContain("Buen ajuste");
    expect(html).toContain("Arquitectura del sistema");
    expect(html).toContain("Latencia de inference");
    expect(html).toContain("Agendar revision tecnica");
  });

  test("renders english demo framing without spanish leakage", () => {
    const html = renderToStaticMarkup(
      createElement(DemoTemplate, {
        content: getLocalizedDemoContent("en", "computerVision"),
        locale: "en",
      })
    );

    expect(html).toContain("Back to Services");
    expect(html).toContain("Where this demo helps");
    expect(html).toContain("Best fit");
    expect(html).toContain("System Architecture");
    expect(html).toContain("Engineering Challenges");
    expect(html).toContain("Book Technical Review");
    expect(html).not.toContain("Volver a servicios");
    expect(html).not.toContain("Agendar revision tecnica");
  });
});
