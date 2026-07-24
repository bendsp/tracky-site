import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Tracky landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tracky — Notice where your time goes<\/title>/i);
  assert.match(html, /Notice where your time goes\./);
  assert.match(html, /In TestFlight now/);
  assert.match(html, /Track anything/);
  assert.match(html, /Keep what is yours/);
  assert.match(html, /Captured in the iOS Simulator/);
  assert.match(html, /\/screens\/track\.jpg/);
  assert.match(html, /\/screens\/history\.jpg/);
  assert.match(html, /\/screens\/day\.jpg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("ships the required product and social assets", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /independent, local-first iPhone app/i);
  assert.match(layout, /https:\/\/tracky\.desprets\.net/);
  assert.match(layout, /\/og\.png/);
  assert.match(css, /prefers-reduced-motion/);

  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/screens/track.jpg", import.meta.url)),
    access(new URL("../public/screens/history.jpg", import.meta.url)),
    access(new URL("../public/screens/day.jpg", import.meta.url)),
  ]);
});
