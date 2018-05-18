/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

const smartthing = require('./smartthings.js');
const spotify = require('./spotify.js');
const nest = require('./nest.js');
const fitbit = require('./fitbit.js');

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
    case "Play music":
      spotify.searchv2(parameters.music).then(result => {
        smartthing.sonos("playTrack",result).then(result => {
          res.json(result);
        });
      }).catch( error => {
        res.json({'fulfillmentText':`Whoops - ${error}`});
      });
      break;    
    case "Change volume":
      let amount = parameters.number;
      if (!amount) {
        res.json({'fulfillmentText':'Hmm no volume amount was shared with me'});
      } else {
        switch (amount) {
          case "up":
            res.json({'fulfillmentText':'I\'m learning how to do that.'})
            // todo
            break;
          case "down":
            // todo
            res.json({'fulfillmentText':'I\'m learning how to do that.'})
            break;
          default:
            smartthing.sonos("setLevel", amount).then(result => {
              res.json(result);
            });
            break;
        } // end switch amount
      } // end if amount
      break;
    case "Show camera image":
      res.json(nest.camera());
      break;  
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
      break;
  }

}; // end Jarvis
