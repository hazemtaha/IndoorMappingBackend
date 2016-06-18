(function() {
    'use strict';

    angular
        .module('IM_module')
        .directive('barChart', barChart);

        barChart.$inject = ['statisticsData', 'floors', 'buildings'];
    /* @ngInject */
    function barChart(statisticsData, floors, buildings) {
        var barChart = {
            restrict: 'E',
            scope: {floorId: '=' ,buildId: '='},
            link: linkFunc,
        };

        return barChart;

        function linkFunc(scope, el, attr, ctrl) {
          // console.log('from directive') ;
          console.log(attr) ;
          // console.log(attr.floor_id);
          buildings.getBlocks(parseInt(attr.buildid), parseInt(attr.floorid)).success(function(data) {
                   var blocksBeacons = {};
                   self.data = data;
                 for (var x = 0; x < data.length; x++) {
                     blocksBeacons[data[x].id] = [];
                     for (var y=0 ; y< data[x].beacons.length ; y++){
                         var beaconId = data[x].beacons[y].id;
                         blocksBeacons[data[x].id].push(beaconId);
                     }
                     if (!blocksBeacons[data[x].id].length) {
                         delete blocksBeacons[data[x].id];
                     }
                 }
                 var blocks;
                 floors.getvistors(blocksBeacons).success(function(vData){
                     for (var x = 0; x < self.data.length; x++) {
                         if (vData.visits[self.data[x].id]) {
                            vData.visits[self.data[x].id].name = self.data[x].name;
                            // dataPerBlock = data ;
                            // console.log(vData);
                         }
                     }
                     blocks = vData;
                     self.dataPerBlock = {}
                    console.log(blocks);
                    console.log(data);
                    angular.forEach(blocks.visits, function(block) {
                        console.log(block.visits);
                        console.log(block.name);
                        self.dataPerBlock[block.name]= { blockName: block.name , visitorsNum: block.visits }

                    });
              console.log('test') ;
              console.log(self.dataPerBlock) ;
              // return self.dataPerBlock
     if ( Object.keys(self.dataPerBlock).length > 0){
              var data = d3.values(self.dataPerBlock);

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

         }//end if
            });
          });
         

            }
        }

    })();
