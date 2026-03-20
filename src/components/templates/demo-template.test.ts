import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { computerVisionDemo } from "@/lib/demo-data";
import { DemoTemplate } from "./demo-template";

describe("DemoTemplate", () => {
  test("renders workflow framing and email-first CTAs", () => {
    const html = renderToStaticMarkup(
      createElement(DemoTemplate, { content: computerVisionDemo })
    );

    expect(html).toContain(computerVisionDemo.workflowTitle);
    expect(html).toContain(computerVisionDemo.problemStatement);
    expect(html).toContain("Best fit");
    expect(html).toContain("Talk Through Your Workflow");
    expect(html).toContain(`href="${computerVisionDemo.primaryCtaHref}"`);
  });
});
