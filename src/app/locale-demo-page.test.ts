import type { ReactElement } from "react";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, test, vi } from "vitest";
import LocalizedComputerVisionPage from "./[locale]/demos/computer-vision/page";

describe("localized demo pages", () => {
  const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  test("do not emit missing key warnings for custom demo pages", async () => {
    const element = await LocalizedComputerVisionPage({
      params: Promise.resolve({ locale: "es" }),
    });

    renderToStaticMarkup(element);

    const keyWarnings = consoleErrorSpy.mock.calls.filter(([message]) =>
      String(message).includes('Each child in a list should have a unique "key" prop')
    );

    expect(keyWarnings).toHaveLength(0);
  });

  test("passes a keyed custom demo component into DemoTemplate", async () => {
    const element = await LocalizedComputerVisionPage({
      params: Promise.resolve({ locale: "es" }),
    });

    expect(isValidElement(element)).toBe(true);

    const fragmentChildren = element.props.children as unknown[];
    const demoTemplateElement = fragmentChildren[2] as ReactElement<{
      customDemoComponent: ReactElement;
    }>;

    expect(isValidElement(demoTemplateElement)).toBe(true);
    expect(isValidElement(demoTemplateElement.props.customDemoComponent)).toBe(true);
    expect(demoTemplateElement.props.customDemoComponent.key).toBeTruthy();
  });
});
