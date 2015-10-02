"use strict";

var input = {};

input.init = function() {
 input.mouse = {pos: {x: 0, y: 0}, btn: {lmb: false, rmb: false, mmb: false}};
 input.keys = [];
 for(var i=0;i<256;i++)
 	input.keys[i] = false;
};

input.onKey = function(evt, state) {
	console.log(evt.keyCode);
 input.keys[evt.keyCode] = state;
};

input.onMouse = function(evt) {
  var rect = window.display.canvas.getBoundingClientRect();

  var pos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
  var mvmnt = {x: input.mouse.pos.x-pos.x, y: input.mouse.pos.y-pos.y};
  input.mouse.pos = pos;


  switch(evt.buttons) {
		case 1 : input.mouse.btn = {lmb: true, rmb: false, mmb: false}; break;
		case 2 : input.mouse.btn = {lmb: false, rmb: true, mmb: false}; break;
		case 4 : input.mouse.btn = {lmb: false, rmb: false, mmb: true}; break;
		default : input.mouse.btn = {lmb: false, rmb: false, mmb: false}; break;
	}

  editor.onMouse(pos, mvmnt, input.mouse.btn.lmb, input.mouse.btn.rmb, input.mouse.btn.mmb);
};

input.getWidthField = function() {
	return document.getElementById("width").value;
};

input.getHeightField = function() {
	return document.getElementById("height").value;
};
