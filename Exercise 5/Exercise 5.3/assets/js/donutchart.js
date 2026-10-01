// Exercise 5.3: Donut Chart

const drawDonutChart = data => {
    
    // Step 1: margins and dimensions
    // instead of ineerWidth/innerHeight, size relative to radius
    // use the shortest side (minus padding) so the circle always fits
    const width = 600;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Step 2: colour scale
    // scaleOrdinal maps each category (small/med/large) to a colour
    // unlike scaleBand, there's no position involved, just a colour per category 
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.size))
        .range(d3.schemeSet2);

    // Step 3: pie generator
    // calculates the start/end angle for each slice based on its count
    // sort(null) keeps the categories in the order they appear in the data rather than re-ordering them by value
    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const pieData = pie(data);

    // Step 4: arc generator
    // innerRdius > 0 turns the pie into a donut
    // padAngle adds a small gap between slices
    // cornerRadius rounds the corners of each slice
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius)
        .padAngle(0.02)
        .cornerRadius(4);

    // Step 5: svg container, centred (0,0) in the middle of the donut
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Step 6: chart label (top-left)
    svg
        .append("text")
        .attr("x", 20)
        .attr("y", 20)
        .attr("text-anchor", "start")
        .style("font-size", "15px")
        .text("TV Screen Size Proportions");
 
    // Step 7: draw the arcs
    innerChart
        .selectAll(".slice")
        .data(pieData)
        .join("path")
        .attr("class", "slice")
        .attr("d", arcGenerator)
        .attr("fill", d => colorScale(d.data.size));
 
    // Step 8: labels
    // arcGenerator.centroid(d) finds the midpoint of each slice, which is where we want the category label to sit
    innerChart
        .selectAll(".slice-label")
        .data(pieData)
        .join("text")
        .attr("class", "slice-label")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text(d => d.data.size);
 
};
 
// Load the data, type-convert it, then draw the chart
d3.csv("data/Data_exercise 5.3.csv", d => {
    return {
        size: d.Screensize_Category,
        count: +d.Count
    };
}).then(data => {
 
    // check the data loaded correctly
    console.log(data);
 
    drawDonutChart(data);
 
});