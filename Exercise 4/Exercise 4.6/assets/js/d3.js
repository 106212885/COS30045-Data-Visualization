// Exercise 4.5: D3 binding and drawing with data

const drawBarChart = data => {

  const barHeight = 20;   // thickness of each bar
  const spacing = 4;      // gap between bars

  // Step 1: bind the data to a rect for each row, giving each one a class
  // tied to its count value so it can be targeted individually if needed
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar bar-${d.count}`)

      // Step 2: make the bars visible
      // width is driven by the data (d.count), height by our constant
      .attr("width", d => d.count)
      .attr("height", barHeight)
      .attr("fill", "blue")

      // Step 3: space the bars out along the y-axis
      // x always starts at 0, y depends on each bar's position in the array
      .attr("x", 0)
      .attr("y", (d, i) => i * (barHeight + spacing));

};


// Exercise 4.3: D3 set up

// Step 1: the Exercise 4.2 code (selecting the h1, appending a paragraph
// and a rectangle with no data behind them) has been deleted here, as
// instructed. Only the script tags loading the D3 library and this file,
// in index.html, remain from that exercise.
 
// Step 2: create the svg canvas inside the responsive container
const svg = d3.select(".responsive-svg-container") 
    .append("svg")
      .attr("viewBox", "0 0 500 1600") // => change from 1200 (exercise 4.3) to 500 (exercise 4.6) to fit the data better
      .style("border", "1px solid black");

// Step 3 (originally): add a hard coded test rectangle to confirm the canvas works


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
 