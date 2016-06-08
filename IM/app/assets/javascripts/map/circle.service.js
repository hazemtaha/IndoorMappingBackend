(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Circle', circle);

    circle.$inject = ['mapStorage'];

    /* @ngInject */
    function circle(mapStorage) {
        this.init = init;

        function init(blockName) {
            var x1, y1, x2, y2, radius, text, index;
            var circle = mapStorage.svg.circle().draw({
                snapToGrid: 10
            }).attr({
                fill: '#1ABC9C',
                stroke: "blue",
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
                index = mapStorage.blocks.push({
                    shape: circle,
                    name: blockName,
                    type: 'circle'
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
