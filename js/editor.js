"use strict";

var editor = {};

editor.init = function() {
	//Tool IDs:
	//0 - paint & paint collision
	//1 - select & erase collision
	//2 - fill & fill collision
	editor.tool = 0; editor.direction = 0;
	editor.rPush = false;
	editor.editCollision = false;
	editor.editEvent = false;

	editor.release = true; //Don't allow multiple collision fills one 1 release

	editor.toolIcons = window.image.get('img/tools.png');
	editor.collisionIcons = window.image.get('img/collisionTools.png');
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
	if(!editor.editCollision) {
		display.context.drawImage(editor.toolIcons, (editor.tool*tile.res), 0, tile.res, tile.res, display.width-tile.res, 0, tile.res, tile.res);
		display.context.drawImage(editor.dirIcons, (editor.direction*tile.res), 0, tile.res, tile.res, display.width-(tile.res*2), 0, tile.res, tile.res);
  }
  else if(editor.editCollision) {
		display.context.drawImage(editor.collisionIcons, (editor.tool*tile.res), 0, tile.res, tile.res, display.width-tile.res, 0, tile.res, tile.res);
	}
};

editor.resizeMap = function() {
	window.map.resize(window.input.getWidthField(),window.input.getHeightField());
};


editor.onMouse = function(pos,mvmnt,lmb,rmb,mmb) {
 if(lmb === true && !editor.editCollision){
  switch(editor.tool) {
		case 0 : editor.paint(pos,mvmnt,lmb,rmb,mmb); break;
		case 1 : editor.select(pos,mvmnt,lmb,rmb,mmb); break;
		case 2 : if(editor.release) { editor.fill(pos,mvmnt,lmb,rmb,mmb); } break;
 	}
 }
 else if(lmb === true && editor.editCollision){
  switch(editor.tool) {
		case 0 : editor.paintCollision(pos,mvmnt,lmb,rmb,mmb); break;
		case 1 : editor.eraseCollision(pos,mvmnt,lmb,rmb,mmb); break;
		case 2 : if(editor.release) { editor.fillCollision(pos,mvmnt,lmb,rmb,mmb); } break;
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
 if(lmb === true) {
	 editor.release = false;
 }
 if(lmb === false)
   editor.release = true;
};

editor.paint = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	if(map.inBounds(res)) {
		map.data[res.x][res.y].tile = tile.selected;
		map.data[res.x][res.y].r = editor.direction;
	}
};

editor.paintCollision = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	if(map.inBounds(res)) {
		map.data[res.x][res.y].c = true;
	}
};

editor.eraseCollision = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	if(map.inBounds(res)) {
		map.data[res.x][res.y].c = false;
	}
};

editor.select = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	if(map.inBounds(res)) {
		tile.selected = map.data[res.x][res.y].tile;
		editor.tool = 0;
	}
};

editor.fill = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	var otid = res.tile;

	if(tile.selected === res.tile)
		return;

	var ary = [res];
	var updts = 1;
	var max = 0;
	while(updts > 0 && max < 32) {
		var s = ary.length;
		max++;
		for(var i=0;i<s;i++) {
			var t = ary[i];
			if(map.inBounds({x: t.x, y: t.y+1})) {
				if(map.data[t.x][t.y+1].tile == otid) {
					map.data[t.x][t.y+1].tile = tile.selected;
					updts++;
					ary.push(map.data[t.x][t.y+1]);
				}
			}
			if(map.inBounds({x: t.x, y: t.y-1})) {
				if(map.data[t.x][t.y-1].tile == otid) {
					map.data[t.x][t.y-1].tile = tile.selected;
					updts++;
					ary.push(map.data[t.x][t.y-1]);
				}
			}
			if(map.inBounds({x: t.x+1, y: t.y})) {
				if(map.data[t.x+1][t.y].tile == otid) {
					map.data[t.x+1][t.y].tile = tile.selected;
					updts++;
					ary.push(map.data[t.x+1][t.y]);
				}
			}
			if(map.inBounds({x: t.x-1, y: t.y})) {
				if(map.data[t.x-1][t.y].tile == otid) {
					map.data[t.x-1][t.y].tile = tile.selected;
					updts++;
					ary.push(map.data[t.x-1][t.y]);
				}
			}
		}
	}
};

editor.fillCollision = function(pos,mvmnt,lmb,rmb,mmb) {
	var res = editor.getTileByRelativeCoords(pos);
	var otid = res.c;

	var ary = [res];
	var updts = 1;
	var max = 0;
	while(updts > 0 && max < 32) {
		var s = ary.length;
		max++;
		for(var i=0;i<s;i++) {
			var t = ary[i];
			if(map.inBounds({x: t.x, y: t.y+1})) {
				if(map.data[t.x][t.y+1].c == otid) {
					map.data[t.x][t.y+1].c = !otid;
					updts++;
					ary.push(map.data[t.x][t.y+1]);
				}
			}
			if(map.inBounds({x: t.x, y: t.y-1})) {
				if(map.data[t.x][t.y-1].c == otid) {
					map.data[t.x][t.y-1].c = !otid;
					updts++;
					ary.push(map.data[t.x][t.y-1]);
				}
			}
			if(map.inBounds({x: t.x+1, y: t.y})) {
				if(map.data[t.x+1][t.y].c == otid) {
					map.data[t.x+1][t.y].c = !otid;
					updts++;
					ary.push(map.data[t.x+1][t.y]);
				}
			}
			if(map.inBounds({x: t.x-1, y: t.y})) {
				if(map.data[t.x-1][t.y].c == otid) {
					map.data[t.x-1][t.y].c = !otid;
					updts++;
					ary.push(map.data[t.x-1][t.y]);
				}
			}
		}
	}
};

//Takes a screen relative point {x, y} and returns the tile {x, y} that is on.
editor.getTileByRelativeCoords = function(p) {
	var x = Math.floor((p.x+display.offset.x+(display.scale/2))/display.scale);
	var y = Math.floor((p.y+display.offset.y+(display.scale/2))/display.scale);
	if(!map.inBounds({x: x, y: y}))
		return undefined;
	return map.data[x][y];
}
