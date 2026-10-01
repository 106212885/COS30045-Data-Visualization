// Exercise 6.1: Histogram

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