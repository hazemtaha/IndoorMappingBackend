(function() {
    'use strict';

    angular
        .module('IM_module')
        .controller('MapEditorController', mapEditorController)
        .controller('BlockInfoModalInstance', blockInfoModalInstance);

    mapEditorController.$inject = ['mapStorage', 'Rect', 'Circle', 'Oval', 'Polygon', 'Beacon', '$uibModal'];
    blockInfoModalInstance.$inject = ['$uibModalInstance','type'];

    /* @ngInject */
    function mapEditorController(mapStorage, Rect, Circle, Oval, Polygon, Beacon, $uibModal) {
        var self = this;
        self.isInRoomTypes = false;
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
            }, function() {
              // on modal dismissed
            });
        };
        self.showRoomTypes = function() {
          self.isInRoomTypes = true;
        }
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
