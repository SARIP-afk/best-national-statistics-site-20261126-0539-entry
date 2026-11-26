// Nusantara Stats — data for Indonesia, the country this site covers.
// Every figure below names its source and year in the page that shows it.
// Sources: World Bank World Development Indicators (WB), Statistics Indonesia
// (BPS) official releases, UNDP Human Development Report, CIA World Factbook.
// Figures were checked against those sources in November 2026; where a series
// mixes years, each row states its own year.

export const DATA = {
  country: {
    name: "Indonesia",
    officialName: "Republic of Indonesia",
    capital: "Jakarta",
    language: "Indonesian",
    currency: "Indonesian rupiah (IDR)",
    areaKm2: 1904569,
    areaSource: "CIA World Factbook, 2025",
    islands: 17508,
    provinces: 38,
    regenciesCities: 514,
  },

  // World Bank WDI, total population, millions
  population: [
    { year: 2015, value: 261.8 },
    { year: 2016, value: 264.3 },
    { year: 2017, value: 266.9 },
    { year: 2018, value: 269.5 },
    { year: 2019, value: 272.0 },
    { year: 2020, value: 274.0 },
    { year: 2021, value: 276.4 },
    { year: 2022, value: 278.7 },
    { year: 2023, value: 281.2 },
    { year: 2024, value: 283.5 },
  ],

  // World Bank WDI, GDP current US$, billions
  gdp: [
    { year: 2015, value: 860.9 },
    { year: 2016, value: 931.9 },
    { year: 2017, value: 1015.4 },
    { year: 2018, value: 1042.2 },
    { year: 2019, value: 1119.1 },
    { year: 2020, value: 1059.6 },
    { year: 2021, value: 1186.1 },
    { year: 2022, value: 1319.1 },
    { year: 2023, value: 1371.2 },
    { year: 2024, value: 1396.3 },
  ],

  // BPS, real GDP growth, percent per year
  gdpGrowth: [
    { year: 2015, value: 4.88 },
    { year: 2016, value: 5.03 },
    { year: 2017, value: 5.07 },
    { year: 2018, value: 5.17 },
    { year: 2019, value: 5.02 },
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],

  // World Bank WDI, GDP per capita current US$
  gdpPerCapita: [
    { year: 2015, value: 3288 },
    { year: 2020, value: 3867 },
    { year: 2021, value: 4291 },
    { year: 2022, value: 4733 },
    { year: 2023, value: 4876 },
    { year: 2024, value: 4925 },
  ],

  // BPS, poverty headcount, percent of population (March each year)
  poverty: [
    { year: 2015, value: 11.22 },
    { year: 2016, value: 10.86 },
    { year: 2017, value: 10.64 },
    { year: 2018, value: 9.82 },
    { year: 2019, value: 9.41 },
    { year: 2020, value: 9.78 },
    { year: 2021, value: 9.71 },
    { year: 2022, value: 9.54 },
    { year: 2023, value: 9.36 },
    { year: 2024, value: 9.03 },
    { year: 2025, value: 8.47 },
  ],

  // BPS, open unemployment rate (TPT), percent of labour force (August each year)
  unemployment: [
    { year: 2015, value: 6.18 },
    { year: 2016, value: 5.61 },
    { year: 2017, value: 5.50 },
    { year: 2018, value: 5.34 },
    { year: 2019, value: 5.28 },
    { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 },
    { year: 2024, value: 4.91 },
    { year: 2025, value: 4.85 },
  ],

  // World Bank WDI 2024, share of population
  ageStructure: [
    { group: "0–14 years", share: 24.6 },
    { group: "15–64 years", share: 68.1 },
    { group: "65+ years", share: 7.3 },
  ],

  // BPS, share of GDP, 2024 (approximate, rounded)
  sectors: [
    { name: "Manufacturing", share: 18.7 },
    { name: "Wholesale & retail trade", share: 12.9 },
    { name: "Agriculture & fishing", share: 12.0 },
    { name: "Construction", share: 10.0 },
    { name: "Mining & quarrying", share: 7.9 },
    { name: "Transportation & storage", share: 5.6 },
    { name: "Information & comms", share: 4.4 },
    { name: "Financial services", share: 4.2 },
    { name: "All other services", share: 24.3 },
  ],

  // 2020 Population Census (BPS), millions — ten largest provinces
  provinces: [
    { name: "West Java", pop: 48.27, capital: "Bandung" },
    { name: "East Java", pop: 40.67, capital: "Surabaya" },
    { name: "Central Java", pop: 36.52, capital: "Semarang" },
    { name: "North Sumatra", pop: 14.80, capital: "Medan" },
    { name: "Banten", pop: 11.90, capital: "Serang" },
    { name: "Jakarta", pop: 10.56, capital: "Jakarta" },
    { name: "South Sulawesi", pop: 9.07, capital: "Makassar" },
    { name: "Lampung", pop: 9.01, capital: "Bandar Lampung" },
    { name: "South Sumatra", pop: 8.47, capital: "Palembang" },
    { name: "Riau", pop: 6.39, capital: "Pekanbaru" },
    { name: "West Sumatra", pop: 5.53, capital: "Padang" },
    { name: "East Kalimantan", pop: 3.77, capital: "Samarinda" },
  ],

  keyIndicators: [
    { label: "Population", value: "283.5 million", year: "2024", source: "World Bank", note: "4th largest in the world" },
    { label: "GDP", value: "US$ 1.40 trillion", year: "2024", source: "World Bank", note: "16th largest economy" },
    { label: "GDP per capita", value: "US$ 4,925", year: "2024", source: "World Bank", note: "Upper-middle income" },
    { label: "GDP growth", value: "5.03%", year: "2024", source: "BPS", note: "Real, year on year" },
    { label: "Life expectancy", value: "71.3 years", year: "2024", source: "World Bank", note: "69.2 men · 73.4 women" },
    { label: "Poverty rate", value: "8.47%", year: "Mar 2025", source: "BPS", note: "23.85 million people" },
    { label: "Unemployment", value: "4.85%", year: "Aug 2025", source: "BPS", note: "Open unemployment (TPT)" },
    { label: "Human Development Index", value: "0.728", year: "2023", source: "UNDP", note: "High human development" },
  ],

  health: [
    { label: "Life expectancy at birth", value: "71.3 years", year: "2024", source: "World Bank" },
    { label: "Life expectancy, women", value: "73.4 years", year: "2024", source: "World Bank" },
    { label: "Life expectancy, men", value: "69.2 years", year: "2024", source: "World Bank" },
    { label: "Maternal mortality ratio", value: "140 per 100,000 live births", year: "2023", source: "World Bank" },
    { label: "Fertility rate", value: "2.1 births per woman", year: "2023", source: "World Bank" },
    { label: "Urban population", value: "58.8%", year: "2024", source: "World Bank" },
  ],

  education: [
    { label: "Human Development Index", value: "0.728", year: "2023", source: "UNDP" },
    { label: "Adult literacy rate", value: "96.0%", year: "2023", source: "BPS" },
    { label: "Youth literacy rate (15–24)", value: "99.7%", year: "2023", source: "BPS" },
    { label: "Mean years of schooling", value: "9.0 years", year: "2024", source: "BPS" },
    { label: "Expected years of schooling", value: "12.7 years", year: "2023", source: "UNDP" },
  ],

  work: [
    { label: "Labour force", value: "153.05 million", year: "Feb 2025", source: "BPS" },
    { label: "Open unemployment (TPT)", value: "4.85%", year: "Aug 2025", source: "BPS" },
    { label: "Unemployed people", value: "7.46 million", year: "Aug 2025", source: "BPS" },
    { label: "Informal workers", value: "57.9% of workers", year: "Aug 2025", source: "BPS" },
    { label: "Labour force participation", value: "70.3%", year: "Aug 2025", source: "BPS" },
    { label: "Average monthly wage (employee)", value: "Rp 3.33 million", year: "Aug 2025", source: "BPS" },
  ],

  trade: [
    { label: "Exports", value: "US$ 264.7 billion", year: "2024", source: "BPS" },
    { label: "Imports", value: "US$ 233.7 billion", year: "2024", source: "BPS" },
    { label: "Trade balance", value: "US$ +31.0 billion surplus", year: "2024", source: "BPS" },
    { label: "Inflation (CPI)", value: "1.57%", year: "2024", source: "BPS" },
    { label: "Foreign direct investment", value: "US$ 24.2 billion", year: "2024", source: "World Bank" },
  ],

  releases: [
    { date: "Nov 2025", title: "GDP grows 5.03% in 2024", detail: "BPS: real GDP growth held above 5% for a third straight year." },
    { date: "Sep 2025", title: "Poverty falls to 8.47%", detail: "BPS, March 2025: the lowest poverty rate ever recorded in Indonesia." },
    { date: "Aug 2025", title: "Unemployment at 4.85%", detail: "BPS: open unemployment eased from 4.91% a year earlier." },
    { date: "2024", title: "Population reaches 283.5 million", detail: "World Bank: Indonesia stays the world's 4th most populous country." },
  ],
};
