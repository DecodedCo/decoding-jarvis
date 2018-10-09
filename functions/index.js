// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion, Image} = require('dialogflow-fulfillment');
const smartthings = require('./smartthings.js');
const spotify = require('./spotify.js');
const nest = require('./nest.js');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome (agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function turnOnLight (agent) {
    agent.add("Turning the lights on");
    smartthings.light("switch","on").then(result => {
      agent.add(result);
    });
  }

  function turnOffLight (agent) {
    agent.add("Turning the lights off");
    smartthings.light("switch","off").then(result => {
      agent.add(result);
    });
  }

  function playMusic (agent) {
    // todo: bring in parameters
    spotify.searchv2(parameters.music).then(result => {
      smartthings.sonos("playTrack",result).then(result => {
        res.json(result);
      });
    }).catch( error => {
      res.json({'fulfillmentText':`Whoops - ${error}`});
    });
  }

  function showCamera (agent) {
    agent.add("Sharing live camera URL:")
    agent.add(new Image(nest.camera()));
  }

  function lockDoor (agent) {
    smartthings.lock("lock").then( result => {
      agent.add("locking the door");
      agent.add(result);
    })
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Turn on light',turnOnLight);
  intentMap.set('Turn off light',turnOffLight);
  intentMap.set('Show camera',showCamera);
  intentMap.set('Lock door',lockDoor);
  agent.handleRequest(intentMap);
});
