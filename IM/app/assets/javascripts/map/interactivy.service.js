(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Interactivy', interactivy);

    interactivy.$inject = ['mapStorage', 'Calculations'];

    /* @ngInject */
    function interactivy(mapStorage, Calculations) {
        var interactivy = {
            normal: normal,
            polygon: polygon
        };

        return interactivy;

        function normal(block) {
            var text = mapStorage.svg.select('#text' + block.id()).members[0];
            var blockName = block.attr('name');
            // var text = block.text, blockName = block.name;
            var index = mapStorage.blocks.push({
                shape: block,
                name: blockName,
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

        function polygon(polygon) {
            var tmpPoly;
            var textArr = mapStorage.svg.select('[ name = polyDim' + polygon.id() + ']').members;
            var blockName = polygon.attr('name');
            var blockNameText = mapStorage.svg.select('#text' + polygon.id()).members[0];
            var index = mapStorage.blocks.push({
                shape: polygon,
                name: blockName,
                // pathArray: polyPath.array().value,
                type: 'polygon',
                color: polygon.attr('fill')
            });
            // enable the shape to be draggable
            polygon.attr('fill', '#1ABC9C').draggable();
            polygon.on('dragstart', function(e) {
                // clone a temp poly to fill the place until drag is ended
                tmpPoly = polygon.clone().attr({
                    'stroke-width': 4,
                    stroke: "black"
                }).attr('fill', 'none');
            });
            // listen to the drag end event
            polygon.on('dragend', function(ev) {
              // console.log(ev);
              console.log(polygon.array().value);
                // remove the tmp poly
                tmpPoly.remove();
                var pathObj = convert2PathObj(polygon.array().value);
                // move the texts to the new positions
                Calculations.moveText(pathObj, textArr, Calculations.calcLineLengths(pathObj));
                // redraw the block name inside the block
                blockNameText.move(polygon.bbox().cx - 20, polygon.bbox().cy - 20);
            });
            // double click to select an element
            polygon.on('dblclick', function(ev) {
                // enable resizeing
                polygon.selectize().resize();
                mapStorage.blocks[index - 1].isSelected = true;
                polygon.on('resizedone', function(ev) {
                  var pathObj = convert2PathObj(polygon.array().value);
                    // move text to their new position after resize is ended
                    Calculations.moveText(pathObj, textArr, Calculations.calcLineLengths(pathObj));
                    // redraw the block name inside the block
                    blockNameText.move(polygon.bbox().cx - 20, polygon.bbox().cy - 20);
                });
                // add keydown event to the document to unselect the shape
                $(document).on('keydown', function(e) {
                    // listen to the 'enter' or 'esc' keys for deselect
                    if (e.keyCode == 27 || e.keyCode == 13) {
                        // deselect
                        polygon.selectize(false);
                        $(document).off('keydown');
                        mapStorage.blocks[index - 1].isSelected = false;
                    }
                    // listen for 'delete' key for removing the element
                    if (e.keyCode == 46) {
                        // deselect
                        polygon.selectize(false);
                        // remove the element
                        polygon.remove();
                        // remove the text
                        for (var i = 0; i < textArr.length; i++) {
                            textArr[i].clear();
                        }
                        blockNameText.clear();
                        $(document).off('keydown');
                        mapStorage.blocks[index - 1].isSelected = false;
                    }
                });
            });
        }
    }
})();
function convert2PathObj(pathArr) {
  var pathObj = [];
  pathArr.forEach(function(path) {
    pathObj.push({x: path[0], y: path[1]});
  });
  return pathObj;
}
