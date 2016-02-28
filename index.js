'use strict';
const sonos = require('./sonos');
const hue = require('./hue');
const containsColor = require('./string-contains-color');
let activeLights = ["Bureau", "Leeslamp", "Keuken"];

function findColor(string){
    let color = containsColor.hasColor(string);
    if (color){
		return color;
	}
    else {
		console.log("no color found");
    }
};


sonos.currentTrack().forEach(
		function onNext(title){
			if (title !== undefined){
				console.log(`Title: ${title}`)
				let color = findColor(title);
				if (color){
					hue.changeLights(color, "white", activeLights);
				}
			}
		},
		function onError(error){
			console.log(`Error: ${error}`);
		});