# Exercise 3 – Data Story: TV Energy Consumption

# COS30045 – Data Visualisation
## Appliance Energy Consumption Website

## Site Structure
- `index.html` — Home page, FAQ section
- `televisions.html` — TV energy usage info
- `storyboard.html` — Storyboard for the two data questions (Exercise 3)
- `about.html` — Project and author info

## Data Story

**Audience:** someone shopping for a new TV. Compares screen size and price, rarely thinks about running cost.

**Their interest:** they want to know if a bigger screen costs meaningfully more to run each year, so they can weigh that against the price and size they'd prefer.

**Question 1 — How frequent is each TV size?**
- Histogram (bin size 20) of 4,724 TVs
- Most common size: 120–140cm (1,251 models)
- Gap found at 140–160cm (only 66 models)
- Checked against model numbers (e.g. 65" = 165.1cm) — confirmed real market gap, not a data error
- Bin size 10 = too noisy, bin size 30 = hides the gap, bin size 20 = best

**Question 2 — How does screen size affect energy consumption?**
- Converted screen size from cm to inches (Expression node)
- Grouped TVs into small (<43"), medium (44–65"), large (>66")
- Average energy use: 158 kWh/yr (small), 402 kWh/yr (medium), 743 kWh/yr (large)
- Large TVs use about 4.7× more energy than small TVs

## About the Data

**Data source**
- Dataset of Australian TV models with screen size, labelled energy consumption, screen technology, and star rating
- Provided as course material for COS30045

**Data processing**
- Converted screen size cm → inches
- Grouped TVs into small/medium/large size categories
- Removed rows missing screen size or energy value

**Privacy**
- Dataset only contains TV model specs
- No personal or household information

**Accuracy and limitations**
- Labelled energy consumption is a standard test figure, not real household usage
- Dataset is a snapshot in time, may not include newer TV models

**Ethics**
- Story aims to inform buyers about running cost, not to discourage large TVs
- Presents the trade-off (screen size vs energy cost) without pushing one choice

## AI Declaration

### Which Tool(s) Used
* Google Gemini — original site build (Exercise 0.2)
* Claude (Anthropic) — data analysis, storyboard, and Exercise 3 additions

### What GenAI Was Used For
* Guided and generated semantic HTML5 templates for site navigation (`index.html`, `televisions.html`, `about.html`)
* Created HTML page templates and CSS styling matched to the logo palette
* Structured JavaScript (`main.js`) for the interactive FAQ accordion
* Troubleshot Git deployment and commit issues in GitHub Desktop
* Analysed the TV dataset directly (bin size comparison, cm→inch conversion, size categorisation) to get real numbers
* Generated the before/after comparison charts from the dataset
* Built `storyboard.html`, matching the site's existing nav and colour palette

### What Was Changed or Adapted After Generation
* Replaced generic `<div>` containers with semantic HTML elements (`<main>`, `<section>`, `<article>`, `<button>`)
* Removed the optional interactive energy calculator and deleted `calculator.js`
* Replaced advanced DOM listeners with a beginner-friendly `toggleFAQ()` function using `onclick`
* Simplified the storyboard CSS to plain properties (no shorthand, no CSS variables) and plain characters instead of HTML entity codes

### What Was Learned
* How to connect HTML `onclick` events to JavaScript functions
* How to troubleshoot GitHub Desktop push errors and write clear commit messages
* How a chart's bin size setting can hide or reveal real patterns in data

### Limitations or Issues Encountered
* Initial AI code included advanced concepts (CSS variables, shorthand properties, HTML entities) that needed simplifying to match class teachings