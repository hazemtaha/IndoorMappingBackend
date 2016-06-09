(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Db', db);

    db.$inject = ['$http', 'mapStorage', '$stateParams'];

    /* @ngInject */
    function db($http, mapStorage, $stateParams) {
        var dbServices = {
            // saveBlocks: saveBlocks,
            saveBeacon: saveBeacon,
            saveBlock: saveBlock
        };

        return dbServices;
        
        function saveBlock(mapBlock) {
            var dbBlock = $.extend(true, {}, mapBlock);
            dbBlock.path = path2String(dbBlock.pathArray);
            delete dbBlock.shape;
            console.log(dbBlock);
            return $http.post('/buildings/' + $stateParams.building_id + '/floors/' + $stateParams.floor_id + '/blocks.json', {
                block: dbBlock
            });
        }

        function saveBeacon(mapBeacon) {
            return $http.post('/block/' + mapBeacon.block + '/beacon.json', {
                beacon: mapBeacon
            });
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
