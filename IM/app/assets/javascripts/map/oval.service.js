(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Oval', oval);

    oval.$inject = ['mapStorage', 'Db', '$timeout', 'Interactivy'];

    /* @ngInject */
    function oval(mapStorage, Db, $timeout, Interactivy) {
        this.init = init;

        function init(blockName, mapCtrl) {
            var text, index;
            var oval = mapStorage.svg.ellipse().draw({
                snapToGrid: 8
            }).attr({
                fill: '#1ABC9C',
                stroke: "black",
                'stroke-width': 4,
                name: blockName
            }).addClass('map-element');
            oval.on('drawstart', function(e) {
                text = mapStorage.svg.text('').font({
                    family: 'verdana',
                    size: 15,
                    anchor: 'middle',
                    leading: '1.5em'
                });
                mapCtrl.isDrawing = true;
                mapCtrl.saveStatus = "Save Pending . . . ";
            });
            oval.on('drawupdate', function(e) {
                text.text(blockName + "\n" + oval.bbox().w / (2 * mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight)) + "X" + oval.bbox().h / (2 * mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight))).move(oval.bbox().cx, oval.bbox().cy);
            });
            oval.on('drawstop', function(e) {
                var ovalPath = oval.toPath()
                index = mapStorage.blocks.push({
                    shape: oval,
                    name: blockName,
                    pathArray: ovalPath.array().value,
                    type: 'oval',
                    color: oval.attr('fill')
                });
                oval = ovalPath.original;
                ovalPath.remove();
                Db.saveBlock(mapStorage.blocks[index - 1]).then(function(block) {
                    mapStorage.blocks[index - 1].id = block.data.block_id;
                    mapStorage.blocks[index - 1].shape.id(block.data.block_id);
                    text.id('text' + oval.id());
                    mapStorage.blocks[index - 1].isSaved = true;
                    $timeout(function() {
                        mapCtrl.isDrawing = false;
                        mapCtrl.saveStatus = "Saved :)";
                    }, 1000);
                });
                oval.draggable();
                oval.on('dragend', function(e) {
                    text.move(oval.bbox().cx, oval.bbox().cy);
                });
                oval.on('dblclick', function(ev) {
                    oval.selectize({ rotationPoint:false }).resize();
                    mapStorage.blocks[index - 1].isSelected = true;
                    oval.on('resizedone', function(e) {
                        text.text(blockName + "\n" + oval.bbox().w / (mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight) * 2) + "X" + oval.bbox().h / (mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight) * 2)).move(oval.bbox().cx, oval.bbox().cy);
                    });
                    $(document).on('keydown', function(e) {
                        if (e.keyCode == 46 && mapStorage.blocks[index - 1].isSelected) {
                            Interactivy.deleteShape(mapStorage.blocks, oval, mapCtrl);
                            oval.selectize(false);
                            ev.target.remove();
                            text.clear();
                            $(document).off('keydown');
                            mapStorage.blocks[index - 1].isSelected = false;

                        }
                        if (e.keyCode == 13) {
                            oval.selectize(false);
                            $(document).off('keydown');
                            mapStorage.blocks[index - 1].isSelected = false;
                        }
                    });
                });
            });
        }
    }
})();
