// setting the dimensions of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// appends the svg
var svg = d3.select("#line_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Reading the data
d3.csv("FAFSA_data_T_June.csv",

  // to format variables:
  function(d){
    return { Unnamed_0 : d.Unnamed_0, ABBOTSFORDMIDDLEorSENIORHIGH : d.ABBOTSFORDMIDDLEorSENIORHIGH }
  },

  function(data) {

    // Adding X axis
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Unnamed_0; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Adding Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.ABBOTSFORDMIDDLEorSENIORHIGH; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Adding the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Unnamed_0) })
        .y(function(d) { return y(d.ABBOTSFORDMIDDLEorSENIORHIGH) })
        )

})