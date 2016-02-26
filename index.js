'use strict';
let sonos = require('./sonos');
let hue = require('./hue');

sonos.findColor();
// setInterval(sonos.currentlyPlaying, 3000);

// Find color in track and convert to color for hue

// hue.changeLights(color);