"use strict";

var map = {};

map.init = function() {
	map.size = {x: 0, y: 0};

	map.resize(128,128);
};

map.resize = function(x,y) {
	map.data = [];
	map.size = {x: x, y: y};
	for(var i=0;i<x;i++) {
		map.data.push([]);
		for(var j=0;j<y;j++) {
		  map.data[i].push({x:i, y:j, tile: 0, r:0, evt: []});
		}
	}
};

//Checks to see if point a {x,y} is within the bounds of the map. Returns true or false.
map.inBounds = function(a) {
	return !(a.x < 0 || a.x > map.size.x || a.y < 0 || a.y > map.size.y);
};
