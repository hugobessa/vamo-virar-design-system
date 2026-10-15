import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const here = new URL(".", import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(join(here, "../../package.json"), "utf8")) as {
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
};
const files = readdirSync(here).filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".test.ts"));
const sources = files.map((f) => [f, readFileSync(join(here, f), "utf8")] as const);
const imports = (src: string) => [...src.matchAll(/from "([^"]+)"/g)].map((m) => m[1]!);

describe("shadcn/ui components", () => {
  it("never import React Native", () => {
    for (const [f, src] of sources) {
      expect(src, f).not.toMatch(/from "react-native/);
      for (const path of imports(src).filter((p) => p.startsWith("../"))) expect(["../web/utils", "../foundation", "../tokens"], `${f} imports ${path}`).toContain(path);
    }
  });

  it("only import packages the package declares", () => {
    const declared = new Set([...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)]);
    for (const [f, src] of sources) {
      for (const path of imports(src).filter((p) => !p.startsWith("."))) {
        const name = path.startsWith("@") ? path.split("/").slice(0, 2).join("/") : path.split("/")[0]!;
        expect(declared.has(name), `${f} imports ${path}`).toBe(true);
      }
    }
  });

  it("mark files that use hooks or Radix as client components", () => {
    for (const [f, src] of sources) {
      const interactive = /\buse(State|Effect|Context|Ref|Memo|Callback|Id|Carousel|Sidebar|FormField)\b|createContext/.test(src);
      if (interactive) expect(src.startsWith('"use client";'), f).toBe(true);
    }
  });
});
