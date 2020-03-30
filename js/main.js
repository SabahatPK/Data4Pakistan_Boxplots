// set the dimensions and margins of the graph
let margin = { top: 10, right: 30, bottom: 30, left: 40 };
let width = 500 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom; //400-10-30 = 400-40 = 360

// let svg = d3
//   .select("#my_dataviz")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(40,10)");

let svg1 = d3
  .select("#my_dataviz1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(40,10)");

let svg2 = d3
  .select("#my_dataviz2")
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
  .domain([0, 100])
  .range([height, 0]);

// svg.append("g").call(d3.axisLeft(y));
svg1.append("g").call(d3.axisLeft(y));
svg2.append("g").call(d3.axisLeft(y));

// let svgTitle = svg
//   .append("text")
//   .attr("class", "title")
//   .attr("x", 60)
//   .attr("y", 15);

let svgTitle1 = svg1
  .append("text")
  .attr("class", "title")
  .attr("x", 60)
  .attr("y", 15);

let svgTitle2 = svg2
  .append("text")
  .attr("class", "title")
  .attr("x", 60)
  .attr("y", 15);

let promises = [d3.csv("data/Data4Pakistan-UnpaidEmploy.csv")];
let listAllProvinces = [];
//outs - do I need to declare these?
let boxPlotGraphBaloch,
  boxPlotGraphICT,
  boxPlotGraphSindh,
  boxPlotGraphPunjab,
  boxPlotGraphKPK;

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
  // boxPlotGraphBaloch = new BoxPlot(
  //   svg,
  //   x,
  //   y,
  //   "Balochistan",
  //   "Unpaid employment (% of total employment)",
  //   dataBaloch,
  //   listAllProvinces,
  //   svgTitle
  // );

  // boxPlotGraphKPK = new BoxPlot(
  //   svg,
  //   x,
  //   y,
  //   "Khyber Pakhtunkhwa",
  //   "Unpaid employment (% of total employment)",
  //   dataKPK,
  //   listAllProvinces,
  //   svgTitle
  // );

  // boxPlotGraphPunjab = new BoxPlot(
  //   svg,
  //   x,
  //   y,
  //   "Punjab",
  //   "Unpaid employment (% of total employment)",
  //   dataPunjab,
  //   listAllProvinces,
  //   svgTitle
  // );

  // boxPlotGraphSindh = new BoxPlot(
  //   svg,
  //   x,
  //   y,
  //   "Sindh",
  //   "Unpaid employment (% of total employment)",
  //   dataSindh,
  //   listAllProvinces,
  //   svgTitle
  // );

  // boxPlotGraphICT = new BoxPlot(
  //   svg,
  //   x,
  //   y,
  //   "Federal Capital Territory",
  //   "Unpaid employment (% of total employment)",
  //   dataICT,
  //   listAllProvinces,
  //   svgTitle
  // );

  boxPlotGraphBaloch = new BoxPlot(
    svg1,
    x,
    y,
    "Balochistan",
    "Unpaid employment, male (% of male employment)",
    dataBaloch,
    listAllProvinces,
    svgTitle1
  );

  boxPlotGraphKPK = new BoxPlot(
    svg1,
    x,
    y,
    "Khyber Pakhtunkhwa",
    "Unpaid employment, male (% of male employment)",
    dataKPK,
    listAllProvinces,
    svgTitle1
  );

  boxPlotGraphPunjab = new BoxPlot(
    svg1,
    x,
    y,
    "Punjab",
    "Unpaid employment, male (% of male employment)",
    dataPunjab,
    listAllProvinces,
    svgTitle1
  );

  boxPlotGraphSindh = new BoxPlot(
    svg1,
    x,
    y,
    "Sindh",
    "Unpaid employment, male (% of male employment)",
    dataSindh,
    listAllProvinces,
    svgTitle1
  );

  boxPlotGraphICT = new BoxPlot(
    svg1,
    x,
    y,
    "Federal Capital Territory",
    "Unpaid employment, male (% of male employment)",
    dataICT,
    listAllProvinces,
    svgTitle1
  );

  //Female data:
  boxPlotGraphBaloch = new BoxPlot(
    svg2,
    x,
    y,
    "Balochistan",
    "Unpaid employment, female (% of female employment)",
    dataBaloch,
    listAllProvinces,
    svgTitle2
  );

  boxPlotGraphKPK = new BoxPlot(
    svg2,
    x,
    y,
    "Khyber Pakhtunkhwa",
    "Unpaid employment, female (% of female employment)",
    dataKPK,
    listAllProvinces,
    svgTitle2
  );

  boxPlotGraphPunjab = new BoxPlot(
    svg2,
    x,
    y,
    "Punjab",
    "Unpaid employment, female (% of female employment)",
    dataPunjab,
    listAllProvinces,
    svgTitle2
  );

  boxPlotGraphSindh = new BoxPlot(
    svg2,
    x,
    y,
    "Sindh",
    "Unpaid employment, female (% of female employment)",
    dataSindh,
    listAllProvinces,
    svgTitle2
  );

  boxPlotGraphICT = new BoxPlot(
    svg2,
    x,
    y,
    "Federal Capital Territory",
    "Unpaid employment, female (% of female employment)",
    dataICT,
    listAllProvinces,
    svgTitle2
  );
});
