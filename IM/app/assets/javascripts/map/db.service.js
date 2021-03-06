(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Db', db);

    db.$inject = ['$http', 'mapStorage', '$stateParams'];

    /* @ngInject */
    function db($http, mapStorage, $stateParams) {
        var dbServices = {
            getBlocks: getBlocks,
            saveBeacon: saveBeacon,
            saveBlock: saveBlock,
            deleteBlock: deleteBlock,
            deleteBeacon: deleteBeacon,
            exportMap: exportMap,
            importMap: importMap
        };

        return dbServices;

        function getBlocks() {
            return $http.get('/buildings/' + $stateParams.building_id + '/floors/' + $stateParams.floor_id + '/blocks.json');
        }

        function saveBlock(mapBlock) {
            var dbBlock = $.extend(true, {}, mapBlock);
            dbBlock.path = path2String(dbBlock.pathArray);
            delete dbBlock.shape;
            // console.log(mapStorage.svg.svg());
            return $http.post('/buildings/' + $stateParams.building_id + '/floors/' + $stateParams.floor_id + '/blocks.json', {
                block: dbBlock
            });
        }

        function deleteBlock(blockId) {
            return $http.delete('/buildings/' + $stateParams.building_id + '/floors/' + $stateParams.floor_id + '/blocks/' + blockId + '.json');
        }

        function deleteBeacon(beaconId) {
            return $http.delete('/beacon/'+beaconId+'.json');
        }

        function saveBeacon(mapBeacon) {
            var dbBeacon = $.extend(true, {}, mapBeacon);
            delete dbBeacon.beacon
            return $http.post('/block/' + dbBeacon.block + '/beacon.json', {
                beacon: dbBeacon
            });
        }

        function exportMap() {
            // console.log(mapStorage.svg.select('.map-element'));
            return $http.post('/floor/' + $stateParams.floor_id + '/svg.json', {
                svg: mapStorage.svg.svg()
            });
        }

        function importMap() {
            return $http.get('/floor/' + $stateParams.floor_id + '/svg.json');
        }
    }
})();

function path2String(path) {
    var strPath = '';
    for (var i = 0; i < path.length; i++) {
        strPath += path[i].join(' ');
    }
    return strPath;
}
