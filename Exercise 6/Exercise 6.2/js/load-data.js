// Exercise 6.1: Histogram

// Loads the TV data and hands it to the chart. Runs after D3 is available.
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  star: +d.star,
  energyConsumption: +d.energyConsumption
})).then(data => {
  console.log("Rows loaded:", data.length);
  drawHistogram(data); // Removed console.log(data[0]) from Exercise 6.1
  populateFilters(); // Exercise 6.2
}).catch(err => console.error("Data failed to load:", err));
