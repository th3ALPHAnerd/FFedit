"use strict";

var display = {};

display.init = function() {
 display.canvas = document.getElementById("display");
 display.context = display.canvas.getContext("2d");

 display.width = display.canvas.width;
 display.height = display.canvas.height;

 display.scale = 16;
};

display.draw = function() {
 display.update();

 display.clear();
 display.drawMap();
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
	  display.context.drawImage(window.map.tileSet, 0, 0, 16, 16, i*16, j*16, display.scale, display.scale);
  }
 }

};
