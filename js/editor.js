"use strict";

var editor = {};

editor.init = function() {
	editor.update();
};

editor.step = function() {

};

editor.update = function() {
	window.map.resize(window.input.getWidthField(),window.input.getHeightField());
};
