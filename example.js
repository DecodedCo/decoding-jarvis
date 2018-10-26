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
const microsoft = require("./microsoft.js");
const weather = require('weather-js');

let app = express();

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

app.use(bodyParser.json());

app.post("/", (request, response) => {
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));
  const agent = new WebhookClient({
    request,
    response,
  });

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
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function turnOffLight(agent) {
    return new Promise((resolve, reject) => {
      smartthings.light("switch", "off").then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function setBrightness(agent) {
    return new Promise((resolve, reject) => {
      let number = request.body.queryResult.parameters["number"];
      if (!number) {
        agent.add("Error: no number specified");
        resolve();
      } else {
        smartthings.light("switchLevel", number).then(result => {
          agent.add(result);
          console.log(result);
          resolve();
        });
      }
    });
  }

  function turnLightRed(agent) {
    return new Promise((resolve, reject) => {
      smartthings.light("colorControl", "red").then(result => {
        // defined in colors.js
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function playMusic(agent) {
    return new Promise((resolve, reject) => {
      let music = request.body.queryResult.parameters["music"];
      agent.add(`Trying to play ${music}...`);
      console.log(`Trying to play ${music}`);
      spotify
        .searchv2(music)
        .then(result => {
          smartthings.sonos("playTrack", result).then(result => {
            agent.add(result);
            console.log(result);
            resolve();
          });
        })
        .catch(error => {
          agent.add(`Whoops - ${error}`);
          console.log(error);
          resolve();
        });
    });
  }

  function showCamera(agent) {
    agent.add(new Image(nest.camera("e")));
  }

  function lockDoor(agent) {
    return new Promise((resolve, reject) => {
      smartthings.lock("lock").then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function unlockDoor(agent) {
    return new Promise((resolve, reject) => {
      smartthings.lock("unlock").then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function turnOnOutlet(agent) {
    return new Promise((resolve, reject) => {
      smartthings.outlet("on").then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function turnOffOutlet(agent) {
    return new Promise((resolve, reject) => {
      agent.add("Switching off outlet...");
      smartthings.outlet("off").then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  // Advanced

  function welcomeHome(agent) {
    return new Promise((resolve, reject) => {
      agent.add("Welcome home sir!");
      turnOnLight(agent).then( () => {
        unlockDoor(agent).then( () => {
          turnOnOutlet(agent).then( () => {
            let song = "spotify:track:3lX49Bqy21Y5HneUJ7p55G";
            let sonosData = {
              name: `Today's song`,
              sonosUri: spotify.sonosUri(song)
            }  
            smartthings.sonos("playTrack", sonosData).then(result => {
              agent.add(result);
              console.log(result);
              resolve();
            }); // end sonos
          }); // end outlet
        }); // end unlock door
      }); // end turn on light
    }); // end Promise
  }

  function detectEmotion(agent) {
    let url = nest.camera("e");

    return new Promise((resolve, reject) => {
      agent.add(new Image(url));
      microsoft
        .emotion(url)
        .then(emotion => {
          console.log(emotion);
          if (emotion.happiness > 0.5) {
            agent.add("You're happy enough to come in!");
            resolve(unlockDoor(agent));
          } else {
            agent.add(`You're not happy enough: ${emotion.happiness}`);
            resolve();
          }
        })
        .catch(error => {
          agent.add(`Error: ${error}`);
          console.log(`Error: ${error}`);
          resolve();
        });
    });
  }

  function checkWeather(agent) {
    let location = "Sao Paulo";

    return new Promise((resolve, reject) => {
      weather.find({search: location, degreeType: 'C'}, function(err, result) {
        if(err) resolve(`Error: ${err}`);
        console.log(result[0]);
        let currentWeather = result[0].current;

        agent.add(`Current temperature in ${location} is ${currentWeather.temperature}`);

        if (currentWeather.temperature > 20) {
          resolve(turnOnOutlet(agent));
        } else {
          resolve(turnOffOutlet(agent));
        }

      });
    });
  }

  function playMusicByDay(agent) {

    let d = new Date();
    let today = d.getDay();

    switch (today) {
      case 0: // Sunday
        var song = "spotify:track:3lX49Bqy21Y5HneUJ7p55G";
        break;
      case 1: // Monday
        var song = "spotify:track:3EFb1qDgIqf9MegIryKtDj";
        break;
      case 2: // Tuesday
        var song = "spotify:track:1OX2eJLfU0SHLzcy9sv9Vj";
        break;
      case 3: // Wednesday
        var song = "spotify:track:3PIitkAK79cY9SFcIEEIH9";
        break;
      case 4: // Thursday
        var song = "spotify:track:17Qsq7qxgGBDGfahhnX6bw";
        break;
      case 5: // Friday
        var song = "spotify:track:4QlzkaRHtU8gAdwqjWmO8n";
        break;
      case 6: // Saturday
        var song = "spotify:track:59VRFpPnC8pOhIH2WCWXF9";
        break;
    }

    console.log(`Song: ${song}`);

    let sonosData = {
      name: `Today's song`,
      sonosUri: spotify.sonosUri(song)
    }

    console.log(sonosData);

    return new Promise((resolve, reject) => {
      smartthings.sonos("playTrack", sonosData).then(result => {
        agent.add(result);
        console.log(result);
        resolve();
      });
    });
  }

  function customModel(agent) {
    let url = nest.camera("e");

    return new Promise((resolve, reject) => {
      agent.add(new Image(url));
      microsoft
        .prediction(url)
        .then(prediction => {
          if (prediction.down > 0.6) {
            agent.add("Thumbs down");
          } else if (prediction.up > 0.6) {
            agent.add("Thumbs up");
          } else {
            agent.add("No good prediction");
          }
          resolve();
        })
        .catch(error => {
          agent.add(`Error: ${error}`);
          console.log(`Error: ${error}`);
          resolve();
        });
    });
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default fallbackback Intent", fallback);
  intentMap.set("Turn on light", turnOnLight);
  intentMap.set("Turn off light", turnOffLight);
  intentMap.set("Set brightness", setBrightness);
  intentMap.set("Turn light red", turnLightRed);
  intentMap.set("Turn on outlet", turnOnOutlet);
  intentMap.set("Turn off outlet", turnOffOutlet);
  intentMap.set("Show camera", showCamera);
  intentMap.set("Lock door", lockDoor);
  intentMap.set("Unlock door", unlockDoor);
  intentMap.set("Play music", playMusic);

  // Advanced:
  intentMap.set("Welcome home", welcomeHome);
  intentMap.set("Detect emotion", detectEmotion);
  intentMap.set("Check weather", checkWeather);
  intentMap.set("Play music by day", playMusicByDay);
  intentMap.set("Custom model", customModel);

  agent.handleRequest(intentMap);
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log(`JARVIS is online at http://localhost:${app.get("port")}`);
});
