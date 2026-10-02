// Exercise 6.2: filter buttons

let allData = [];
let innerChart, yAxisGroup;

// Exercise 6.1: Histogram 
function drawHistogram(data) {
  allData = data; 

  // SVG container and inner chart
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Exercise 6.2: filter buttons
  // Scale domains come from the full data set so the axes stay fixed when filtering
  const bins = binGenerator(allData);
  const minX = bins[0].x0;
  const maxX = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);
  xScale.domain([minX, maxX]);
  yScale.domain([0, binsMaxLength]).nice();

  // Axes
  innerChart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format(",")));

  yAxisGroup = innerChart.append("g")
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

  updateHistogram();
}

function updateHistogram() {
  // Apply both filters; "all" means no filtering for that filter
  const updatedData = allData.filter(d =>
    (filterState.screenTech === "all" || d.screenTech === filterState.screenTech) &&
    (filterState.screenSize === "all" || d.screenSize === +filterState.screenSize)
  );

  const updatedBins = binGenerator(updatedData);
  console.log("Filtered rows:", updatedData.length, filterState);

  if (rescaleYAxis) {
    yScale.domain([0, d3.max(updatedBins, d => d.length) || 1]).nice();
    yAxisGroup.transition().duration(transitionDuration).ease(transitionEase)
      .call(d3.axisLeft(yScale).tickFormat(d3.format(",")));
  }

  innerChart.selectAll("rect")
    .data(updatedBins)
    .join(
      enter => enter.append("rect")
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", chartHeight)
        .attr("height", 0)
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2)
    )
    .transition()
    .duration(transitionDuration)
    .ease(transitionEase)
    .attr("y", d => yScale(d.length))
    .attr("height", d => chartHeight - yScale(d.length));
}