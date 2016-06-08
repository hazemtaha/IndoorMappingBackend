(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Beacon', beacon);

    beacon.$inject = ['mapStorage', 'Calculations'];

    /* @ngInject */
    function beacon(mapStorage, Calculations) {
        this.init = init;

        function init(beaconInfo) {
            // start drawing
            drawBeacon(beaconInfo, mapStorage, Calculations);
        }
    }
})();

var drawBeacon = function(beaconInfo, mapStorage, Calculations) {
        var beacon;
        mapStorage.svg.on('mousemove', function(e) {
            var x = e.pageX - $('#' + mapStorage.svg.id()).offset().left;
            var y = e.pageY - $('#' + mapStorage.svg.id()).offset().top;
            if (beacon) {
                beacon.move(x - 20, y - 22);
            } else {
                beacon = mapStorage.svg.circle(35).stroke({
                    width: 3,
                    color: '#747cf4'
                }).attr('fill', 'none').move(x - 50, y - 50);
            }
        }); // end of mousemove
        mapStorage.svg.on('click', function(e) {
            var x = e.pageX - $('#' + mapStorage.svg.id()).offset().left;
            var y = e.pageY - $('#' + mapStorage.svg.id()).offset().top;
            beacon.stroke({
                width: 1,
                color: '#226699'
            }).attr('fill', '#6699cc').move(x - 20, y - 22);
            mapStorage.svg.off('mousemove');
            mapStorage.svg.off('click');
            var log = Calculations.isInAny({
                x: beacon.bbox().cx,
                y: beacon.bbox().cy
            }, mapStorage.blocks);
            console.log(log);
            mapStorage.beacons.push({
                beacon: beacon,
                info: beaconInfo
            });

        }); // end of click

    } // end of drawBeacon
