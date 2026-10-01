// Exercise 6.1: Histogram 

function drawHistogram(data) {
  // Remove the single extreme outlier (2,652 kWh) so the chart is not stretched; adjust if you prefer to keep it
  const filtered = data.filter(d => d.energyConsumption <= 2000);

  // SVG container and inner chart
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Bins
  const bins = binGenerator(filtered);
  console.log("Bins:", bins);

  // Scale domains
  const minX = bins[0].x0;
  const maxX = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);
  xScale.domain([minX, maxX]);
  yScale.domain([0, binsMaxLength]).nice();

  // Bars
  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
    .attr("height", d => chartHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  // Axes
  innerChart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format(",")));

  innerChart.append("g")
    .call(d3.axisLeft(yScale).tickFormat(d3.format(",")));

  // Axis labels
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", svgWidth - margin.right)
    .attr("y", svgHeight - 15)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", 10)
    .attr("y", 25)
    .text("Frequency");
}
