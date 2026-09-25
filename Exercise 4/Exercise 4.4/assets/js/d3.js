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