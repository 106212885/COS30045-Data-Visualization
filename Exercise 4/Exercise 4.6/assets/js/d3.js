// Exercise 4.6: Scaling charts
const drawBarChart = data => {

  // Step 1: linear scale for the count data (x-axis)
  // domain covers 0 up to a bit above our highest count (1096), giving
  // some headroom. range is kept inside the viewBox width (600), leaving
  // 200px of space on the right for labels in Exercise 4.7
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 400]);

  // Step 2: band scale for the brand categories (y-axis)
  // domain is every brand name in the data, range is the chart height.
  // padding adds a gap between bars instead of them sitting flush together
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 800])
    .padding(0.2);


// Exercise 4.5: D3 binding and drawing with data

  // Step 1: bind the data to a rect for each row, giving each one a class
  // tied to its count value so it can be targeted individually if needed
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => `bar bar-${d.count}`)


    // Exercise 4.6: Scaling charts (xScale and yScale)

      // Step 2: width now comes from the linear scale instead of the raw
      // count value, so it always fits inside the svg
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "blue")

      // Step 3: y position and bar thickness now come from the band scale
      .attr("x", 0)
      .attr("y", d => yScale(d.brand));

};


// Exercise 4.3: D3 set up

// Step 1: the Exercise 4.2 code (selecting the h1, appending a paragraph
// and a rectangle with no data behind them) has been deleted here, as
// instructed. Only the script tags loading the D3 library and this file,
// in index.html, remain from that exercise.
 
// Step 2: create the svg canvas inside the responsive container
const svg = d3.select(".responsive-svg-container") 
    .append("svg")
      .attr("viewBox", "0 0 600 800") // => change it to 600 x 800
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
 