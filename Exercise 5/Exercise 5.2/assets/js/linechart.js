// Exercise 5.2: Scatter Plot and Line Chart

const drawLineChart = data => {

    // Step 1: margins and dimensions 
    const margin = { top: 40, right: 40, bottom: 50, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Step 2: svg container 
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Step 3: inner chart group, shifted by the margins
    const innerChart = svg 
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Step 4: scales 
    // xScale: Year, continous data so scaleLinear, using extent to get min/max in one go 
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, innerWidth]);

    // yScale: Average Price, also continous 
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.AveragePrice)])
        .nice()
        .range([innerHeight, 0]);

    // Step 5: axes 
    // tickFormat force the x-axis to shwo whole years (eg. 2004, not 2004.5)
    const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Step 6: chart label (top-left)
    svg
        .append("text")
        .attr("x", margin.left)
        .attr("y", 20)
        .attr("text-anchor", "start")
        .style("font-size", "15px")
        .text("Average Spot Price ($ per MWh)");

    // Step 7: scatter plot points
    innerChart 
        .selectAll(".point")
        .data(data)
        .join("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.AveragePrice))
        .attr("fill", "green");

    // Step 8: line generator 
    // maps each data point's year/ averagePrice through the same scales
    // used for the axes and circles, so the lines up with them
    const lineGenerator = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.AveragePrice));
        
    // Step 9: draw the line 
    innerChart 
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2);
 
};
 
// Load the data, type-convert it, then draw the chart
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
 
    // check the data loaded correctly
    console.log(data);
 
    drawLineChart(data);
 
});