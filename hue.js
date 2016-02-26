'use strict';
let hueJay = require('huejay');
let convert = require('color-convert');
const USERNAME = "93a6cc168ba90f1bf7f2a410fae0a7";

// Discover Ip
exports.changeLights = function(color){

// Convert color to hue X/Y color input
let xyz = convert.keyword.xyz(color),
 	X = xyz[0],
	Y = xyz[1],
	Z = xyz[2];

let x = X / (X + Y + Z);
let y = Y / (X + Y + Z);

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
		  .then(function(){
		    // console.log('Successful connection');
		  })
		  .catch((error) => {
		  	// console.log('Could not connect');
		  })

		client.lights.getAll()
			.then(function(lights){
				let lightIds = [];
				for (let light of lights){
					if (light.name !== 'Bureau')
						continue;
					lightIds.push(light.id);
				}
					return lightIds;
			})

			.then(function(lightIds){
				let i = lightIds[0];
				console.log(i);
				client.lights.getById(i)
					.then(function(light){
						light.xy = xy;
						return client.lights.save(light);
					})
			})
		console.log(`changed the lights to ${color}`);
	})
};