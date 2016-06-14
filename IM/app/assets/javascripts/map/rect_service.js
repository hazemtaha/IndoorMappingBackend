(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Rect', rect);

    rect.$inject = ['mapStorage', 'Db', '$timeout', 'Interactivy'];

    /* @ngInject */
    function rect(mapStorage, Db, $timeout, Interactivy) {
        this.init = init;

        function init(blockName, mapCtrl) {
            var rect = mapStorage.svg.rect().draw({
                snapToGrid: 10
            }).attr({
                fill: '#1ABC9C',
                stroke: "black",
                'stroke-width': 4,
                name: blockName
            }).addClass('map-element');
            var x1, y1, x2, y2, width, height, path, text, drag_rect, index;
            rect.on('drawstart', function(e) {
                mapCtrl.isDrawing = true;
                mapCtrl.saveStatus = "Save Pending . . . ";
                console.log(mapCtrl.isDrawing);
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
                // width = Math.abs(x2 - x1) / mapStorage.scale_width;
                // height = Math.abs(y2 - y1) / mapStorage.scale_height;
                text.text(blockName + "\n" + rect.bbox().w / mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight) + "X" + rect.bbox().h / mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight)).move(rect.bbox().cx, rect.bbox().cy);
            });
            rect.on('drawstop', function(e) {
                var rectPath = rect.toPath();
                index = mapStorage.blocks.push({
                    shape: rect,
                    name: blockName,
                    pathArray: rectPath.array().value,
                    type: 'rect',
                    color: rect.attr('fill')
                });
                rect = rectPath.original;
                rectPath.remove();
                Db.saveBlock(mapStorage.blocks[index - 1]).then(function(block) {
                    mapStorage.blocks[index - 1].id = block.data.block_id;
                    mapStorage.blocks[index - 1].shape.id(block.data.block_id);
                    text.id('text' + rect.id());
                    mapStorage.blocks[index - 1].isSaved = true;
                    $timeout(function() {
                        mapCtrl.isDrawing = false;
                        mapCtrl.saveStatus = "Saved :)";
                    }, 1000);
                });
                rect.draggable();
                rect.on('dragend', function(e) {
                    text.move(rect.bbox().cx, rect.bbox().cy);
                });
                rect.on('dblclick', function(ev) {
                    rect.selectize().resize();
                    mapStorage.blocks[index - 1].isSelected = true;
                    rect.on('resizedone', function(e) {
                        text.text(blockName + "\n" + rect.bbox().w / mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight) + "X" + rect.bbox().h / mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight)).move(rect.bbox().cx, rect.bbox().cy);
                    });
                    $(document).on('keydown', function(e) {
                        if (e.keyCode == 46 && mapStorage.blocks[index - 1].isSelected) {
                            Interactivy.deleteShape(mapStorage.blocks, rect, mapCtrl);
                            rect.selectize(false);
                            rect.remove();
                            text.clear();
                            $(document).off('keydown');
                            mapStorage.blocks[index - 1].isSelected = false;

                        }
                        if (e.keyCode == 13) {
                            rect.selectize(false);
                            $(document).off('keydown');
                            mapStorage.blocks[index - 1].isSelected = false;
                        }
                    });
                });
            });
        }
    }
})();
