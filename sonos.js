'use strict';

let color = require('./string-contains-color');

// Find sonos
let s = require('sonos');
let sonos = [
	{
		name: "upstairs",
		player: new s.Sonos('192.168.178.27'),
		changed: false,
		track: "none"
	},
	{
		name: "downstairs",
		player: new s.Sonos('192.168.178.79'),
		changed: false,
		track: "none"
	}
];

// Find currently playing tracks
let currentlyPlaying = function(){
	for(let i in sonos){
		let zone = sonos[i];
		zone.player.currentTrack(function(err, track){
			if(zone.track !== track.title){
				zone.track = track.title;
				console.log(track.title);
				return zone.changed = true;
			}
			else{
				return zone.changed = false;
				console.log(`still playing: ${track.title}`);
			}
		})
	}
};

exports.findColor = function(string){
	currentlyPlaying();
    let hasColor = color.hasColor(string);
    if (hasColor !== false){
		console.log(hasColor);
	}
	else {
		console.log("no color found");
	}
	console.log(sonos[0].track);
}