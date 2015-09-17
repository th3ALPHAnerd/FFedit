
"use strict";

var editor = {};

editor.init = function() {
	editor.update();
};

editor.step = function() {

};

editor.update = function() {
	map.resize(input.getWidthField(),input.getHeightField());
};
