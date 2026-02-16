import { describe, it, expect } from "vitest";
import { getSectionSettings, complexFunctions } from "./complex-functions";

describe("getSectionSettings", () => {
  it("returns transfer config for hero", () => {
    const config = getSectionSettings("hero");
    expect(config.type).toBe("transfer");
    expect(config.name).toBeDefined();
    expect(config.recommendedSettings).toBeDefined();
  });

  it("returns sinc config for services", () => {
    const config = getSectionSettings("services");
    expect(config.type).toBe("sinc");
  });

  it("returns essential config for about", () => {
    const config = getSectionSettings("about");
    expect(config.type).toBe("essential");
  });

  it("returns mobius config for contact", () => {
    const config = getSectionSettings("contact");
    expect(config.type).toBe("mobius");
  });

  it("returns mobius config for footer", () => {
    const config = getSectionSettings("footer");
    expect(config.type).toBe("mobius");
  });

  it("returns config matching complexFunctions", () => {
    const sections = ["hero", "services", "about", "contact", "footer"] as const;
    sections.forEach((section) => {
      const config = getSectionSettings(section);
      expect(complexFunctions[config.type]).toEqual(config);
    });
  });
});
