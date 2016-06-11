(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Interactivy', interactivy);

    interactivy.$inject = ['mapStorage'];

    /* @ngInject */
    function interactivy(mapStorage) {
        var interactivy = {
            normal: normal
        };

        return interactivy;

        function normal(block) {
            var text = mapStorage.svg.select('#text' + block.id()).members[0];
            var blockName = block.attr('name');
            // var text = block.text, blockName = block.name;
            var index = mapStorage.blocks.push({
                shape: block,
                // name: blockName,
                // pathArray: rectPath.array().value,
                type: block.type,
                color: block.attr('fill')
            });
            block.draggable();
            block.on('dragend', function(e) {
                text.move(block.bbox().cx, block.bbox().cy);
            });
            block.on('dblclick', function(ev) {
                block.selectize().resize();
                mapStorage.blocks[index - 1].isSelected = true;
                block.on('resizedone', function(e) {
                    text.text(blockName + "\n" + block.bbox().w / mapStorage.scale(mapStorage.width, mapStorage.height) + "X" + block.bbox().h / mapStorage.scale(mapStorage.width, mapStorage.height)).move(block.bbox().cx, block.bbox().cy);
                });
                $(document).on('keydown', function(e) {
                    if (e.keyCode == 46 && mapStorage.blocks[index - 1].isSelected) {
                        block.selectize(false);
                        block.remove();
                        text.clear();
                        $(document).off('keydown');
                        mapStorage.blocks[index - 1].isSelected = false;

                    }
                    if (e.keyCode == 13) {
                        block.selectize(false);
                        $(document).off('keydown');
                        mapStorage.blocks[index - 1].isSelected = false;
                    }
                });
            });
        }
    }
})();
