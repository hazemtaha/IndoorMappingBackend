(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Beacon', beacon);

    beacon.$inject = ['mapStorage', 'Calculations', 'Db'];

    /* @ngInject */
    function beacon(mapStorage, Calculations, Db) {
        this.init = init;

        function init(beaconInfo) {
            // start drawing
            drawBeacon(beaconInfo, mapStorage, Calculations, Db);
        }
    }
})();

var drawBeacon = function(beaconInfo, mapStorage, Calculations, Db) {
        var beacon, index;
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
                width: 2,
                color: '#eeeeee'
            }).attr('fill', '#aaaaaa').move(x - 20, y - 22);
            mapStorage.svg.off('mousemove');
            mapStorage.svg.off('click');
            var block = Calculations.isInAny({
                x: beacon.bbox().cx,
                y: beacon.bbox().cy
            }, mapStorage.blocks);
            // console.log(log);
            beaconInfo.x = beacon.cx();
            beaconInfo.y = beacon.cy();
            beaconInfo.block = block.id;
            index = mapStorage.beacons.push(beaconInfo);
            Db.saveBeacon(mapStorage.beacons[index-1]).then(function(beacon){
              // mapStorage.beacons[index-1].id = block.data.block_id;
              mapStorage.beacons[index-1].isSaved = true;
            });
            console.log(beaconInfo)
            beacon.draggable();
        }); // end of click
    } // end of drawBeacon
