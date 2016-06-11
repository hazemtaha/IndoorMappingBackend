(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Polygon', polygon);

    polygon.$inject = ['mapStorage', 'Calculations', 'Db', '$timeout', 'Interactivy'];

    /* @ngInject */
    function polygon(mapStorage, Calculations, Db, $timeout, Interactivy) {
        this.init = init;

        function init(blockName, mapCtrl) {
            // start drawing
            drawPolygon(blockName, mapStorage, Calculations, Db, mapCtrl, $timeout, Interactivy);
        }
    }
})();
var drawPolygon = function(blockName, mapStorage, Calculations, Db, mapCtrl, $timeout, Interactivy) {
    // points we use to measure line length and contain it's text
    var pointOfLine, newPoint, dimText, textArr = [],
        // tmp variables and some utils variables
        tmpPoly, isInBlock = false,
        blockNameText, index;
    // free draw
    // var polygon = mapStorage.svg.polygon().draw().attr('stroke-width', 1).attr('fill', 'none');
    var polygon = mapStorage.svg.polygon();
    // draw a point on mouse down
    mapStorage.svg.on('mousedown', function(ev) {
        // place a new point only if the point will exist out of any shapes on the svg
        if (!isInBlock) {
            polygon.draw(ev, {
                snapToGrid: 10
            }).attr({
                'stroke-width': 4,
                stroke: 'black',
                name: blockName
            }).attr('fill', 'none').addClass('map-element');
        }
    });

    // when user initiate the first point
    polygon.on('drawstart', function(ev) {
        mapCtrl.isDrawing = true;
        mapCtrl.saveStatus = "Save Pending . . . ";
        // store the point to use it in measurement later
        pointOfLine = ev.path[0].points[0];
        // initiate an empty text on the svg
        dimText = mapStorage.svg.text('');
        // add keydown event to the document to enable user to stop the polygon shape drawing
        document.addEventListener('keydown', function(e) {
            // listen to the 'enter' key
            if (e.keyCode == 13) {
                // stop the drawing
                polygon.draw('done');
                // delete the event
                polygon.off('drawstart');
            }
        });
    });
    // this event fired every new click to initiate an edge point
    polygon.on('drawpoint', function(e) {
        // we store every new point aka every edge of the polygon shape
        pointOfLine = e.path[0].points[e.path[0].points.length - 1];
        textArr.push(dimText);
        dimText = mapStorage.svg.text('');
    }); //end of drawstart
    // this event fired with every new point
    polygon.on('drawupdate', function(e) {
        // store the new point to use it in line length measurement
        newPoint = e.path[0].points[e.path[0].points.length - 1];
        // check if the current point is inside any shape in the svg
        if (Calculations.isInAny(newPoint, mapStorage.blocks)) {
            isInBlock = true;
            // change the cursor PS: not working well
            polygon.style('cursor', 'not-allowed');
        } else {
            isInBlock = false;
            // get cursor to the default
            polygon.style('cursor', 'auto');
        }
        // get the center point on the line to put the text on it
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x) / 2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y) / 2);
        // print the line length as a text on the line
        dimText.text((Math.round(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2))) / 5).toString()).move(cx, cy);
    }); // end of drawupdate
    // fired when the user stop drawing
    polygon.on('drawstop', function(e) {
        var polyPath = polygon.toPath();
        // add the drawn shape into the block array
        index = mapStorage.blocks.push({
            shape: polygon,
            name: blockName,
            pathArray: polyPath.array().value,
            type: 'polygon',
            color: polygon.attr('fill')
        });
        polygon = polyPath.original;
        polyPath.remove();
        Db.saveBlock(mapStorage.blocks[index - 1]).then(function(block) {
            mapStorage.blocks[index - 1].id = block.data.block_id;
            mapStorage.blocks[index-1].shape.id(block.data.block_id);
            textArr.forEach(function(text) {
              text.attr('name','polyDim'+mapStorage.blocks[index-1].shape.id());
            });
            blockNameText.id('text' + mapStorage.blocks[index-1].shape.id());
            mapStorage.blocks[index - 1].isSaved = true;
            $timeout(function() {
                mapCtrl.isDrawing = false;
                mapCtrl.saveStatus = "Saved :)";
            }, 1000);
        });
        // delete the mouse down event
        mapStorage.svg.off('mousedown');
        // draw the block name inside the block
        blockNameText = mapStorage.svg.text(blockName).move(polygon.bbox().cx - 20, polygon.bbox().cy - 20).style('fill', '#767676');
        // store the points to get the last connected line length that closes the shape
        pointOfLine = e.path[0].points[e.path[0].points.length - 1];
        newPoint = e.path[0].points[0];
        // get the center of the currently drawn line
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x) / 2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y) / 2);
        // draw the text on the line
        dimText = mapStorage.svg.text((Math.round(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2))) / 5).toString()).move(cx, cy);
        // add the text object in the text array
        textArr.push(dimText);
        // delete the keydown event
        $(document).off('keydown');
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
            // remove the tmp poly
            tmpPoly.remove();
            // move the texts to the new positions
            Calculations.moveText(e.path[0].points, textArr, Calculations.calcLineLengths(e.path[0].points));
            // redraw the block name inside the block
            blockNameText.move(polygon.bbox().cx - 20, polygon.bbox().cy - 20);
        });
        // double click to select an element
        polygon.on('dblclick', function(ev) {
            // enable resizeing
            polygon.selectize().resize();
            mapStorage.blocks[index - 1].isSelected = true;
            polygon.on('resizedone', function(ev) {
                // move text to their new position after resize is ended
                Calculations.moveText(e, textArr, Calculations.calcLineLengths(e.path[0].points));
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
                    Interactivy.deleteShape(mapStorage.blocks, polygon, mapCtrl);
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
    }); // end of drawstop
}
