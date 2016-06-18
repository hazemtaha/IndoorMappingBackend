(function() {
    'use strict';
    angular
        .module('IM_module')
        .factory('statisticsData', statisticsData);

    statisticsData.$inject = ['floors','buildings'];

    /* @ngInject */
    function statisticsData(floors,buildings) {
        var service = {
            perBlock: function(bid,fid) {
                var self = this ;
                self.dataPerBlock = [] ;
                // dataPerBlock["KCF"]= {blockName:"KCF" , visitorsNum:20} ;
                // dataPerBlock["Mac"]= {blockName:"Mac" , visitorsNum:90} ;
                // dataPerBlock["cookDoor"]= {blockName:"cookDoor" , visitorsNum:33} ;
                // console.log(dataPerBlock);

            buildings.getBlocks(bid , fid).success(function(data){
                 var blocksBeacons = {};
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
                     for (var x = 0; x < data.length; x++) {
                         if (vData.visits[data[x].id]) {
                            vData.visits[data[x].id].name = data[x].name;
                            // dataPerBlock = data ;
                            // console.log(vData);

                         }
                     }
                     blocks = vData;
                    console.log(blocks);
                    console.log(data);
                    angular.forEach(blocks.visits, function(block) {
                        console.log(block.visits);
                        console.log(block.name);
                        self.dataPerBlock[block.name]= {blockName:block.name , visitorsNum: block.visits }

                    });
                    console.log('test') ;
                    console.log(self.dataPerBlock) ;
                    // return self.dataPerBlock
                 });
                    //return self.dataPerBlock ;
            });


                console.log(self.dataPerBlock) ;
                console.log('dataPerBlock') ;
               return self.dataPerBlock;
            }
        };
        return service;
    }
})();
