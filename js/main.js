
"use strict";

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
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
 image.init();
 image.onReady( function() {
	 tile.init();
	 input.init();
	 map.init();
	 editor.init();
	 display.init();
	 main.step();
 });
};

main.lastTime = 0;
main.step = function() {
 var now = Date.now();

 if(now - main.lastTime > 33) {
  main.lastTime = now;
  editor.step();
  display.draw();
 }

 requestAnimFrame(function() { main.step(); });
};

main.init();
