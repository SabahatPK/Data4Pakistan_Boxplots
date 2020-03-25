BoxPlot = function(
  _parentElement,
  _x,
  _y,
  _xDisplacement,
  _Province,
  _indicator,
  _provinceData
) {
  this.parentElement = _parentElement;
  this.x = _x;
  this.y = _y;
  this.xDisplacement = _xDisplacement;
  this.Province = _Province;
  this.indicator = _indicator;
  this.provinceData = _provinceData;

  this.initVis();
};

BoxPlot.prototype.initVis = function() {
  let vis = this;

  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  vis.sumstat = d3
    .nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) {
      return d["Province"];
    })
    .rollup(function(d) {
      vis.q1 = d3.quantile(
        d
          .map(function(g) {
            return g[vis.indicator];
          })
          .sort(d3.ascending),
        0.25
      );

      vis.median = d3.quantile(
        d
          .map(function(g) {
            return g[vis.indicator];
          })
          .sort(d3.ascending),
        0.5
      );

      vis.q3 = d3.quantile(
        d
          .map(function(g) {
            return g[vis.indicator];
          })
          .sort(d3.ascending),
        0.75
      );

      vis.interQuantileRange = vis.q3 - vis.q1;
      vis.min = vis.q1 - 1.5 * vis.interQuantileRange;
      vis.max = vis.q3 + 1.5 * vis.interQuantileRange;

      //OUTS: read this: http://learnjsdata.com/group_data.html

      return {
        q1: vis.q1,
        median: vis.median,
        q3: vis.q3,
        interQuantileRange: vis.interQuantileRange,
        min: 3, //OUTS - both min and max have to be set dynamically
        max: 46
      };
    })
    .entries(vis.provinceData);

  // Show the X scale
  vis.x.domain([vis.Province]);

  // vis.parentElement
  // .append("g")
  // .attr("transform", "translate(0,360)") //move to main; use variables from that file.
  // .call(d3.axisBottom(vis.x));

  // Show the main vertical line
  vis.parentElement
    .selectAll("vertLines")
    .data(vis.sumstat)
    .enter()
    .append("line")
    .attr("x1", function(d) {
      return vis.x(d.key);
    })
    .attr("x2", function(d) {
      return vis.x(d.key);
    })
    .attr("y1", function(d) {
      return vis.y(d.value.min);
    })
    .attr("y2", function(d) {
      return vis.y(d.value.max);
    })
    .attr("stroke", "black")
    .style("width", 40)
    .attr("transform", "translate(" + vis.xDisplacement + ",0)");

  // rectangle for the main box
  vis.boxWidth = 100;
  vis.parentElement
    .selectAll("boxes")
    .data(vis.sumstat)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return vis.x(d.key) - vis.boxWidth / 2;
    })
    .attr("y", function(d) {
      return vis.y(d.value.q3);
    })
    .attr("height", function(d) {
      return vis.y(d.value.q1) - vis.y(d.value.q3);
    })
    .attr("width", vis.boxWidth)
    .attr("stroke", "black")
    .style("fill", "#69b3a2")
    .attr("transform", "translate(" + vis.xDisplacement + ",0)");

  //   Show the median
  vis.parentElement
    .selectAll("medianLines")
    .data(vis.sumstat)
    .enter()
    .append("line")
    .attr("x1", function(d) {
      return vis.x(d.key) - vis.boxWidth / 2;
    })
    .attr("x2", function(d) {
      return vis.x(d.key) + vis.boxWidth / 2;
    })
    .attr("y1", function(d) {
      return vis.y(d.value.median);
    })
    .attr("y2", function(d) {
      return vis.y(d.value.median);
    })
    .attr("stroke", "black")
    .style("width", 80)
    .attr("transform", "translate(" + vis.xDisplacement + ",0)");

  // Add individual points with jitter
  vis.jitterWidth = 50;
  vis.parentElement
    .selectAll("indPoints")
    .data(vis.provinceData)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return (
        vis.x(d["Province"]) -
        vis.jitterWidth / 2 +
        Math.random() * vis.jitterWidth
      );
    })
    .attr("cy", function(d) {
      return vis.y(d[vis.indicator]);
    })
    .attr("r", 4)
    .style("fill", "white")
    .attr("stroke", "black")
    .attr("transform", "translate(" + vis.xDisplacement + ",0)");
};

BoxPlot.prototype.wrangleData = function() {
  let vis = this;
  vis.updateVis();
};

BoxPlot.prototype.updateVis = function() {
  let vis = this;
};
