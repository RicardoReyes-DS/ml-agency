// @vitest-environment jsdom
import { createElement, type AnchorHTMLAttributes } from "react";
import { renderToString } from "react-dom/server";
import { expect, test, vi } from "vitest";
import { HomePage } from "@/components/pages/home-page";
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "./footer-section";
import { getDictionary } from "@/lib/i18n";

const route = vi.hoisted(() => ({ pathname: "/es" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => createElement("a", props, children),
}));

test.each(["es", "en"] as const)("%s SSR contains visible content and native navigation before any effect", (locale) => {
  route.pathname = `/${locale}`;
  const host = document.createElement("div");
  host.innerHTML = renderToString(createElement("div", null,
    createElement(Navbar), createElement(HomePage, { locale }), createElement(FooterSection)));
  const copy = getDictionary(locale);
  expect(host.querySelector("h1")?.textContent).toContain(copy.home.hero.title);
  expect(host.querySelector("[data-typewriter]")?.textContent).toBe(copy.home.hero.typewriter[0]);
  const essential = host.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, a");
  expect(essential.length).toBeGreaterThan(40);
  essential.forEach((element) => {
    for (let node: HTMLElement | null = element; node; node = node.parentElement) {
      expect(Number(node.style.opacity || 1), `${element.textContent}: ancestor opacity`).toBe(1);
      expect(node.style.transform || "none", `${element.textContent}: ancestor transform`).toBe("none");
    }
  });
  const menu = host.querySelector("nav details");
  expect(menu?.querySelector("summary")).not.toBeNull();
  expect(menu?.querySelector('a[href="#services"]')?.textContent).toBe(copy.navbar.links[1].label);
  expect(menu?.querySelector(`a[href="/${locale === "es" ? "en" : "es"}"]`)).not.toBeNull();
  expect(menu?.querySelector('a[href^="mailto:ricardo@enkisys.net"]')).not.toBeNull();
  expect(host.querySelector("canvas")).toBeNull();
});
