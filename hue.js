'use strict';
const hueJay = require('huejay');
const convert = require('color-convert');
const USERNAME = "93a6cc168ba90f1bf7f2a410fae0a7";
const eventEmitter = require ('events').EventEmitter;
const event = new eventEmitter();
const rx = require('rx-lite');

// Discover Ip
exports.changeLights = function(color, initalColor, activeLights){

// Convert color to hue X/Y color input
let xyz = convert.keyword.xyz(color),
 	X = xyz[0],
	Y = xyz[1],
	Z = xyz[2];

let x = X / (X + Y + Z);
let y = Y / (X + Y + Z);
let xy = [x, y];

// Discover hue bridges, find lights and change color
hueJay.discover()
	.then(function(bridges){
		let firstIp = bridges[0]["ip"];
		// console.log(`Detected first Ip: ${firstIp}`)
		return firstIp;
	})
	.then(function(firstIp){
		// Set up client
		let client = new hueJay.Client({
			"host": firstIp,
			"username": USERNAME
		});
 
		// Test connection
		client.bridge.ping()
		  .catch((error) => {
		  	console.log('Could not connect');
		  })


		client.lights.getAll()
			.then(function(lights){
				let lightsNameAndId = {};
				for (let light of lights){
					for (let activeLight of activeLights){
						if (light.name == activeLight){
							lightsNameAndId[light.name] = light.id;
						}
					}
				}
				return lightsNameAndId;
			})
			.then(function(lightIds){
				for (let lightId in lightIds){
					let i = lightIds[lightId];
					
					client.lights.getById(i)
						.then(function(light){
							light.on = true;
							light.xy = xy;
							return client.lights.save(light);
						})

				}
			})
		})
			
	console.log(`changed the lights to ${color}`);
};