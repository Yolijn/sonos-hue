'use strict';
const sonos = require('./sonos');
const hue = require('./hue');
const containsColor = require('./string-contains-color');

function findColor(string){
    let color = containsColor.hasColor(string);
    if (color){
	    console.log(`Color: ${color}`);
		return color;
	}
    else {
		console.log("no color found");
    }
};


sonos.currentTrack().forEach(
		function onNext(title){
			console.log(`Title: ${title}`)
			let color = findColor(title);
			if (color){
				console.log(`Yay! Color is: ${color}`);
				hue.changeLights(color);
			}
		},
		function onError(error){
			console.log(`Error: ${error}`);
		});