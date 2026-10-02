// ---------- Exercise 6.2: filter buttons ----------

// Builds one group of buttons inside a container div
// stateKey says which entry of filterState this group controls
function buildFilterGroup(containerId, filters, stateKey) {
  const buttons = d3.select(containerId)
    .selectAll("button")
    .data(filters)
    .join("button")
    .attr("class", "filter-button")
    .classed("active", d => d.isActive)
    .text(d => d.label)
    .on("click", function (event, d) {
      console.log("Clicked:", d.id);

      // One button active per group: switch all off, then the clicked one on
      filters.forEach(f => f.isActive = (f.id === d.id));
      buttons.classed("active", f => f.isActive);

      filterState[stateKey] = d.id;
      updateHistogram();
    });
}

function populateFilters() {
  buildFilterGroup("#filters_screen", screenFilters, "screenTech");
  buildFilterGroup("#filters_size", sizeFilters, "screenSize");
}


// ---------- Exercise 6.4: tooltips ----------

// Builds a hidden tooltip (rectangle + text lines) inside a chart's inner chart.
// The extra "lines" argument is how many text rows it needs.
function buildTooltip(parent, className, width, height, lines) {
  const tip = parent.append("g")
    .attr("class", className)
    .style("opacity", 0)                 // hidden until the mouse enters a shape
    .style("pointer-events", "none");    // so it never steals the mouse from the shape

  tip.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("rx", 6)                       // curved corners
    .attr("fill", barColor)              // same colour as the histogram bars
    .attr("opacity", 0.85);              // slightly transparent

  for (let i = 0; i < lines; i++) {
    tip.append("text")
      .attr("class", "tt-line" + i)
      .attr("x", 10)
      .attr("y", 22 + i * 20)
      .attr("fill", "white")
      .style("font-size", "13px");
  }
  return tip;
}

function createTooltip() {
  // Scatterplot tooltip: brand + model, screen size, screen type (extension: all three)
  buildTooltip(innerChartS, "tooltip", tooltipWidth, tooltipHeight, 3);
  // Histogram tooltip (extension): bin range and count
  buildTooltip(innerChart, "tooltip-hist", tooltipWidthH, tooltipHeightH, 2);

  // Park both off-chart to start with
  innerChartS.select(".tooltip").attr("transform", "translate(0, 500)");
  innerChart.select(".tooltip-hist").attr("transform", "translate(0, 500)");
}

function handleMouseEvents() {
  // ----- Scatterplot circles -----
  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      // Skip points faded out by a filter
      if (+e.target.getAttribute("opacity") < 0.1) return;

      const tip = innerChartS.select(".tooltip");
      tip.select(".tt-line0").text(`${d.brand} ${d.model}`.slice(0, 26));
      tip.select(".tt-line1").text(`Screen size: ${d.screenSize}"`);
      tip.select(".tt-line2").text(`Screen type: ${d.screenTech}`);

      // Position relative to the circle centre (read from the circle itself)
      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");
      // Keep the tooltip inside the chart: clamp sideways, flip below if too near the top
      const x = Math.min(Math.max(cx - 0.5 * tooltipWidth, 0), chartWidth - tooltipWidth);
      const y = (cy - 1.5 * tooltipHeight < 0) ? cy + 0.5 * tooltipHeight : cy - 1.5 * tooltipHeight;

      tip.attr("transform", `translate(${x}, ${y})`)
        .transition().duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      innerChartS.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)");
    });

  // ----- Histogram bars (extension) -----
  innerChart.selectAll("rect")
    .on("mouseenter", (e, d) => {
      const tip = innerChart.select(".tooltip-hist");
      tip.select(".tt-line0").text(`${d.x0} to ${d.x1} kWh/year`);
      tip.select(".tt-line1").text(`${d.length} TVs`);

      // Use the scales (not the bar's attributes) because bars may still be animating
      const cx = xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2;
      const cy = yScale(d.length);
      const x = Math.min(Math.max(cx - 0.5 * tooltipWidthH, 0), chartWidth - tooltipWidthH);
      const y = Math.max(cy - tooltipHeightH - 8, 0);

      tip.attr("transform", `translate(${x}, ${y})`)
        .transition().duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      innerChart.select(".tooltip-hist")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)");
    });
}

