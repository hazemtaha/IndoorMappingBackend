(function() {
    'use strict';

    angular
        .module('IM_module')
        .factory('Calculations', calculations);

    calculations.$inject = ['mapStorage'];

    /* @ngInject */
    function calculations(mapStorage) {
        var calculations = {
            isInsideRect: isInsideRect,
            isInsideCircle: isInsideCircle,
            isInsideOval: isInsideOval,
            isInsidePoly: isInsidePoly,
            isInAny: isInAny,
            calcCntrPts: calcCntrPts,
            calcLineLengths: calcLineLengths,
            moveText: moveText

        };

        return calculations;

        function isInsideRect(point, block) {
            var inRect = false;
            var x1 = block.shape.bbox().x;
            var x2 = block.shape.bbox().x2;
            var y1 = block.shape.bbox().y;
            var y2 = block.shape.bbox().y2;
            if (point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2) {
                inRect = true;
            }
            return inRect;
        }
        function isInsideCircle(point, block) {
            var inCircle = false;
            var x1 = point.x;
            var x2 = block.shape.bbox().cx;
            var y1 = point.y;
            var y2 = block.shape.bbox().cy;
            var x = Math.abs(x2 - x1);
            var y = Math.abs(y2 - y1);
            var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (distance <= block.shape.bbox().w / 2) {
                inCircle = true;
            }
            return inCircle;
        }
        function isInsideOval(point, block) {
                var inOval = false;
                var dx = point.x - block.shape.bbox().cx;
                var dy = point.y - block.shape.bbox().cy;
                var x = dx * dx;
                x = x / ((block.shape.bbox().w / 2) * (block.shape.bbox().w / 2));
                var y = dy * dy;
                y = y / ((block.shape.bbox().h / 2) * (block.shape.bbox().h / 2));
                if ((x + y) <= 1) {
                    inOval = true;
                }
                return inOval;
            }
            // determine if a point is inside a polygon or not
        function isInsidePoly(point, polygon) {
                var x = point.x,
                    y = point.y,
                    inside = false;
                for (var i = 0, j = polygon.length - 1; i < polygon.length - 1; j = i++) {
                    var xi = polygon[i][0],
                        yi = polygon[i][1];
                    var xj = polygon[j][0],
                        yj = polygon[j][1];

                    var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                    if (intersect) inside = !inside;
                }
                return inside;
            }
            // check if the given point is inside any shape of the given shapes
        function isInAny(point, blocks) {
                var isInAny = false,
                    shape;
                for (var i = 0; i < blocks.length; i++) {
                    shape = blocks[i];
                    switch (blocks[i].type) {
                        case 'polygon':
                            shape = blocks[i].shape.array().value;
                            if (this.isInsidePoly(point, shape)) {
                                return blocks[i];
                            }
                            break;
                        case 'rect':
                            if (this.isInsideRect(point, shape)) {
                                return blocks[i];
                            }
                            break;
                        case 'circle':
                            if (this.isInsideCircle(point, shape)) {
                                return blocks[i];
                            }
                            break;
                        case 'oval':
                            if (this.isInsideOval(point, shape)) {
                                return blocks[i];
                            }
                            break;
                    }
                }
                return isInAny;
            }
            // calculate the center point of every line in the shape passed
        function calcCntrPts(path) {
                var centerPoints = [],
                    point, newPoint
                for (var i = 0; i < path.length; i++) {
                    point = {
                        x: path[i].x,
                        y: path[i].y
                    };
                    // if the point is the last point compare it with the first point
                    if (i == path.length - 1) {
                        newPoint = {
                            x: path[0].x,
                            y: path[0].y
                        };
                    } else {
                        newPoint = {
                            x: path[i + 1].x,
                            y: path[i + 1].y
                        };
                    }
                    var cx = point.x + ((newPoint.x - point.x) / 2);
                    var cy = point.y + ((newPoint.y - point.y) / 2);
                    centerPoints.push([cx, cy]);
                }
                return centerPoints;
            }
            // calculate lines lengths of the shape passed
        function calcLineLengths(path) {
                var lnLengths = [],
                    point, newPoint
                for (var i = 0; i < path.length; i++) {
                    point = {
                        x: path[i].x,
                        y: path[i].y
                    };
                    // if the point is the last point compare it with the first point
                    if (i == path.length - 1) {
                        newPoint = {
                            x: path[0].x,
                            y: path[0].y
                        };
                    } else {
                        newPoint = {
                            x: path[i + 1].x,
                            y: path[i + 1].y
                        };
                    }
                    lnLengths.push((Math.round(Math.sqrt(Math.pow((newPoint.x - point.x), 2) + Math.pow(newPoint.y - point.y, 2))) / mapStorage.scale(mapStorage.realWidth, mapStorage.realHeight)).toString());
                }
                return lnLengths;
            }
            // moves the text passed to it's propper position
        function moveText(points, textArr, lnLengths) {
            // calculate the center of each line in the poly
            var centerPoints = calcCntrPts(points);
            // move the line lengths to their new position
            for (var i = 0; i < centerPoints.length; i++) {
                textArr[i].text(lnLengths[i]).move(centerPoints[i][0], centerPoints[i][1]);
            }
        }


    }
})();
