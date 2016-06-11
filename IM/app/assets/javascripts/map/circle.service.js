(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Circle', circle);

    circle.$inject = ['mapStorage', 'Db', '$timeout'];

    /* @ngInject */
    function circle(mapStorage, Db, $timeout) {
        this.init = init;

        function init(blockName, mapCtrl) {
            var x1, y1, x2, y2, radius, text, index;
            var circle = mapStorage.svg.circle().draw({
                snapToGrid: 10
            }).attr({
                fill: '#1ABC9C',
                stroke: "black",
                'stroke-width': 4
            });
            circle.on('drawstart', function(e) {
                x1 = e.detail.p.x;
                y1 = e.detail.p.y;
                text = mapStorage.svg.text('').font({
                    family: 'verdana',
                    size: 15,
                    anchor: 'middle',
                    leading: '1.5em'
                });
                mapCtrl.isDrawing = true;
                mapCtrl.saveStatus = "Save Pending . . . ";
            });
            circle.on('drawupdate', function(e) {
                x2 = e.detail.p.x;
                y2 = e.detail.p.y;
                var x = (x2 - x1) * (x2 - x1);
                var y = (y2 - y1) * (y2 - y1);
                radius = Math.sqrt(x + y) / 5;
                text.text(blockName + "\n" + "R= " + Math.round(circle.bbox().w / (mapStorage.scale(mapStorage.width, mapStorage.height) * 2))).move(circle.bbox().cx, circle.bbox().cy);
            });
            circle.on('drawstop', function(e) {
              var circlePath = circle.toPath();
                index = mapStorage.blocks.push({
                    shape: circle,
                    name: blockName,
                    pathArray: circlePath.array().value,
                    type: 'circle'
                });
                circle = circlePath.original;
                circlePath.remove();
                Db.saveBlock(mapStorage.blocks[index-1]).then(function(block){
                  mapStorage.blocks[index-1].id = block.data.block_id;
                  mapStorage.blocks[index-1].isSaved = true;
                  $timeout(function() {
                    mapCtrl.isDrawing = false;
                    mapCtrl.saveStatus = "Saved :)";
                  },1000);
                });
                circle.draggable();
                circle.on('dragend', function(e) {
                    text.move(circle.bbox().cx, circle.bbox().cy);
                });
                circle.on('dblclick', function(ev) {
                    circle.selectize().resize();
                    mapStorage.blocks[index-1].isSelected = true;
                    circle.on('resizedone', function(e) {
                        text.text(blockName + "\n" + "R= " + Math.round(circle.bbox().w / (mapStorage.scale(mapStorage.width, mapStorage.height) * 2))).move(circle.bbox().cx, circle.bbox().cy);
                    });
                    $(document).on('keydown', function(e) {
                        if (e.keyCode == 46 && circle._memory._selectHandler.rectSelection.isSelected) {
                            circle.selectize(false);
                            ev.target.remove();
                            text.clear();
                            $(document).off('keydown');
                            mapStorage.blocks[index-1].isSelected = false;
                        }
                        if (e.keyCode == 13) {
                            circle.selectize(false);
                            $(document).off('keydown');
                            mapStorage.blocks[index-1].isSelected = false;
                        }
                    });
                });
            });
        }
    }
})();
