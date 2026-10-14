import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { palette, themes } from "../tokens";

const here = new URL(".", import.meta.url).pathname;
const css = readFileSync(join(here, "theme.css"), "utf8");
const kebab = (k: string) => k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/** The `--name: value` declarations of the first block whose selector list ends with `selector {`. */
function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  expect(start, `no "${selector} {" block in theme.css`).toBeGreaterThan(-1);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]!.trim()]));
}

describe("theme.css", () => {
  for (const [name, selector] of [
    ["light", "\n.light"],
    ["dark", "\n.dark"],
    ["dark (system)", ":root:not(.light)"],
  ] as const) {
    it(`matches the ${name} tokens`, () => {
      const theme = name === "light" ? themes.light : themes.dark;
      const vars = block(selector);
      for (const [key, value] of Object.entries(theme)) expect(vars[`--vv-${kebab(key)}`]?.toUpperCase(), key).toBe(value.toUpperCase());
      expect(Object.keys(vars).filter((v) => v.startsWith("--vv-"))).toHaveLength(Object.keys(theme).length);
    });
  }

  it("matches the raw palette", () => {
    for (const [key, value] of Object.entries(palette)) expect(css).toContain(`--color-vv-${kebab(key)}: ${value};`);
  });
});

describe("web kit", () => {
  it("never imports React Native", () => {
    const files = readdirSync(here).filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".test.ts"));
    const shared = ["../tokens", "../foundation"];
    for (const f of files) {
      const src = readFileSync(join(here, f), "utf8");
      expect(src, f).not.toMatch(/from "react-native/);
      for (const [, path] of src.matchAll(/from "(\.\.\/[^"]+)"/g)) expect(shared, `${f} imports ${path}`).toContain(path);
    }
  });
});
