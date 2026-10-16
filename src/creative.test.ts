import { describe, expect, test } from "bun:test";
import { CREATIVE, creativeArea, SAFE_AREA } from "./specs.ts";

describe("creative safe area", () => {
  test("is the region both the 21:9 and 3:2 crops of the universal asset keep", () => {
    const u = CREATIVE.universal;
    expect(SAFE_AREA.width / SAFE_AREA.height).toBeCloseTo(4425 / 2247, 2);
    expect(SAFE_AREA.left * 2 + SAFE_AREA.width).toBeCloseTo(u.width);
    expect(SAFE_AREA.top * 2 + SAFE_AREA.height).toBeCloseTo(u.height);
    expect(SAFE_AREA.width).toBeCloseTo(u.height * 1.5);
  });
});

describe("creative area", () => {
  test("header keeps a centred 3:2 band, search the whole canvas", () => {
    const h = CREATIVE.header;
    const a = creativeArea("header");
    expect(a.width / a.height).toBeCloseTo(1.5);
    expect(a.left * 2 + a.width).toBeCloseTo(h.width);
    const s = CREATIVE.search;
    expect(creativeArea("search")).toEqual({ left: 0, top: 0, width: s.width, height: s.height });
  });
});

describe("creative placements", () => {
  test("every placement's size matches its stated aspect ratio", () => {
    for (const [key, { width, height, format }] of Object.entries(CREATIVE)) {
      const [w, h] = format.split(":").map(Number);
      expect(Math.abs(width / height - w! / h!), key).toBeLessThan(0.01);
    }
  });
});
