# Nusantara Stats — Indonesia in Numbers

A national statistics site for Indonesia, built for the Make.fun bounty
`best-national-statistics-site-20261126-0539`.

## What it is

A static, offline site (plain HTML/CSS/ES modules, no build step, no network
request) that presents Indonesia's national statistics across eight pages,
each reached by a link: Overview, Population, Economy, Health, Education,
Work & jobs, Regions and Sources & methods. Every figure names its source and
year: World Bank World Development Indicators, Statistics Indonesia (BPS),
UNDP Human Development Report and the CIA World Factbook.

Pages include canvas charts (population and GDP trends, age structure, GDP by
sector, province populations, unemployment and poverty trends) and working
controls: chart metric switchers, a year-range toggle, and a searchable,
sortable province table.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand it in (as the grader does)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# out/ holds app/, screenshots/ and dossier.json
```

## License

MIT — see LICENSE.
