// set the dimensions and margins of the graph
let margin = { top: 10, right: 30, bottom: 30, left: 40 };
let width = 460 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom; //400-10-30 = 400-40 = 360

let svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(40,10)");

// Show the X scale
let x = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(1)
  .paddingOuter(0.5);

svg
  .append("g")
  .attr("transform", "translate(0,360)") //move to main; use variables from that file.
  .call(d3.axisBottom(x));

// Show the Y scale
let y = d3
  .scaleLinear()
  .domain([1, 100])
  .range([height, 0]);

svg.append("g").call(d3.axisLeft(y));

let promises = [d3.csv("data/Data4Pakistan-Baloch.csv")];

Promise.all(promises).then(function(data) {
  let balochData = data[0];
  balochData.forEach(function(d) {
    d["Unpaid employment (% of total employment)"] = +d[
      "Unpaid employment (% of total employment)"
    ];

    d["Unpaid employment, male (% of male employment)"] = +d[
      "Unpaid employment, male (% of male employment)"
    ];

    d["Unpaid employment, female (% of female employment)"] = +d[
      "Unpaid employment, female (% of female employment)"
    ];
  });

  boxPlotGraphBaloch = new BoxPlot(
    svg,
    x,
    y,
    20,
    "Balochistan",
    "Unpaid employment (% of total employment)",
    balochData
  );
});
