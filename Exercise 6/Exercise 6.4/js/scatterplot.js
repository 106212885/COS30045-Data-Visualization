// ---------- Exercise 6.3: scatterplot (star rating vs energy consumption, coloured by screen type) ----------

let allDataS = [];

function drawScatterplot(data) {
  allDataS = data;

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  // innerChartS is declared in shared-constants.js, so no const here
  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scale domains
  const maxStar = d3.max(data, d => d.star);
  const maxEnergy = d3.max(data, d => d.energyConsumption);
  xScaleS.domain([0, maxStar]);
  yScaleS.domain([0, maxEnergy]).nice();

  // Circles
  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 5)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // Axes
  innerChartS.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS).tickFormat(d3.format(",")));

  // Axis labels
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", svgWidth - margin.right)
    .attr("y", svgHeight - 15)
    .attr("text-anchor", "end")
    .text("Star Rating");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", 10)
    .attr("y", 25)
    .text("Labeled Energy Consumption (kWh/year)");

  // Legend: one group per screen type, spaced 20px apart, top right
  const legend = innerChartS.append("g")
    .attr("transform", `translate(${chartWidth - 80}, 0)`);

  colorScale.domain().forEach((tech, i) => {
    const item = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    item.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", colorScale(tech));

    item.append("text")
      .attr("x", 22)
      .attr("y", 12)
      .style("font-size", "14px")
      .text(tech);
  });
}

// Extension: the same filter buttons also fade the scatterplot points
function updateScatterplot() {
  innerChartS.selectAll("circle")
    .transition()
    .duration(transitionDuration)
    .ease(transitionEase)
    .attr("opacity", d =>
      (filterState.screenTech === "all" || d.screenTech === filterState.screenTech) &&
      (filterState.screenSize === "all" || d.screenSize === +filterState.screenSize)
        ? 0.5 : 0.03);
}
