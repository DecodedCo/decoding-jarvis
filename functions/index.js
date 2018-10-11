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
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    });
  }

  function turnOffLight (agent) {
    agent.add("Turning the lights off");
    smartthings.light("switch","off").then(result => {
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    });
  }

  function playMusic (agent) {
    let music = request.body.queryResult.parameters['music']; 
    console.log("Going to play", music); // passed through as a parameter
    agent.add(`Looking for ${music}`);
    spotify.searchv2(music).then(result => {
      console.log("Spotify found", result)
      agent.add("Playing a song for you");
      smartthings.sonos("playTrack",result).then(result => {
        console.log("Sending", result, "to Sonos");
        agent.add("Song should be playing now!");
        agent.add(result);
      });
    }).catch( error => {
      res.json(`Whoops - ${error}`);
    });
  }

  function showCamera (agent) {
    agent.add("Sharing live camera URL:")
    agent.add(new Image(nest.camera()));
  }

  function lockDoor (agent) {
    agent.add("Locking the door...");
    smartthings.lock("lock").then( result => {
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    });
  }

  function unlockDoor (agent) {
    agent.add("Unlocking the door...");
    smartthings.lock("unlock").then( result => {
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    })
  }

  function turnOnOutlet(agent) {
    agent.add("Switching on outlet...");
    smartthings.outlet("on").then(result => {
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    });
  }

  function turnOffOutlet(agent) {
    agent.add("Switching off outlet...");
    smartthings.outlet("off").then(result => {
      agent.add(result); // for some reason this is not returning when smartthings API is called, but returns if no device is defined
    });
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default fallbackback Intent', fallback);
  intentMap.set('Turn on light',turnOnLight);
  intentMap.set('Turn off light',turnOffLight);
  intentMap.set('Turn on outlet', turnOnOutlet)
  intentMap.set('Turn off outlet', turnOffOutlet);;
  intentMap.set('Show camera',showCamera);
  intentMap.set('Lock door',lockDoor);
  intentMap.set('Unlock door',unlockDoor);
  intentMap.set('Play music',playMusic);
  agent.handleRequest(intentMap);
});
