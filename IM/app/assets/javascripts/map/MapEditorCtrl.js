(function() {
    'use strict';

    angular
        .module('IM_module')
        .controller('MapEditorController', mapEditorController)
        .controller('BlockInfoModalInstance', blockInfoModalInstance);

    mapEditorController.$inject = ['mapStorage', 'Rect', 'Circle', 'Oval', 'Polygon', 'Beacon', '$uibModal', '$stateParams', 'Db', '$rootScope', 'Interactivy'];
    blockInfoModalInstance.$inject = ['$uibModalInstance', 'type'];

    /* @ngInject */
    function mapEditorController(mapStorage, Rect, Circle, Oval, Polygon, Beacon, $uibModal, $stateParams, Db, $rootScope, Interactivy) {
        var self = this;
        self.isInRoomTypes = false;
        self.isPending = true;
        self.isDrawing = false;
        self.saveStatus = "Nothing To Save Yet";
        var colors = {
            living: '#FFA07A',
            kitchen: '#C8F0C8',
            hallway: '#FF5733',
            bed_room: '#FFC0CB',
            bathroom: '#B0C4DE',
            balcony: '#9ACD32',
            closet: '#7B68EE',
            reception: '#778899',
            other: '#BA55D3'
        };
        $rootScope.$on("$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
                if (fromState.name == 'map_editor') {
                    Db.exportMap();
                }
            });
        self.init = function() {
            Db.getBlocks().then(function(response) {
                mapStorage.svg = SVG('drawing').size(mapStorage.width, mapStorage.height);
                if (response.data.length > 0) {
                    Db.importMap().then(function(response) {
                        mapStorage.svg.svg(response.data.svg_code);
                        var blocks = mapStorage.svg.select('.map-element').members;
                        console.log(blocks);
                        blocks.forEach(function(block) {
                            if (block.type != 'polygon' && block.type != 'beacon') {
                                Interactivy.normal(block);
                            }
                        });
                    });
                } else {
                    // draw the floor
                    $('#gridRect').attr('width', mapStorage.width);
                    $('#gridRect').attr('height', mapStorage.height);
                    //  reDrawMap(mapStorage, response.data);
                }
            });
        };
        self.open = function(type) {
            var templateUrl;
            if (type == 'beacon') {
                templateUrl = 'beacon_info.html';
            } else {
                templateUrl = 'block_info.html';
            }
            self.blockInfoModal = $uibModal.open({
                animation: true,
                controller: 'BlockInfoModalInstance',
                controllerAs: 'bimiCtrl',
                templateUrl: templateUrl,
                resolve: {
                    type: function() {
                        return type;
                    }
                }
            });
            self.blockInfoModal.result.then(function(info) {
                switch (type) {
                    case 'rect':
                        Rect.init(info, self);
                        break;
                    case 'circle':
                        Circle.init(info, self);
                        break;
                    case 'oval':
                        Oval.init(info, self);
                        break;
                    case 'polygon':
                        Polygon.init(info, self);
                        break;
                    case 'beacon':
                        Beacon.init(info, self);
                        break;
                }
                self.isPending = true
            }, function() {
                // on modal dismissed
            });
        };
        self.showRoomTypes = function() {
            self.isInRoomTypes = true;
        }
        self.closeRoomTypes = function() {
            self.isInRoomTypes = false;
        }
        self.colorize = function(type) {
            var selectedBlocks = getSelectedBlocks(mapStorage);
            angular.forEach(selectedBlocks, function(block) {
                block.shape.fill(colors[type]);
            });
        }
    }
    // mark for deletion if not ne
    // function isPending(mapObjects) {
    //     var isObjPending = false;
    //     mapObjects.forEach(function(mapObject) {
    //         if (!mapObject.isSaved) {
    //             isObjPending = true;
    //         }
    //     });
    //     return isObjPending;
    // }

    function reDrawMap(mapStorage, dbBlocks) {
        dbBlocks.forEach(function(dbBlock) {
            mapStorage.blocks.push(dbBlock);
            mapStorage.svg.path(dbBlock.path);
        });
    }

    function getSelectedBlocks(mapStorage) {
        var selectedBlocks = [];
        angular.forEach(mapStorage.blocks, function(block) {
            if (block.isSelected) {
                selectedBlocks.push(block);
            }
        });
        return selectedBlocks;
    }

    function blockInfoModalInstance($uibModalInstance, type) {
        var self = this;
        self.ok = function() {
            if (type == 'beacon') {
                $uibModalInstance.close(self.beaconInfo);
            } else {
                $uibModalInstance.close(self.blockName)
            }
        };
        self.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }
})();
