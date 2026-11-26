// Check every route of Nusantara Stats for JS errors and empty renders.
import { chromium } from "playwright-core";
const base = process.argv[2] ?? "http://localhost:8080";
const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,
  args: ["--enable-unsafe-swiftshader", "--no-sandbox"],
});
const routes = ["/", "/population", "/economy", "/health", "/education", "/work", "/regions", "/sources", "/nope"];
let fail = 0;
for (const r of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`${base}/#${r}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const text = (await page.evaluate(() => document.getElementById("page").innerText)).trim();
  const h1 = await page.evaluate(() => document.querySelector("h1")?.innerText ?? "(no h1)");
  const ok = errors.length === 0 && text.length > 100;
  if (!ok) fail++;
  console.log(r, "| h1:", h1, "| chars:", text.length, "| errors:", errors.length ? errors.join(" | ") : "none", "|", ok ? "OK" : "FAIL");
  await page.close();
}
// Interaction checks on regions page
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(`${base}/#/regions`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.fill("#region-search", "java");
await page.waitForTimeout(300);
const rows = await page.evaluate(() => document.querySelectorAll("#region-rows tr").length);
console.log("regions search 'java' rows:", rows, rows === 3 ? "OK" : "FAIL");
if (rows !== 3) fail++;
await page.fill("#region-search", "");
await page.click("#sort-name");
await page.waitForTimeout(300);
const first = await page.evaluate(() => document.querySelector("#region-rows tr td").innerText);
console.log("regions sort A-Z first:", first, first === "Banten" ? "OK" : "FAIL");
if (first !== "Banten") fail++;
// Economy toggle
await page.goto(`${base}/#/economy`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.click("#econ-growth");
await page.waitForTimeout(300);
const title = await page.evaluate(() => document.getElementById("econ-title").innerText);
console.log("economy toggle title:", title, title.includes("growth") ? "OK" : "FAIL");
if (!title.includes("growth")) fail++;
await browser.close();
console.log(fail === 0 ? "ALL CHECKS PASSED" : `FAILURES: ${fail}`);
process.exit(fail === 0 ? 0 : 1);
