/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

const smartthing = require('./smartthings.js');

exports.jarvis = (req, res) => {

  let intent = req.body.queryResult.intent.displayName;
  let parameters = req.body.queryResult.parameters;

  console.log(`Processing ${intent}`,parameters);

  switch (intent) {
    case "Turn light on":
      res.json(smartthing.light("on"));
      break;
    case "Turn light off":
      res.json(smartthing.light("off"));
      break;
    case "Change light color":
      res.json(smartthing.light("",parameters.color));
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
  }

}; // end Jarvis

// local testing
//console.log(smartthing.light("off"));
//console.log(smartthing.light("","white"));
