(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Db', db);

    db.$inject = ['$http', 'mapStorage'];

    /* @ngInject */
    function db($http, mapStorage) {
        var dbServices = {
            saveBlocks: saveBlocks
        };

        return dbServices;

        function saveBlocks(floorId) {
            var blocks = $.extend(true, [], mapStorage.blocks);
            console.log(blocks);
            var dbBlocks = blocks.map(function(block) {
                if (!block.isSaved) {
                    block.path = path2String(block.pathArray);
                    delete block.shape;
                    return block
                }
            });
            return $http.post('floors/' + floorId + '.json', {
                blocks: dbBlocks
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
