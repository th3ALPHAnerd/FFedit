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
		  map.data[i].push({x:i, y:j, tile: 0, r:0, c:false, evt: []});
		}
	}
};

map.open = function(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  map.file = undefined;
  var reader = new FileReader();
  reader.onload = function(e) {
    var r = e.target.result;
		map.file = r;
  };
  reader.readAsText(file);

  //Recursive timeout
  var opened = function() {
		if(map.file === undefined) {
			setTimeout(function() { opened(); }, 500);
		}
	  else {
			//GOTCHA!
			map.load(map.file);
			map.file = undefined;
		}
	};

	opened();
};

map.load = function(file) {
	var ary = file.split("\n");
	var header = ary[0].split(",");

	map.data = [];
	map.size = {x: parseInt(header[0]), y: parseInt(header[1])};
	var k = 1;
	for(var i=0;i<map.size.x;i++)
			map.data.push(new Array(map.size.y));
	for(var j=0;j<map.size.y;j++) {
		for(var i=0;i<map.size.x;i++) {
			var tile = ary[k++].split(",");
			map.data[i][j] = {x: i, y: j, tile: parseInt(tile[0]), r: parseInt(tile[1]), c: tile[2] === "true" ? true : false, evt: []};
		}
	}
}

map.save = function() {
	var out = map.size.x + "," + map.size.y + "\n";
	for(var j=0;j<map.size.y;j++) {
		for(var i=0;i<map.size.x;i++) {
			var t = map.data[i][j];

			var evt;
			evt = "[";
			for(var k=0;k<t.evt.length;k++) {
				evt += t.evt[k];
				if(k<t.evt.length-1)
					evt += ",";
			}
			evt += "]";

			out += t.tile + "," + t.r + "," + t.c + "," + evt + "\n";
		}
	}

	var data = new Blob([out], {type: 'text/plain'});

	var textFile;

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	// returns a URL you can use as a href
	window.open(textFile);
};

//Checks to see if point a {x,y} is within the bounds of the map. Returns true or false.
map.inBounds = function(a) {
	if(a === undefined)
		return false;
	return !(a.x < 0 || a.x > map.size.x-1 || a.y < 0 || a.y > map.size.y-1);
};
