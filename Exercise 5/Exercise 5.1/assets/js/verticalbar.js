// Exercise 5.1: Vertical Bar Chart with axis

const drawVerticalBarChart = data => {

    // Step 1: margins and dimensions
    const margin = { top: 40, right: 40, bottom: 50, left: 60 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Step 2: svg container
    const svg = d3.select("#vertical-bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Step 3: inner chart group, shifted by the margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Step 4: scales
    // xScale: categorical (Screen_Tech), band scale spaces the 3 bars evenly
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.2);

    // yScale: quantitative (energy consumption), inverted range since svg y grows downward
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption)])
        .range([innerHeight, 0]);

    // Step 5: axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Step 6: y-axis label
    innerChart
        .append("text")
        .attr("x", -innerHeight /2)
        .attr("y", 45)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Mean Energy Consumption (kWh/year)");

    // Step 7: chart title
    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .text("Average Energy Consumption by Screen Type (55 inch TVs)");
        
    // Step 8: bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("fill", "green");

    // Step 9: value labels on top of each bar
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 8)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => `${d.Energy_Consumption.toFixed(1)} kWh`);

    };

    // Load the data, type-convert it, then draw the chart
    d3.csv("data/Data_exercise 5.1-1.csv", d => {
        return {
            Screen_Tech: d.Screen_Tech,
            Energy_Consumption: +d["Mean (Labelled energy consumption (kWh/year))"]
        };
    }).then(data => {
        
        // check the data loaded correctly
        console.log(data);

        // sort so bars read from largest to smallest
        data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

        drawVerticalBarChart(data);

    });