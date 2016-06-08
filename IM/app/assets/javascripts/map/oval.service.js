(function() {
    'use strict';

    angular
        .module('IM_module')
        .service('Oval', oval);

    oval.$inject = ['mapStorage'];

    /* @ngInject */
    function oval(mapStorage) {
        this.init = init;

        function init(blockName) {
          var text;
          var oval = mapStorage.svg.ellipse().draw({snapToGrid:8}).attr({
            fill: '#1ABC9C',
            stroke: "black" ,
            'stroke-width': 5
          });
          oval.on('drawstart', function(e){
            text =  mapStorage.svg.text('').font({
               family:   'verdana'
               , size:    15
               , anchor:   'middle'
               , leading:  '1.5em'
             });
          });
          oval.on('drawupdate', function(e){
            text.text(blockName+"\n"+oval.bbox().w/(2*mapStorage.scale(mapStorage.width,mapStorage.height))+"X"+oval.bbox().h/(2*mapStorage.scale(mapStorage.width,mapStorage.height))).move(oval.bbox().cx,oval.bbox().cy);
          });
            oval.on('drawstop', function(e){
            mapStorage.index = mapStorage.blocks.push({ shape:oval,name: blockName, type: 'oval' });
            oval.draggable();
            oval.on('dragend', function(e) {
              text.move(oval.bbox().cx,oval.bbox().cy);
            });
            oval.on('dblclick',function(ev){
              oval.selectize().resize();
              oval.on('resizedone',function(e){
                text.text(blockName+"\n"+oval.bbox().w/(mapStorage.scale(mapStorage.width,mapStorage.height)*2)+"X"+oval.bbox().h/(mapStorage.scale(mapStorage.width,mapStorage.height)*2)).move(oval.bbox().cx,oval.bbox().cy);
                oval.selectize(false);
              });
              $(document).on('keydown', function(e){
                if(e.keyCode == 46 && oval._memory._selectHandler.rectSelection.isSelected)
                {
                  oval.selectize(false);
                  ev.target.remove();
                  text.clear();
                  $(document).off('keydown');
                }
                if(e.keyCode == 13) {
                  oval.selectize(false);
                  $(document).off('keydown');
                }
              });
            });
          });
        }
    }
})();
