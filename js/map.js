"use strict";

var map = {};

map.init = function() {
	map.data = [];
	map.size = {x: 0, y: 0};

	map.tileSet = window.image.get('img/test.png');
};

map.resize = function(x,y) {
	map.data = [];
	map.size = {x: x, y: y};
	for(var i=0;i<x;i++) {
		map.data.push([]);
		for(var j=0;j<y;j++) {
		  map.data[i].push( Math.random() > 0.5 ? 1 : 0 );
		}
	}
};

//Checks to see if point a {x,y} is within the bounds of the map. Returns true or false.
map.inBounds = function(a) {
	return !(a.x < 0 || a.x > map.size.x || a.y < 0 || a.y > map.size.y);
};
