/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

const smartthing = require('./smartthings.js');
const spotify = require('./spotify.js');

exports.jarvis = (req, res) => {

  let intent = req.body.queryResult.intent.displayName;
  let parameters = req.body.queryResult.parameters;

  console.log(`Processing ${intent}`,parameters);

  switch (intent) {
    case "Turn light on":
      smartthing.light("switch","on").then(result => {
        res.json(result);
      });
      break;
    case "Turn light off":
      smartthing.light("switch","off").then(result => {
        res.json(result);
      });
      break;
    case "Change light color":
      smartthing.light("colorControl",parameters.color).then(result => {
        res.json(result);
      });
      break;
    case "Change brightness":
      smartthing.light("switchLevel",parameters.brightness).then(result => {
        res.json(result);
      });
      break;    
    case "Play an artist":
      spotify.search(parameters['music-artist'],"artist").then(result => {
        smartthing.sonos("playTrack",result).then(result => {
          res.json(result);
        });
      }).catch( error => {
        res.json(error);
      });    
      break;  
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
  }

}; // end Jarvis

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
// spotify.search("Britney Spears","artist").then(result => {
//   smartthing.sonos("playTrack",result).then(result => {
//     console.log(result);
//   });
// }).catch( error => {
//   console.error(error);
// });
// smartthing.sonos("setLevel",10).then(result => {
//   console.log(result);
// });


// smartthing.outlet("off").then(result => {
//   console.log(result);
// });
// smartthing.outlet("status").then(result => {
//   console.log(result);
// });
