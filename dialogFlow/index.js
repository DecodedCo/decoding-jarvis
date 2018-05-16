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
      smartthing.light("color",parameters.color).then(result => {
        res.json(result);
      });
      break;
    case "Change brightness":
      smartthing.light("brightness",parameters.brightness).then(result => {
        res.json(result);
      });
      break;    
    default:
      res.json({'fulfillmentText':'I\'m sorry, I can\'t do that.'});
  }

}; // end Jarvis

//local testing
// smartthing.light("brightness",10).then(result => {
//   console.log(result);
// });
// smartthing.lock("unlock").then(result => {
//   console.log(result);
// });
