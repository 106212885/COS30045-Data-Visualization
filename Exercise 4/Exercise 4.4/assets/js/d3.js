// Exercise 4.4
 
function drawBarChart(data) {
  console.log("drawBarChart called with:", data);
} 

// Exercise 4.3: D3 set up

// Step 1: the Exercise 4.2 code (selecting the h1, appending a paragraph
// and a rectangle with no data behind them) has been deleted here, as
// instructed. Only the script tags loading the D3 library and this file,
// in index.html, remain from that exercise.
 
// Step 2: create the svg canvas inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");
 
// Step 3: add a hard coded test rectangle to confirm the canvas works
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

// Exercise 4.4: Load data from CSV
 
// Step 1 and Step 2: read the csv, converting count from a string to a
// number so it is typed correctly for D3
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // => converts to number
  };
}).then(data => {
 
  // Step 2: check the data loaded correctly
  console.log(data);
 
  // Step 3: basic information about the data set
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // => array with min and max
 
  // Sort the data so the bar chart reads from largest to smallest count
  data.sort((a, b) => b.count - a.count);
  console.log(data);
 
  // Pass the loaded, typed, sorted data to the function that will build
  // the visualisation (created in Exercise 4.5)
  drawBarChart(data);
 
});
 