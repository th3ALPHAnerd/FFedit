"use strict";

var editor = {};

editor.init = function() {
	//Tool IDs:
	//0 - paint
	//1 - select
	//2 - fill
	editor.tool = 0; editor.direction = 0;
	editor.rPush = false;
	editor.toolIcons = window.image.get('img/tools.png');
	editor.dirIcons = window.image.get('img/direction.png');

	editor.resizeMap();
};

editor.step = function() {
	if(input.keys[81])
		editor.tool = 0;
  else if(input.keys[69])
    editor.tool = 1;
  else if(input.keys[70])
    editor.tool = 2;

  if(input.keys[82] && !editor.rPush) {
		editor.direction = editor.direction > 2 ? 0 : editor.direction+1;
		editor.rPush = true;
	}
	else if(!input.keys[82] && editor.rPush) {
		editor.rPush = false;
	}
};

//Draws the current tool/settings in top right corner.
editor.draw = function() {
	display.context.drawImage(editor.toolIcons, (editor.tool*tile.res), 0, tile.res, tile.res, display.width-tile.res, 0, tile.res, tile.res);
	display.context.drawImage(editor.dirIcons, (editor.direction*tile.res), 0, tile.res, tile.res, display.width-(tile.res*2), 0, tile.res, tile.res);
};

editor.resizeMap = function() {
	window.map.resize(window.input.getWidthField(),window.input.getHeightField());
};


editor.onMouse = function(pos,mvmnt,lmb,rmb,mmb) {
 if(lmb === true) {
	 var res = editor.getTileByRelativeCoords(pos);
	 if(map.inBounds(res)) {
		map.data[res.x][res.y].tile = tile.selected;
		map.data[res.x][res.y].r = editor.direction;
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
	var x = Math.floor((p.x+display.offset.x+(display.scale/2))/display.scale);
	var y = Math.floor((p.y+display.offset.y+(display.scale/2))/display.scale);
	return {x: x, y: y};
}
