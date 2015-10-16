"use strict";

var display = {};

display.init = function() {
 display.canvas = document.getElementById("display");
 display.context = display.canvas.getContext("2d");
 document.oncontextmenu = function (e) {
     e.preventDefault();
 };

 display.width = display.canvas.width;
 display.height = display.canvas.height;

 display.offset = {x: 0, y: 0}; //Screen position offset from default at top left
 display.scale = 16; //Drawing scale
};

display.draw = function() {
 display.update();

 display.clear();
 display.drawMap();
 editor.draw();
};

display.update = function() {
 display.canvas.width = window.innerWidth-42-342;
 display.canvas.height = window.innerHeight-42;

 display.width = display.canvas.width;
 display.height = display.canvas.height;
};

display.clear = function() {
 display.context.fillStyle = "#000000";
 display.context.fillRect(0,0,display.width,display.height);
};

display.drawMap = function() {


 for(var i=0;i<window.map.size.x;i++) {
  for(var j=0;j<window.map.size.y;j++) {
		var tileOffset = tile.getTileByIndex(map.data[i][j].tile);
		display.context.save();
		display.context.translate((i*display.scale)-display.offset.x, (j*display.scale)-display.offset.y);
		switch(map.data[i][j].r) {
	  	case 0 : display.context.rotate(0*Math.PI/180); break;
	  	case 1 : display.context.rotate(90*Math.PI/180); break;
	  	case 2 : display.context.rotate(180*Math.PI/180); break;
	  	case 3 : display.context.rotate(270*Math.PI/180); break;
		}
		//display.context.drawImage(window.tile.tileSet, tileOffset.x*tile.res, tileOffset.y*tile.res, tile.res, tile.res, (i*display.scale)-display.offset.x, (j*display.scale)-display.offset.y, display.scale, display.scale);
  	display.context.drawImage(window.tile.tileSet, tileOffset.x*tile.res, tileOffset.y*tile.res, tile.res, tile.res, -(display.scale/2), -(display.scale/2), display.scale, display.scale);
  	display.context.restore();
  }
 }

};
