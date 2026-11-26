// Screenshot Nusantara Stats with Playwright Chromium (local binary).
// Usage: node shots.mjs <base-url> <out-dir>
// Takes 4 shots: home desktop, economy desktop, regions desktop, home phone.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:8080";
const outDir = process.argv[3] ?? "screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,
  args: ["--enable-unsafe-swiftshader", "--no-sandbox"],
});

async function shot(name, url, width, height, scrollTo) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  if (scrollTo) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 140);
    }, scrollTo);
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `${outDir}/${name}`, type: "jpeg", quality: 82 });
  console.log(name, "errors:", errors.length ? errors.join(" | ") : "none");
  await page.close();
}

await shot("1-home.jpg", `${base}/#/`, 1280, 800);
await shot("2-economy.jpg", `${base}/#/economy`, 1280, 800, "#econ-chart");
await shot("3-regions.jpg", `${base}/#/regions`, 1280, 800);
await shot("4-home-phone.jpg", `${base}/#/`, 390, 844);
await browser.close();
console.log("done");
