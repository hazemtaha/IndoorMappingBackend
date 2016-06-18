(function() {
    'use strict';
    angular
        .module('IM_module')
        .factory('statisticsData', statisticsData);

    statisticsData.$inject = [];

    /* @ngInject */
    function statisticsData() {
        var service = {
            PerBlock: function() {
                var dataPerBlock = [] ;
                dataPerBlock["KCF"]= {blockName:"KCF" , visitorsNum:20} ;
                dataPerBlock["Mac"]= {blockName:"Mac" , visitorsNum:90} ;
                dataPerBlock["cookDoor"]= {blockName:"cookDoor" , visitorsNum:33} ;
                console.log(dataPerBlock);
                return dataPerBlock;
            }
        };
        return service;
    }
})();
