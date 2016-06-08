(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Rect', rect);

    rect.$inject = ['mapStorage'];

    /* @ngInject */
    function rect(mapStorage) {
        this.init = init;

        function init(blockName) {
            var rect = mapStorage.svg.rect().draw({
                snapToGrid: 10
            }).attr({
                fill: '#1ABC9C',
                stroke: "green",
                'stroke-width': 4
            });
            var x1, y1, x2, y2, width, height, path, text, drag_rect, index;
            rect.on('drawstart', function(e) {
                x1 = e.detail.p.x;
                y1 = e.detail.p.y;
                text = mapStorage.svg.text('').font({
                    family: 'verdana',
                    size: 15,
                    anchor: 'middle',
                    leading: '1.5em'
                });
            });
            rect.on('drawupdate', function(e) {
                x2 = e.detail.p.x;
                y2 = e.detail.p.y;
                width = Math.abs(x2 - x1) / mapStorage.scale_width;
                height = Math.abs(y2 - y1) / mapStorage.scale_height;
                text.text(blockName + "\n" + rect.bbox().w / mapStorage.scale(mapStorage.width, mapStorage.height) + "X" + rect.bbox().h / mapStorage.scale(mapStorage.width, mapStorage.height)).move(rect.bbox().cx, rect.bbox().cy);
            });
            rect.on('drawstop', function(e) {
                index = mapStorage.blocks.push({
                    shape: rect,
                    name: blockName,
                    type: 'rect'
                });
                rect.draggable();
                rect.on('dragend', function(e) {
                    text.move(rect.bbox().cx, rect.bbox().cy);
                });
                rect.on('dblclick', function(ev) {
                    rect.selectize().resize();
                    mapStorage.blocks[index-1].isSelected = true;
                    rect.on('resizedone', function(e) {
                        text.text(blockName + "\n" + rect.bbox().w / mapStorage.scale(mapStorage.width, mapStorage.height) + "X" + rect.bbox().h / mapStorage.scale(mapStorage.width, mapStorage.height)).move(rect.bbox().cx, rect.bbox().cy);
                    });
                    $(document).on('keydown', function(e) {
                        if (e.keyCode == 46 && rect._memory._selectHandler.rectSelection.isSelected) {
                            rect.selectize(false);
                            rect.remove();
                            text.clear();
                            $(document).off('keydown');
                            mapStorage.blocks[index-1].isSelected = false;

                        }
                        if (e.keyCode == 13) {
                            rect.selectize(false);
                            $(document).off('keydown');
                            mapStorage.blocks[index-1].isSelected = false;
                        }
                    });
                });
            });
        }
    }
})();
