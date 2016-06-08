(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('mapStorage', mapStorage);

    // factory.$inject = ['dependencies'];

    /* @ngInject */
    function mapStorage() {
        var mapStorage = {
            blocks: [],
            beacons: [],
            scale: scale
        };
        return mapStorage;
        function scale(width, height) {
            var scale;
            if (width * height < 2500) {
                scale = 20;
                width = width * 20;
                height = height * 20;
            } else if (width * height >= 2500 && width * height <= 10000) {
                scale = 10;
                width = width * 10;
                height = height * 10;
            } else if (width * height > 10000 && width * height <= 50000) {
                scale = 5;
                width = width * 5;
                height = height * 5;
            } else if (width * height > 50000 && width * height <= 250000) {
                scale = 3;
                width = width * 3;
                height = height * 3;
            } else if (width * height > 250000 && width * height <= 1000000) {
                scale = 1;
            }
            return scale;
        }
    }
})();
