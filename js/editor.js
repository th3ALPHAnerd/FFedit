"use strict";

var editor = {};

editor.init = function() {
	editor.resizeMap();
};

editor.step = function() {

};

editor.resizeMap = function() {
	window.map.resize(window.input.getWidthField(),window.input.getHeightField());
};


editor.onMouse = function(pos,mvmnt,lmb,rmb,mmb) {
 if(lmb === true) {
	 var res = editor.getTileByRelativeCoords(pos);
	 if(map.inBounds(res)) {
		map.data[res.x][res.y] = tile.selected;
	 }
 }
 if(rmb && !input.keys[16]) {
	display.offset = {x: display.offset.x+mvmnt.x, y: display.offset.y+mvmnt.y};
 }
 if(rmb && input.keys[16]) {
	var directionality = mvmnt.x + mvmnt.y > 0 ? -1 : 1; //Wordified
	display.scale = display.scale + (directionality * Math.sqrt((mvmnt.x*mvmnt.x) + (mvmnt.y*mvmnt.y)) * 0.025);
	if(display.scale > 64)
		display.scale = 64;
  if(display.scale < 3)
  	display.scale = 3;
 }
}

//Takes a screen relative point {x, y} and returns the tile {x, y} that is on.
editor.getTileByRelativeCoords = function(p) {
	var x = Math.floor((p.x+display.offset.x)/display.scale);
	var y = Math.floor((p.y+display.offset.y)/display.scale);
	return {x: x, y: y};
}
