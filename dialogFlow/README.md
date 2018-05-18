## Setup

`gcloud init`

Choose the correct project.

Go into project settings (web) and find the bucket name for below

## Deploy

`gcloud beta functions deploy jarvis --stage-bucket staging.jarvis-ab47a.appspot.com --trigger-http`

## Logs

`gcloud beta functions logs read`


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
