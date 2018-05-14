/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

const smartthing = require('./smartthings.js');

exports.jarvis = (req, res) => {

  let intent = req.body.queryResult.intent.displayName;
  let parameters = req.body.queryResult.intent.parameters;
  
  console.log(`Processing $intent`);

  switch (intent) {
    case "Turn light on":
      res.json(smartthing.light("on"));
      break;
    case "Turn light off":
      res.json(smartthing.light("off"));
      break;
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
  }

}; // end Jarvis
