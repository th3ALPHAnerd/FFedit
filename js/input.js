
"use strict";

var input = {};

input.init = function() {
 input.mouse = {pos: {x: 0, y: 0}, lmb: false, rmb: false, mmb: false};
};

input.onMouse = function(evt) {
	        var rect = display.canvas.getBoundingClientRect();
	        input.mouse.pos = {
	          x: evt.clientX - rect.left,
	          y: evt.clientY - rect.top
        	};
};

input.getWidthField = function() {
	return document.getElementById("width").value;
};

input.getHeightField = function() {
	return document.getElementById("height").value;
};
