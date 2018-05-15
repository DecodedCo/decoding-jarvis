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
      smartthing.light("on").then(result => {
        res.json(result);
      });
      break;
    case "Turn light off":
      smartthing.light("off").then(result => {
        res.json(result);
      });
      break;
    case "Change light color":
      smartthing.light("",parameters.color).then(result => {
        res.json(result);
      });
      break;
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
  }

}; // end Jarvis

// local testing
// smartthing.light("off").then(result => {
//   console.log(result);
// });
