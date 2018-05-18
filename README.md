# Jarvis Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

## Supported Devices

1. Nest Camera
2. Nest Thermostat
3. Samsung Smarthings Hub
4. Samsung Smarthings Power Outlet
5. Samsung Smarthings Motion Sensor
6. Silvania Smart Bulb (through Samsung Smarthings)
7. Fitbit
8. Sonos (through Samsung Smarthings and Spotify)
9. Yale Lock (through Samsung Smarthings)

## Prerequisites

1. You have completed https://dialogflow.com/docs/getting-started/building-your-first-agent
2. You have created a new agent and are ready to deploy a new webhook

## Deploy

This library provides a `jarvis` function to act as the fulfillment webhook. Deploy the webhook as per the tutorial above.

## 

// Example requests

// smartthing.light("switchLevel",100).then(result => {
//   console.log(result);
// });
// smartthing.light("switch","off").then(result => {
//   console.log(result);
// });
// The light status applies to each capability:
// smartthing.light("colorControl","status").then(result => {
//   console.log(result);
// });

// smartthing.lock("lock").then(result => {
//   console.log(result);
// });
// smartthing.lock("status").then(result => {
//   console.log(result);
// });


// smartthing.sonos("pause").then(result => {
//   console.log(result);
// });
// smartthing.sonos("playTrack","x-sonos-spotify:spotify%3atrack%3a7GhIk7Il098yCjg4BQjzvb?sid=12&flags=8224&sn=1").then(result => {
//   console.log(result);
// });
// smartthing.sonos("status").then(result => {
//   console.log(result);
// });
// spotify.search("Churches","artist").then(result => {
//   smartthing.sonos("playTrack",result).then(result => {
//     console.log(result);
//   });
// }).catch( error => {
//   console.error(error);
// });
// smartthing.sonos("setLevel",60).then(result => {
//   console.log(result);
// });
// smartthing.outlet("off").then(result => {
//   console.log(result);
// });
// smartthing.outlet("status").then(result => {
//   console.log(result);
// });

// nest.thermostat("status").then( result => {
//   console.log(result);
// });
// nest.thermostat("set",50).then( result => {
//   console.log(result);
// });

//console.log(nest.camera());

// smartthing.motion().then(result => {
//   console.log(result);
// })

// fitbit.steps('2018-5-16').then( result => {
//   console.log(result);
// })

// spotify.searchv2("Churches").then(result => {
//   smartthing.sonos("playTrack",result).then(result => {
//     console.log(result);
//   });
// }).catch( error => {
//   console.error(error);
// });
