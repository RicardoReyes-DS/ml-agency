import { describe, expect, test } from "vitest";
import { generateMetadata as generateHomeMetadata } from "./[locale]/page";
import { generateMetadata as generateDemosMetadata } from "./[locale]/demos/page";
import { generateMetadata as generateComputerVisionMetadata } from "./[locale]/demos/computer-vision/page";
import { generateMetadata as generateNlpMetadata } from "./[locale]/demos/nlp/page";
import { generateMetadata as generateDeepLearningMetadata } from "./[locale]/demos/deep-learning/page";
import { generateMetadata as generatePredictiveMetadata } from "./[locale]/demos/predictive-analytics/page";

describe("localized metadata", () => {
  test("generates Mexico-focused metadata for the spanish home page", async () => {
    const metadata = await generateHomeMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Servicios de machine learning para empresas en México");
    expect(metadata.description).toContain("México");
    expect(metadata.description).toContain("Latinoamérica");
    expect(metadata.keywords).toContain("servicios de machine learning en México");
    expect(metadata.openGraph?.locale).toBe("es_MX");
  });

  test("generates localized demos hub metadata in spanish", async () => {
    const metadata = await generateDemosMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Demos de IA aplicada para operaciones en México");
    expect(metadata.description).toContain("casos de uso");
    expect(metadata.description).toContain("operaciones");
    expect(metadata.keywords).toContain("demos de IA aplicada");
  });

  test("generates richer metadata for the spanish computer vision demo page", async () => {
    const metadata = await generateComputerVisionMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Visión por computadora para inspección y captura documental");
    expect(metadata.description).toContain("visión por computadora");
    expect(metadata.description).toContain("inspección");
    expect(metadata.keywords).toContain("visión por computadora para empresas en México");
    expect(metadata.openGraph?.locale).toBe("es_MX");
  });

  test("generates a distinct SEO target for the spanish document intelligence page", async () => {
    const metadata = await generateNlpMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Inteligencia documental con IA para empresas");
    expect(metadata.description).toContain("inteligencia documental");
    expect(metadata.keywords).toContain("inteligencia documental para empresas en México");
  });

  test("generates a distinct SEO target for the spanish custom models page", async () => {
    const metadata = await generateDeepLearningMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Modelos de IA a medida para empresas");
    expect(metadata.description).toContain("modelos de IA a medida");
    expect(metadata.keywords).toContain("modelos de IA a medida en México");
  });

  test("generates a distinct SEO target for the spanish predictive analytics page", async () => {
    const metadata = await generatePredictiveMetadata({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(metadata.title).toBe("Analítica predictiva para empresas en México");
    expect(metadata.description).toContain("analítica predictiva");
    expect(metadata.keywords).toContain("analítica predictiva para empresas en México");
  });
});
