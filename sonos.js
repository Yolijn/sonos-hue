'use strict';
const eventEmitter = require ('events').EventEmitter;
const event = new eventEmitter();
const color = require('./string-contains-color');
const player = require('sonos');
const rx = require('rx-lite');

// Find sonos
let sonos = [
	{
		name: "upstairs",
		player: new player.Sonos('192.168.178.27'),
		track: ""
	},
	{
		name: "downstairs",
		player: new player.Sonos('192.168.178.79'),
		track: ""
	}
];

// Find currently playing tracks
function checkCurrentlyPlaying (){
	for (let i in sonos){
		let zone = sonos[i];
		zone.player.currentTrack(function(err, track){
			if (zone.track !== track.title){
				zone.track = track.title;
				console.log(track.title);
				event.emit('changed', track.title);
			}
			else {
				console.log(`still playing: ${track.title}`);
			}
		})
	}
};

function pollCurrentlyPlaying()
{
	checkCurrentlyPlaying();
	setInterval(checkCurrentlyPlaying, 3000);

	return rx.Observable.fromEvent(
		event,
		'changed'
	);
}


exports.currentTrack = pollCurrentlyPlaying;