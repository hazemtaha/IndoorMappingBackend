(function() {
    'use strict';

    angular
        .module('IM_module')
        .controller('MapEditorController', mapEditorController)
        .controller('BlockInfoModalInstance', blockInfoModalInstance);

    mapEditorController.$inject = ['mapStorage', 'Rect', 'Circle', 'Oval', 'Polygon', 'Beacon', '$uibModal', '$stateParams', 'Db'];
    blockInfoModalInstance.$inject = ['$uibModalInstance', 'type'];

    /* @ngInject */
    function mapEditorController(mapStorage, Rect, Circle, Oval, Polygon, Beacon, $uibModal, $stateParams, Db) {
        var self = this;
        self.isInRoomTypes = false;
        self.isPending = true;
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
        self.init = function() {
            // draw the floor
            mapStorage.svg = SVG('drawing').size(mapStorage.width, mapStorage.height);
            $('#gridRect').attr('width', mapStorage.width);
            $('#gridRect').attr('height', mapStorage.height);
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
                        Rect.init(info);
                        break;
                    case 'circle':
                        Circle.init(info);
                        break;
                    case 'oval':
                        Oval.init(info);
                        break;
                    case 'polygon':
                        Polygon.init(info);
                        break;
                    case 'beacon':
                        Beacon.init(info)
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
        self.saveBlocks = function() {
          console.log(mapStorage.blocks);
            if (isPending(mapStorage.blocks)) {
                Db.saveBlocks($stateParams.floor_id).then(function() {
                    mapStorage.blocks.forEach(function(block) {
                        block.isSaved = true;
                    });
                    self.isPending = false;
                });
            }
        }
    }

    function isPending(mapObjects) {
        var isObjPending = false;
        mapObjects.forEach(function(mapObject) {
            if (!mapObject.isSaved) {
                isObjPending = true;
            }
        });
        return isObjPending;
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
