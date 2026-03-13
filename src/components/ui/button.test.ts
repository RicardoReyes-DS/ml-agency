import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import Link from "next/link";
import { Button } from "./button";

describe("Button", () => {
  test("asChild does not nest anchors when wrapping a Next link", () => {
    const html = renderToStaticMarkup(
      createElement(
        Button,
        { asChild: true },
        createElement(Link, { href: "#contact" }, "Book Review")
      )
    );

    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain('href="#contact"');
    expect(html).toContain(">Book Review</a>");
  });
});
