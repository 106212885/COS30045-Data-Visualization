// ---------- Exercise 6.1: Histogram ----------

// Chart dimensions (Dufour & Meeks inner chart approach)
const svgWidth = 1000, svgHeight = 520;
const margin = { top: 40, right: 30, bottom: 70, left: 70 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Colours
const barColor = "#7F6946";
const bodyBackgroundColor = "#FAFAF5"; // used as bar stroke to create gaps between bars
const axisColor = "#7F6946";

// Scales (ranges set here, domains set in drawHistogram)
const xScale = d3.scaleLinear().range([0, chartWidth]);
const yScale = d3.scaleLinear().range([chartHeight, 0]);

// Bin generator 
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2000]) // added this on Exercise 6.2
  .thresholds(d3.range(200, 2000, 200));

// ---------- Exercise 6.2: filter buttons ----------
// Filter definitions: id (matches the data), label (shown to users), isActive (starting state)
const screenFilters = [
  { id: "all",  label: "All",  isActive: true },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

const sizeFilters = [
  { id: "all", label: "All Sizes", isActive: true },
  { id: "24",  label: '24"',       isActive: false },
  { id: "32",  label: '32"',       isActive: false },
  { id: "55",  label: '55"',       isActive: false },
  { id: "65",  label: '65"',       isActive: false },
  { id: "98",  label: '98"',       isActive: false }
];

// Current filter selections (both filters combine)
const filterState = { screenTech: "all", screenSize: "all" };

// Transition settings (experiment with these)
const transitionDuration = 600;
const transitionEase = d3.easeCubicOut;

// Extension: set true to rescale the y-axis after every filter
const rescaleYAxis = false;


// ---------- Exercise 6.3: scatterplot ----------
// Separate names (the S is for scatterplot) so they do not clash with the histogram's
let innerChartS;
const xScaleS = d3.scaleLinear().range([0, chartWidth]);
const yScaleS = d3.scaleLinear().range([chartHeight, 0]);

// Colour scale: one hue per screen type (hue suits categories, lightness would imply magnitude)
const colorScale = d3.scaleOrdinal()
  .domain(["LED", "LCD", "OLED"])
  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);


// ---------- Exercise 6.4: tooltips ----------
// Tooltip size (scatterplot, then histogram)
const tooltipWidth = 190;
const tooltipHeight = 78;
const tooltipWidthH = 150;
const tooltipHeightH = 56;
const tooltipColorH = "#D2691E"; // color of the histogram tooltip

