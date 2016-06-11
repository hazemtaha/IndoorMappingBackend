(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Beacon', beacon);

    beacon.$inject = ['mapStorage', 'Calculations', 'Db', '$timeout', 'Interactivy'];

    /* @ngInject */
    function beacon(mapStorage, Calculations, Db, $timeout, Interactivy) {
        this.init = init;

        function init(beaconInfo, mapCtrl) {
            // start drawing
            drawBeacon(beaconInfo, mapStorage, Calculations, Db, mapCtrl, $timeout, Interactivy);
        }
    }
})();

var drawBeacon = function(beaconInfo, mapStorage, Calculations, Db, mapCtrl, $timeout, Interactivy) {
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
            mapCtrl.isDrawing = true;
            mapCtrl.saveStatus = "Save Pending . . . ";
        }); // end of mousemove
        mapStorage.svg.on('click', function(e) {
            var x = e.pageX - $('#' + mapStorage.svg.id()).offset().left;
            var y = e.pageY - $('#' + mapStorage.svg.id()).offset().top;
            beacon.stroke({
                width: 2,
                color: '#eeeeee'
            }).attr('fill', '#aaaaaa').addClass('map-element').move(x - 20, y - 22);
            beacon.attr('name','beacon');
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
            beaconInfo.beacon = beacon;
            index = mapStorage.beacons.push(beaconInfo);
            Db.saveBeacon(mapStorage.beacons[index - 1]).then(function(beacon) {
                mapStorage.beacons[index - 1].id = beacon.data.beacon_id;
                mapStorage.beacons[index - 1].beacon.id(beacon.data.beacon_id);
                mapStorage.beacons[index - 1].isSaved = true;
                $timeout(function() {
                    mapCtrl.isDrawing = false;
                    mapCtrl.saveStatus = "Saved :)";
                }, 1000);
            });
            beacon.draggable();
            // double click to select an element
            beacon.on('dblclick', function(ev) {
                // enable selecting
                beacon.selectize();
                mapStorage.beacons[index - 1].isSelected = true;
                // add keydown event to the document to unselect the shape
                $(document).on('keydown', function(e) {
                    // listen to the 'enter' or 'esc' keys for deselect
                    if (e.keyCode == 27 || e.keyCode == 13) {
                        // deselect
                        beacon.selectize(false);
                        $(document).off('keydown');
                        mapStorage.beacons[index - 1].isSelected = false;
                    }
                    // listen for 'delete' key for removing the element
                    if (e.keyCode == 46) {
                        // deselect
                        beacon.selectize(false);
                        Interactivy.deleteShape(mapStorage.beacons, beacon, mapCtrl);
                        // remove the element
                        beacon.remove();
                        $(document).off('keydown');
                        mapStorage.beacons[index - 1].isSelected = false;
                    }
                });
            });
        }); // end of click
    } // end of drawBeacon
