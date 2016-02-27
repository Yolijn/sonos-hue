'use strict';
const EVENTS = require ('events').EventEmitter;
const EVENT = new EVENTS();
const COLOR = require('./string-contains-color');
const PLAYER = require('sonos');
const RX = require('rx-lite');

// Find sonos
let sonos = [
	{
		name: "upstairs",
		player: new PLAYER.Sonos('192.168.178.27'),
		track: ""
	},
	{
		name: "downstairs",
		player: new PLAYER.Sonos('192.168.178.79'),
		track: ""
	}
];

// Find currently playing tracks
exports.currentlyPlaying = function(){
	for(let i in sonos){
		let zone = sonos[i];
		zone.player.currentTrack(function(err, track){
			if(zone.track !== track.title){
				zone.track = track.title;
				console.log(track.title);
				EVENT.emit('changed', track.title);
			}
			else{
				console.log(`still playing: ${track.title}`);
			}
		})
	}
};

let findColor = function(string){
    let color = COLOR.hasColor(string);
    if (color !== false){
		console.log(color);
	}
	else {
		console.log("no color found");
	}
};

let changed = RX.Observable.fromEvent(
	EVENT,
	'changed'
);

let subscription = 
	changed.forEach(
		function onNext(title){
			findColor(title);
		},
		function onError(error){
			console.log(`Error: ${error}`);
		});


