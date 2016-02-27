'use strict';
let isCSSColorName = require('is-css-color-name');

exports.hasColor = function(string){
	let words = string.toLowerCase().split(" ");

	for (let i in words){
		let word = words[i];
		let isColor = isCSSColorName(word);
		if (isColor === true){
			console.log(`Found color ${word}`);
			return(word);
		}
		else {
			return false;
		}
	}
}