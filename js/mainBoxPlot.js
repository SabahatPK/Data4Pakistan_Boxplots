BoxPlot = function(
  _parentElement,
  _x,
  _y,
  _Province,
  _indicator,
  _provinceData,
  _domain
) {
  this.parentElement = _parentElement;
  this.x = _x;
  this.y = _y;
  this.Province = _Province;
  this.indicator = _indicator;
  this.provinceData = _provinceData;
  this.domain = _domain;

  this.initVis();
};

//OUTS - reading assignement:
//https://uxdesign.cc/design-better-data-tables-4ecc99d23356
//https://medium.com/nona-web/data-tables-best-practices-f5edbb917823
//https://medium.com/mission-log/design-better-data-tables-430a30a00d8c

BoxPlot.prototype.initVis = function() {
  let vis = this;

  console.log(vis.domain);

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
      vis.extent = d3.extent(d, function(g) {
        return g[vis.indicator];
      });

      //OUTS: read this: http://learnjsdata.com/group_data.html

      return {
        q1: vis.q1,
        median: vis.median,
        q3: vis.q3,
        interQuantileRange: vis.interQuantileRange,
        min: vis.extent[0],
        max: vis.extent[1]
      };
    })
    .entries(vis.provinceData);

  // Show the X scale
  vis.x.domain(vis.domain); //This does not change per boxplot so this could move back to main.js. Along with the code right below.

  //outs - why can't this be in main.js; also spread out tick labels; use tick():
  vis.parentElement
    .append("g")
    .attr("transform", "translate(0,360)") //move to main; use variables from that file.
    .call(d3.axisBottom(vis.x));

  vis.parentElement
    .append("text")
    .attr("class", "title")
    .attr("x", 60)
    .attr("y", 15)
    .text(vis.indicator);

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
    .style("width", 40);

  // rectangle for the main box
  vis.boxWidth = 75;
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
    .style("fill", "#69b3a2");

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
    .style("width", 80);

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
    .attr("stroke", "black");
};

BoxPlot.prototype.wrangleData = function() {
  let vis = this;
  vis.updateVis();
};

BoxPlot.prototype.updateVis = function() {
  let vis = this;
};
