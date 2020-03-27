// set the dimensions and margins of the graph
let margin = { top: 10, right: 30, bottom: 30, left: 40 };
let width = 500 - margin.left - margin.right;
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

// Show the Y scale
let y = d3
  .scaleLinear()
  .domain([1, 100])
  .range([height, 0]);

svg.append("g").call(d3.axisLeft(y));

let promises = [d3.csv("data/Data4Pakistan-UnpaidEmploy.csv")];
let listAllProvinces = [];
//outs - do I need to declare these?
// let boxPlotGraphBaloch;

Promise.all(promises).then(function(data) {
  data[0].forEach(function(d) {
    listAllProvinces.indexOf(d["Province"]) === -1
      ? listAllProvinces.push(d["Province"])
      : null;
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

  let dataBaloch = data[0].filter(each => each["Province"] === "Balochistan");
  let dataKPK = data[0].filter(
    each => each["Province"] === "Khyber Pakhtunkhwa"
  );
  let dataPunjab = data[0].filter(each => each["Province"] === "Punjab");
  let dataSindh = data[0].filter(each => each["Province"] === "Sindh");
  let dataICT = data[0].filter(
    each => each["Province"] === "Federal Capital Territory"
  );

  //OUTS - if one of these is not created, the x-axis still has all provinces labelled.
  //Have to build x.domain() using only the provinces that have boxplots created.
  boxPlotGraphBaloch = new BoxPlot(
    svg,
    x,
    y,
    "Balochistan",
    "Unpaid employment (% of total employment)",
    dataBaloch,
    listAllProvinces
  );

  boxPlotGraphKPK = new BoxPlot(
    svg,
    x,
    y,
    "Khyber Pakhtunkhwa",
    "Unpaid employment (% of total employment)",
    dataKPK,
    listAllProvinces
  );

  boxPlotGraphPunjab = new BoxPlot(
    svg,
    x,
    y,
    "Punjab",
    "Unpaid employment (% of total employment)",
    dataPunjab,
    listAllProvinces
  );

  boxPlotGraphSindh = new BoxPlot(
    svg,
    x,
    y,
    "Sindh",
    "Unpaid employment (% of total employment)",
    dataSindh,
    listAllProvinces
  );

  boxPlotGraphICT = new BoxPlot(
    svg,
    x,
    y,
    "Federal Capital Territory",
    "Unpaid employment (% of total employment)",
    dataICT,
    listAllProvinces
  );
});
