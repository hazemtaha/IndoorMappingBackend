(function() {
    'use strict';

    angular
        .module('IM_module')
        .directive('barChart', barChart);

        barChart.$inject = ['statisticsData'];
    /* @ngInject */
    function barChart(statisticsData) {
        var barChart = {
            restrict: 'E',
            scope: {},
            link: linkFunc,
        };

        return barChart;

        function linkFunc(scope, el, attr, ctrl) {
          var data = d3.values(statisticsData.PerBlock());
          var margin = {
                  top: 20,
                  right: 30,
                  bottom: 30,
                  left: 40
              },
              width = 500 - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;

          // bars width scale
          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .2);
          // bars height scale
          var y = d3.scale.linear()
              .range([height, 0]);

          // positioning x
          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");
          // positioning y
          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");
          // injecting group element to group shapes in it
          var chart = d3.select(el[0])
              .append('svg')
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // convert x values to a suitable range
          x.domain(data.map(function(d) {
              return d.blockName;
          }));
          // convert y values to a suitable range
          y.domain([0, d3.max(data, function(d) {
              return d.visitorsNum;
          })]);


          chart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          chart.append("g")
              .attr("class", "y axis")
              .call(yAxis);

          chart.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) {
                  return x(d.blockName);
              })
              .attr("y", function(d) {
                  return y(d.visitorsNum);
              })
              .attr("height", function(d) {
                  return height - y(d.visitorsNum);
              })
              .attr("width", x.rangeBand());
          chart.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 5)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Visitors Number per Block");
          // });

          function type(d) {
              d.visitorsNum = +d.visitorsNum;
              return d;
          }

        }
    }

})();
