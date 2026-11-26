// Nusantara Stats — router and page renderers. Hash routes, so every page is
// reached by a link and the back button works. All content is rendered from
// data.js; charts are drawn on canvas by charts.js.

import { DATA } from "./data.js";
import { drawBarChart, drawHBarChart, drawLineChart } from "./charts.js";

const root = document.getElementById("page");
const navLinks = [...document.querySelectorAll("[data-route]")];

const ROUTES = {
  "/": renderHome,
  "/population": renderPopulation,
  "/economy": renderEconomy,
  "/health": renderHealth,
  "/education": renderEducation,
  "/work": renderWork,
  "/regions": renderRegions,
  "/sources": renderSources,
};

const TITLES = {
  "/": "Indonesia in numbers",
  "/population": "Population",
  "/economy": "Economy",
  "/health": "Health",
  "/education": "Education",
  "/work": "Work & jobs",
  "/regions": "Regions",
  "/sources": "Sources & methods",
};

function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const render = ROUTES[hash] || renderNotFound;
  navLinks.forEach((a) => a.classList.toggle("active", a.dataset.route === hash));
  render();
  window.scrollTo(0, 0);
}

function card(k) {
  return `<article class="stat-card">
    <div class="stat-label">${k.label}</div>
    <div class="stat-value">${k.value}</div>
    <div class="stat-meta">${k.year} · ${k.source}</div>
    <div class="stat-note">${k.note}</div>
  </article>`;
}

function tableRow(label, value, year, source) {
  return `<tr><th scope="row">${label}</th><td>${value}</td><td>${year}</td><td>${source}</td></tr>`;
}

function sourceNote(text) {
  return `<p class="source-note">Source: ${text}</p>`;
}

function renderHome() {
  root.innerHTML = `
  <section class="hero">
    <p class="eyebrow">National statistics · Indonesia</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">283.5 million people, the world's 4th largest population and its 16th
    largest economy — every figure on this site comes from the World Bank, Statistics
    Indonesia (BPS) or the UNDP, with the year and source printed beside it.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/economy">Explore the economy</a>
      <a class="btn" href="#/regions">Compare provinces</a>
    </div>
  </section>
  <section class="grid stats-grid">${DATA.keyIndicators.map(card).join("")}</section>
  <section class="panel">
    <div class="panel-head"><h2>Population growth, 2015–2024</h2>
    <a class="panel-link" href="#/population">Full population page →</a></div>
    <canvas id="home-pop" class="chart" height="260" aria-label="Line chart of Indonesia's population, 2015 to 2024, rising from 261.8 to 283.5 million"></canvas>
    ${sourceNote("World Bank, World Development Indicators.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Latest releases</h2></div>
    <ul class="releases">${DATA.releases.map((r) => `<li><span class="release-date">${r.date}</span><strong>${r.title}</strong><span>${r.detail}</span></li>`).join("")}</ul>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Browse by topic</h2></div>
    <div class="topic-links">
      <a href="#/population">Population →</a><a href="#/economy">Economy →</a>
      <a href="#/health">Health →</a><a href="#/education">Education →</a>
      <a href="#/work">Work &amp; jobs →</a><a href="#/regions">Regions →</a>
    </div>
  </section>`;
  drawLineChart(document.getElementById("home-pop"), DATA.population, { color: "#0e7490", format: "millions", zeroBaseline: false });
}

function renderPopulation() {
  root.innerHTML = `
  <section class="page-head"><h1>Population</h1>
  <p class="lede">Indonesia is the world's 4th most populous country. Growth has slowed to
  0.8% a year, and the population is ageing: 7.3% are now 65 or older.</p></section>
  <section class="grid stats-grid">
    ${card({ label: "Population", value: "283.5 million", year: "2024", source: "World Bank", note: "4th in the world" })}
    ${card({ label: "Population growth", value: "0.8%", year: "2024", source: "World Bank", note: "Down from 1.1% in 2015" })}
    ${card({ label: "Median age", value: "31.8 years", year: "2025 est.", source: "CIA World Factbook", note: "A young country" })}
    ${card({ label: "Density", value: "149 / km²", year: "2024", source: "World Bank", note: "Highly concentrated on Java" })}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Population, 2015–2024</h2>
    <div class="toggle" role="group" aria-label="Chart range">
      <button id="pop-all" class="toggle-btn active">2015–2024</button>
      <button id="pop-recent" class="toggle-btn">2020–2024</button>
    </div></div>
    <canvas id="pop-chart" class="chart" height="280" aria-label="Line chart of population by year"></canvas>
    ${sourceNote("World Bank, World Development Indicators.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Age structure, 2024</h2></div>
    <canvas id="age-chart" class="chart" height="220" aria-label="Horizontal bar chart of age groups"></canvas>
    ${sourceNote("World Bank, World Development Indicators. Children 24.6%, working age 68.1%, seniors 7.3%.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Largest provinces</h2><a class="panel-link" href="#/regions">All provinces →</a></div>
    <table class="data-table"><thead><tr><th>Province</th><th>Population</th><th>Capital</th></tr></thead>
    <tbody>${DATA.provinces.slice(0, 6).map((p) => `<tr><td>${p.name}</td><td>${p.pop.toFixed(2)} million</td><td>${p.capital}</td></tr>`).join("")}</tbody></table>
    ${sourceNote("BPS, 2020 Population Census.")}
  </section>`;
  const draw = (series) => drawLineChart(document.getElementById("pop-chart"), series, { color: "#0e7490", format: "millions", zeroBaseline: false });
  draw(DATA.population);
  drawHBarChart(document.getElementById("age-chart"), DATA.ageStructure.map((a) => ({ name: a.group, value: a.share })), { color: "#0369a1", format: "percent" });
  const allBtn = document.getElementById("pop-all");
  const recBtn = document.getElementById("pop-recent");
  allBtn.addEventListener("click", () => { allBtn.classList.add("active"); recBtn.classList.remove("active"); draw(DATA.population); });
  recBtn.addEventListener("click", () => { recBtn.classList.add("active"); allBtn.classList.remove("active"); draw(DATA.population.slice(5)); });
}

function renderEconomy() {
  root.innerHTML = `
  <section class="page-head"><h1>Economy</h1>
  <p class="lede">A US$ 1.4 trillion economy that has grown about 5% a year since 2022.
  Manufacturing is the largest sector; exports beat imports by US$ 31 billion in 2024.</p></section>
  <section class="grid stats-grid">
    ${card({ label: "GDP", value: "US$ 1,396 bn", year: "2024", source: "World Bank", note: "16th largest economy" })}
    ${card({ label: "GDP per capita", value: "US$ 4,925", year: "2024", source: "World Bank", note: "Upper-middle income" })}
    ${card({ label: "GDP growth", value: "5.03%", year: "2024", source: "BPS", note: "Real, year on year" })}
    ${card({ label: "Inflation", value: "1.57%", year: "2024", source: "BPS", note: "Consumer prices" })}
  </section>
  <section class="panel">
    <div class="panel-head"><h2 id="econ-title">GDP, current US$</h2>
    <div class="toggle" role="group" aria-label="Economy chart metric">
      <button id="econ-gdp" class="toggle-btn active">GDP</button>
      <button id="econ-growth" class="toggle-btn">Growth %</button>
      <button id="econ-capita" class="toggle-btn">Per capita</button>
    </div></div>
    <canvas id="econ-chart" class="chart" height="280" aria-label="Chart of the selected economic indicator"></canvas>
    ${sourceNote("GDP and per capita: World Bank. Growth: BPS.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>What the economy is made of</h2></div>
    <canvas id="sector-chart" class="chart" height="330" aria-label="Horizontal bar chart of GDP shares by sector"></canvas>
    ${sourceNote("BPS, share of GDP, 2024 (rounded).")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Trade &amp; investment, 2024</h2></div>
    <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
    <tbody>${DATA.trade.map((t) => tableRow(t.label, t.value, t.year, t.source)).join("")}</tbody></table>
  </section>`;
  const canvas = document.getElementById("econ-chart");
  const title = document.getElementById("econ-title");
  const modes = {
    gdp: { series: DATA.gdp, format: "usd-bn", title: "GDP, current US$ (billions)", draw: drawBarChart },
    growth: { series: DATA.gdpGrowth, format: "percent", title: "Real GDP growth, % per year", draw: drawBarChart },
    capita: { series: DATA.gdpPerCapita, format: undefined, title: "GDP per capita, current US$", draw: drawLineChart },
  };
  let current = "gdp";
  const show = (key) => {
    current = key;
    const m = modes[key];
    title.textContent = m.title;
    m.draw(canvas, m.series, { color: key === "growth" ? "#15803d" : "#0e7490", format: m.format });
    document.querySelectorAll("#econ-gdp, #econ-growth, #econ-capita").forEach((b) => b.classList.toggle("active", b.id === "econ-" + key));
  };
  show("gdp");
  document.getElementById("econ-gdp").addEventListener("click", () => show("gdp"));
  document.getElementById("econ-growth").addEventListener("click", () => show("growth"));
  document.getElementById("econ-capita").addEventListener("click", () => show("capita"));
  drawHBarChart(document.getElementById("sector-chart"), DATA.sectors.map((s) => ({ name: s.name, value: s.share })), { color: "#15803d", format: "percent" });
}

function renderHealth() {
  root.innerHTML = `
  <section class="page-head"><h1>Health</h1>
  <p class="lede">Indonesians live 71.3 years on average — 73.4 for women, 69.2 for men.
  Maternal deaths remain high at 140 per 100,000 live births.</p></section>
  <section class="grid stats-grid">
    ${card({ label: "Life expectancy", value: "71.3 years", year: "2024", source: "World Bank", note: "World average: 73.5" })}
    ${card({ label: "Women", value: "73.4 years", year: "2024", source: "World Bank", note: "4.2 years more than men" })}
    ${card({ label: "Men", value: "69.2 years", year: "2024", source: "World Bank", note: "Below the world average" })}
    ${card({ label: "Maternal mortality", value: "140 / 100,000", year: "2023", source: "World Bank", note: "Per 100,000 live births" })}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Health indicators</h2></div>
    <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
    <tbody>${DATA.health.map((t) => tableRow(t.label, t.value, t.year, t.source)).join("")}</tbody></table>
    <p class="source-note">Fertility is at replacement level (2.1) and 58.8% of Indonesians live in towns and cities.</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Life expectancy vs the world</h2></div>
    <canvas id="health-chart" class="chart" height="200" aria-label="Bar chart comparing life expectancy"></canvas>
    ${sourceNote("World Bank, 2024. World average 73.5 years.")}
  </section>`;
  drawHBarChart(document.getElementById("health-chart"), [
    { name: "Indonesia, women", value: 73.4 },
    { name: "World average", value: 73.5 },
    { name: "Indonesia, total", value: 71.3 },
    { name: "Indonesia, men", value: 69.2 },
  ], { color: "#be185d", format: undefined });
}

function renderEducation() {
  root.innerHTML = `
  <section class="page-head"><h1>Education</h1>
  <p class="lede">Nearly every young Indonesian can read and write. Adults average 9 years of
  schooling, and the UNDP puts Indonesia at 0.728 on the Human Development Index.</p></section>
  <section class="grid stats-grid">
    ${card({ label: "Human Development Index", value: "0.728", year: "2023", source: "UNDP", note: "High human development" })}
    ${card({ label: "Adult literacy", value: "96.0%", year: "2023", source: "BPS", note: "Ages 15 and over" })}
    ${card({ label: "Youth literacy", value: "99.7%", year: "2023", source: "BPS", note: "Ages 15–24" })}
    ${card({ label: "Mean years of schooling", value: "9.0 years", year: "2024", source: "BPS", note: "Population aged 25+" })}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Education indicators</h2></div>
    <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
    <tbody>${DATA.education.map((t) => tableRow(t.label, t.value, t.year, t.source)).join("")}</tbody></table>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Literacy, % of age group</h2></div>
    <canvas id="edu-chart" class="chart" height="180" aria-label="Bar chart of literacy rates"></canvas>
    ${sourceNote("BPS, 2023.")}
  </section>`;
  drawHBarChart(document.getElementById("edu-chart"), [
    { name: "Youth literacy (15–24)", value: 99.7 },
    { name: "Adult literacy (15+)", value: 96.0 },
  ], { color: "#7c3aed", format: "percent" });
}

function renderWork() {
  root.innerHTML = `
  <section class="page-head"><h1>Work &amp; jobs</h1>
  <p class="lede">Unemployment is at its lowest in years — 4.85% — but most work is informal:
  57.9% of workers have no contract or social protection.</p></section>
  <section class="grid stats-grid">
    ${card({ label: "Unemployment (TPT)", value: "4.85%", year: "Aug 2025", source: "BPS", note: "7.46 million people" })}
    ${card({ label: "Labour force", value: "153.05 million", year: "Feb 2025", source: "BPS", note: "70.3% participate" })}
    ${card({ label: "Informal workers", value: "57.9%", year: "Aug 2025", source: "BPS", note: "No contract or protection" })}
    ${card({ label: "Avg. wage", value: "Rp 3.33m / month", year: "Aug 2025", source: "BPS", note: "Employees, average" })}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Unemployment, 2015–2025</h2></div>
    <canvas id="work-chart" class="chart" height="280" aria-label="Line chart of the open unemployment rate"></canvas>
    ${sourceNote("BPS, open unemployment rate (TPT), August each year. The 2020 spike is the COVID-19 pandemic.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Poverty is falling as jobs recover</h2></div>
    <canvas id="pov-chart" class="chart" height="260" aria-label="Line chart of the poverty rate"></canvas>
    ${sourceNote("BPS, poverty headcount, March each year. 8.47% in March 2025 is the lowest ever recorded.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Labour indicators</h2></div>
    <table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
    <tbody>${DATA.work.map((t) => tableRow(t.label, t.value, t.year, t.source)).join("")}</tbody></table>
  </section>`;
  drawLineChart(document.getElementById("work-chart"), DATA.unemployment, { color: "#b45309", format: "percent" });
  drawLineChart(document.getElementById("pov-chart"), DATA.poverty, { color: "#15803d", format: "percent" });
}

function renderRegions() {
  root.innerHTML = `
  <section class="page-head"><h1>Regions</h1>
  <p class="lede">Java holds more than half of all Indonesians. Search the table or sort it to
  compare the twelve largest provinces from the 2020 Population Census.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Provinces by population</h2>
    <div class="controls">
      <input id="region-search" type="search" placeholder="Search a province…" aria-label="Search provinces">
      <button id="sort-name" class="toggle-btn">Sort A–Z</button>
      <button id="sort-pop" class="toggle-btn active">Sort by size</button>
    </div></div>
    <canvas id="region-chart" class="chart" height="360" aria-label="Horizontal bar chart of province populations"></canvas>
    ${sourceNote("BPS, 2020 Population Census, millions of people.")}
    <table class="data-table"><thead><tr><th>Province</th><th>Population</th><th>Capital</th><th>Share of Indonesia</th></tr></thead>
    <tbody id="region-rows"></tbody></table>
  </section>`;
  const rows = document.getElementById("region-rows");
  const chart = document.getElementById("region-chart");
  const search = document.getElementById("region-search");
  const sortName = document.getElementById("sort-name");
  const sortPop = document.getElementById("sort-pop");
  let sortKey = "pop";
  let query = "";
  const total = 270.2; // 2020 census total, millions (BPS)
  function view() {
    let list = DATA.provinces.filter((p) => p.name.toLowerCase().includes(query));
    list = [...list].sort((a, b) => (sortKey === "name" ? a.name.localeCompare(b.name) : b.pop - a.pop));
    rows.innerHTML = list.length
      ? list.map((p) => `<tr><td>${p.name}</td><td>${p.pop.toFixed(2)} million</td><td>${p.capital}</td><td>${((p.pop / total) * 100).toFixed(1)}%</td></tr>`).join("")
      : `<tr><td colspan="4">No province matches “${query}”. Try another search.</td></tr>`;
    drawHBarChart(chart, list.map((p) => ({ name: p.name, value: p.pop })), { color: "#0e7490", format: "millions" });
  }
  search.addEventListener("input", () => { query = search.value.trim().toLowerCase(); view(); });
  sortName.addEventListener("click", () => { sortKey = "name"; sortName.classList.add("active"); sortPop.classList.remove("active"); view(); });
  sortPop.addEventListener("click", () => { sortKey = "pop"; sortPop.classList.add("active"); sortName.classList.remove("active"); view(); });
  view();
}

function renderSources() {
  root.innerHTML = `
  <section class="page-head"><h1>Sources &amp; methods</h1>
  <p class="lede">Every number on this site is copied from an official release and labelled
  with its source and year. Nothing here is estimated by this site.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Where the numbers come from</h2></div>
    <table class="data-table"><thead><tr><th>Publisher</th><th>What we use</th><th>Access</th></tr></thead><tbody>
    <tr><td>World Bank — World Development Indicators</td><td>Population, GDP, GDP per capita, life expectancy, fertility, urban share, maternal mortality, FDI</td><td>data.worldbank.org (CC BY 4.0)</td></tr>
    <tr><td>Statistics Indonesia (BPS)</td><td>GDP growth, poverty, unemployment, labour force, wages, inflation, trade, literacy, schooling, census populations</td><td>bps.go.id</td></tr>
    <tr><td>UNDP — Human Development Report</td><td>Human Development Index, expected years of schooling</td><td>hdr.undp.org</td></tr>
    <tr><td>CIA World Factbook</td><td>Land area, median age</td><td>cia.gov/the-world-factbook</td></tr>
    </tbody></table>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>How to read the figures</h2></div>
    <ul class="methods">
      <li><strong>Years differ by indicator.</strong> Each card, row and chart states its own year; the site never mixes years into one snapshot.</li>
      <li><strong>Poverty</strong> is the BPS headcount in March each year; the March 2025 figure (8.47%) is the lowest ever recorded.</li>
      <li><strong>Unemployment (TPT)</strong> is the BPS open unemployment rate in August each year.</li>
      <li><strong>Provinces</strong> use the 2020 Population Census; the census total was 270.2 million people.</li>
      <li><strong>GDP</strong> is in current US dollars; growth is real (constant-price) growth from BPS.</li>
      <li><strong>Rounding.</strong> Sector shares are rounded to one decimal and may not sum to exactly 100%.</li>
    </ul>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>About this site</h2></div>
    <p>Nusantara Stats is an independent, original presentation of public statistics about
    Indonesia. It is not affiliated with the World Bank, BPS, the UNDP or the CIA, and it
    copies no other site's design, text or images. Built as static files: it runs entirely
    offline, on desktop and on phones, with no network request.</p>
  </section>`;
}

function renderNotFound() {
  root.innerHTML = `<section class="page-head"><h1>Page not found</h1>
  <p class="lede">That page does not exist on this site.</p>
  <p><a class="btn primary" href="#/">Back to the overview</a></p></section>`;
}

window.addEventListener("hashchange", route);
route();
