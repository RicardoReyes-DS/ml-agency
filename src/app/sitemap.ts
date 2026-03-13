import { MetadataRoute } from "next";

const BASE_URL = "https://ml-agency.com";
const LOCALES = ["es", "en"] as const;
const ROUTES = [
  "",
  "/demos",
  "/demos/computer-vision",
  "/demos/nlp",
  "/demos/predictive-analytics",
  "/demos/deep-learning",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/demos" ? 0.9 : 0.8,
    }))
  );
}
