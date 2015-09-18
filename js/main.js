"use strict";

var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 33);
        };
})();

/*********************************************/

var main = {};

main.init = function() {
 window.image.init();
 window.image.onReady( function() {
	 window.tile.init();
	 window.input.init();
	 window.map.init();
	 window.editor.init();
	 window.display.init();
	 main.step();
 });
};

main.lastTime = 0;
main.step = function() {
 var now = Date.now();

 if(now - main.lastTime > 33) {
  main.lastTime = now;
  window.editor.step();
  window.display.draw();
 }

 requestAnimFrame(function() { main.step(); });
};

main.init();
