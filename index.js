/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

require('dotenv').config()

const smartthing = require('./smartthings.js');
const spotify = require('./spotify.js');
const nest = require('./nest.js');
const fitbit = require('./fitbit.js');

exports.jarvis = (req, res) => {

  let intent = req.body.queryResult.intent.displayName;
  let parameters = req.body.queryResult.parameters;

  console.log(`Processing ${intent}`,parameters);

  switch (intent) {
    case "Your intent here":
      // process intent
      res.json({'fulfillmentText':'This is the response based on your request'});
      break;
    default: // unrecognised intent
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
      break;
  }

}; // end Jarvis
