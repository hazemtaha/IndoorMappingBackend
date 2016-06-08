(function() {
    'use strict';

    angular
        .module('IM_module')
        .controller('MapInfoController', mapInfoController);

    mapInfoController.$inject = ['$state','mapStorage'];

    /* @ngInject */
    function mapInfoController($state,mapStorage) {
        var self = this;
        self.floor = {}
        self.confirm = function() {
          self.floor.isWidthInvalid = false
          self.floor.isHeightInvalid = false
          if (!isNumeric(self.floor.width)) {
            self.floor.isWidthInvalid = true;
          }
          if (!isNumeric(self.floor.height)) {
            self.floor.isHeightInvalid = true;
          }
          if (!self.floor.isHeightInvalid && !self.floor.isWidthInvalid) {
            mapStorage.width = self.floor.width * mapStorage.scale(self.floor.width, self.floor.height);
            mapStorage.height = self.floor.height * mapStorage.scale(self.floor.width, self.floor.height);
            $state.go('map_editor');
          }
        }
    }
})();
var isNumeric = function(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(parseFloat(n));
}
