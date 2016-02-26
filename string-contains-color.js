'use strict';

exports.hasColor = function(string){
	let color = string;
	if(color !== undefined){
		color = color.toLowerCase();
		return(color);
	}
	else{
		return false;
	}
}