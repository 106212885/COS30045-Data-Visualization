// Exercise 6.2: filter buttons

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
