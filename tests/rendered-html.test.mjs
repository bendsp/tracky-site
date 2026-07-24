import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../app/page.tsx", import.meta.url);
const layoutPath = new URL("../app/layout.tsx", import.meta.url);
const cssPath = new URL("../app/globals.css", import.meta.url);
const packagePath = new URL("../package.json", import.meta.url);

test("contains the Tracky landing page content", async () => {
  const [page, layout] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(layoutPath, "utf8"),
  ]);

  assert.match(page, /Notice where your time goes\./);
  assert.match(page, /Track anything/);
  assert.match(page, /Keep what is yours/);
  assert.match(page, /iPhone app that respects your/);
  assert.match(
    page,
    /href="https:\/\/desprets\.net">Made with love by Ben Desprets/,
  );
  assert.match(page, /\/screens\/track\.jpg/);
  assert.match(page, /\/screens\/history\.jpg/);
  assert.match(page, /\/screens\/day\.jpg/);
  assert.match(page, /\/tracky-icon\.png/);
  assert.doesNotMatch(page, /private beta/i);
  assert.doesNotMatch(page, /Built for iPhone/);
  assert.doesNotMatch(page, /Your life, in your own words/i);
  assert.doesNotMatch(page, /Local-first · iPhone/i);
  assert.doesNotMatch(page, /Captured in the iOS Simulator/i);
  assert.doesNotMatch(page, /Made in Berlin|©/);

  assert.match(layout, /https:\/\/tracky\.desprets\.net/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /\/tracky-icon\.png/);
});

test("uses a standard Next.js Railway-compatible runtime", async () => {
  const [packageJson, css] = await Promise.all([
    readFile(packagePath, "utf8"),
    readFile(cssPath, "utf8"),
  ]);

  assert.match(packageJson, /"dev": "next dev"/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"start": "next start -p \$\{PORT:-3000\}"/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|cloudflare/i);
  assert.match(css, /prefers-reduced-motion/);

  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/tracky-icon.png", import.meta.url)),
    access(new URL("../public/screens/track.jpg", import.meta.url)),
    access(new URL("../public/screens/history.jpg", import.meta.url)),
    access(new URL("../public/screens/day.jpg", import.meta.url)),
  ]);
});
