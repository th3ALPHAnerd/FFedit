"use strict";

var tile = {};

tile.init = function() {
	tile.container = document.getElementById("tileList");
	tile.buildList("img/test.png",128,128);
};

tile.buildList = function(src,x,y) {
	var s = 1000;
	var tonsOfHtml = "<div style='overflow: hidden; width: " + s + "px; height: " + s + "px;' onclick='console.log(\"I pushed the button numero " + i + "," + j + "!\");'>";
	for(var i=0;i<x/s;i++) {
		for(var j=0;j<y/s;j++) {
			tonsOfHtml += "<img src='" + src + "' ></img>";
		}
  }
  tonsOfHtml += "</div>"
  tile.container.innerHTML = tonsOfHtml;
};
