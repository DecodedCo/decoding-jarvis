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

"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, Image } = require("dialogflow-fulfillment");
const smartthings = require("./smartthings.js");
const spotify = require("./spotify.js");
const nest = require("./nest.js");
const utils = require("./utils.js");

let app = express();

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

app.use(bodyParser.json());

app.post("/", (request, response) => {
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));
  const agent = new WebhookClient({ request, response });

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function turnOnLight(agent) {
    agent.add("Turning the lights on");
    smartthings.light("switch", "on").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function turnOffLight(agent) {
    agent.add("Turning the lights off");
    smartthings.light("switch", "off").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function turnLightRed(agent) {
    agent.add("Turning light red");
    smartthings.light("colorControl", "red").then(result => {
      // defined in colors.js
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function playMusic(agent) {
    let music = request.body.queryResult.parameters["music"];
    agent.add(`Playing ${music}...`);
    console.log("Going to play", music); // passed through as a parameter
    spotify
      .searchv2(music)
      .then(result => {
        smartthings.sonos("playTrack", result).then(result => {
          agent.add(result); // this does not return quickly enough
          console.log(result);
        });
      })
      .catch(error => {
        agent.add(`Whoops - ${error}`);
        console.log(error);
      });
  }

  function showCamera(agent) {
    agent.add(new Image(nest.camera("e")));
  }

  function lockDoor(agent) {
    agent.add("Locking the door...");
    smartthings.lock("lock").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function unlockDoor(agent) {
    agent.add("Unlocking the door...");
    smartthings.lock("unlock").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function turnOnOutlet(agent) {
    agent.add("Switching on outlet...");
    smartthings.outlet("on").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }

  function turnOffOutlet(agent) {
    agent.add("Switching off outlet...");
    smartthings.outlet("off").then(result => {
      agent.add(result); // this does not return quickly enough
      console.log(result);
    });
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default fallbackback Intent", fallback);
  intentMap.set("Turn on light", turnOnLight);
  intentMap.set("Turn off light", turnOffLight);
  intentMap.set("Turn light red", turnLightRed);
  intentMap.set("Turn on outlet", turnOnOutlet);
  intentMap.set("Turn off outlet", turnOffOutlet);
  intentMap.set("Show camera", showCamera);
  intentMap.set("Lock door", lockDoor);
  intentMap.set("Unlock door", unlockDoor);
  intentMap.set("Play music", playMusic);
  agent.handleRequest(intentMap);
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log(`JARVIS is online at http://localhost:${app.get("port")}`);
});
