"use strict";

var tile = {};

tile.init = function() {
  tile.container = document.getElementById("tileList");
  tile.container.innerHTML = tile.buildList("img/test.png",72,72,936);
};

tile.buildList = function(src,x,y,size) {
  var width = x*4+16;
  var tonsOfHtml = "<div class='wrapper' style='width:" + width + "px;'>";
  for(var i=0;i<size/y;i++) {
    for(var j=0;j<size/x;j++) {
      tonsOfHtml += "<div onclick='window.tile.selectTile(this)'class='cell' style='width: " + x + "px; height: " + y + "px;'>" +
                    "<img style='margin-left: -" + j*x + ";margin-top:-" + i*y + "' src='" + src + "' ></img></div>";
    }
  }
  tonsOfHtml += "</div>";
  return tonsOfHtml;
};

tile.selectTile = function(element) {
  var previousSelected = document.getElementsByClassName('selected');
  for(var i=0;i<previousSelected.length;i++) {
    previousSelected[i].className = 'cell';
  }
  element.className = 'selected';
};
