"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, Image } = require("dialogflow-fulfillment");
const smartthings = require("./smartthings.js");
const spotify = require("./spotify.js");
const nest = require("./nest.js");
const microsoft = require("./microsoft.js");
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
    return new Promise((resolve, reject) => {
      smartthings.light("switch", "on").then(result => {
        agent.add(result); // response to dialogflow
        console.log(result);
        resolve();
      });
    });
  }

  // Add your own functions below:

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default fallbackback Intent", fallback);
  intentMap.set("Turn on light", turnOnLight);

  // Add your own intents below:

  agent.handleRequest(intentMap);
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log(`JARVIS is online at http://localhost:${app.get("port")}`);
});
