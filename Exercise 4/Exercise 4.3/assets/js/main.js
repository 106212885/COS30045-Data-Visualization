function toggleFAQ(answerId) {
  var answer = document.getElementById(answerId);
  answer.classList.toggle('hidden');
}

// Exercise 4.2: Manipulate and add elements to a webpage with D3

// Step 2: select an existing HTML element and change its style
d3.select("h1")
  .style("color", "green");

// Step 3: append a paragraph with text into the empty div on this page
d3.select(".d3-demo-div")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: append a rectangle to the empty svg on this page
// First append with no attributes - this exists in the DOM but is not visible
d3.select(".d3-demo-svg")
  .append("rect");

// Now append a second rectangle with attributes so it can actually be seen
d3.select(".d3-demo-svg")
  .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 30)
    .style("fill", "green");