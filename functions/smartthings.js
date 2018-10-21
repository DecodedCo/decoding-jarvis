/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

"use strict";

const functions = require("firebase-functions");

const https = require("https");
const host = "api.smartthings.com";
const token = functions.config().smartthings.token;
const devices = {
  light: "",
  lock: "",
  sonos: "",
  outlet: "",
};

var fulfillmentText;

exports.light = (capability, value) => {
  return new Promise((resolve, reject) => {
    const device = devices.light; // which light
    if (!device) resolve("No light specified in my code");

    var command, argument;
    const colors = require("./colors.js");

    if (value == "status") {
      // return value
      SmartThingsStatus(device, capability).then(status => {
        status = JSON.parse(status);
        switch (capability) {
          case "switchLevel":
            resolve(`The light is at ${status.level.value}%`);
            break;
          case "switch":
            resolve(`The light is ${status.switch.value}`);
            break;
          case "colorControl":
            resolve(
              `The light has a hue of ${status.hue.value} and a saturation of ${
                status.saturation.value
              }`
            );
            break;
        }
      });
    } else {
      switch (capability) {
        case "switch":
          command = value;
          fulfillmentText = `Turning the light ${command}`;
          break;
        case "colorControl":
          command = "setColor";
          argument = colors.tohs(value);
          fulfillmentText = `Turning the light ${value}`;
          break;
        case "switchLevel":
          command = "setLevel";
          argument = [value];
          fulfillmentText = `Setting brightness to ${value}`;
          break;
      }

      commandSmartThings(device, capability, command, argument)
        .then(() => {
          resolve(fulfillmentText);
        })
        .catch(error => {
          resolve(error); // want to resolve to minimize code
        }); // end commandSmartThings
    } // end if status or command
  }); // end Promise
}; // end light

exports.lock = command => {
  return new Promise((resolve, reject) => {
    const device = devices.lock; // which lock
    if (!device) resolve("No lock specified in my code");

    const capability = "lock";
    var fulfillmentText =
      command == "lock" ? "Locking the door" : "Unlocking the door";

    if (command == "status") {
      // return value
      SmartThingsStatus(device, capability).then(status => {
        status = JSON.parse(status);
        resolve(`The door is ${status.lock.value}`);
      });
    } else {
      commandSmartThings(device, capability, command)
        .then(() => {
          resolve(fulfillmentText);
        })
        .catch(error => {
          resolve(error); // want to resolve to minimize code
        }); // end smartThings
    }
  }); // end Promise
}; // end lock

exports.sonos = (command, value) => {
  return new Promise((resolve, reject) => {
    const device = devices.sonos; // which sonos
    if (!device) resolve("No Sonos specified in my code");

    var capability = "musicPlayer",
      fulfillmentText,
      argument = value ? [value] : null;

    if (command == "status") {
      SmartThingsStatus(device, capability).then(status => {
        status = JSON.parse(status);
        // todo - add what's currently playing
        resolve(
          `Music is ${status.status.value}. Player is at volume ${
            status.level.value
          }`
        );
      });
    } else {
      switch (command) {
        case "setLevel":
          fulfillmentText = `Setting volume to ${value}`;
          break;
        case "play":
          fulfillmentText = `Playing`;
          break;
        case "pause":
          fulfillmentText = `Pausing`;
          break;
        case "playTrack":
          fulfillmentText = `Playing ${value.name}`;
          argument = [value.sonosUri];
          break;
      }

      commandSmartThings(device, capability, command, argument)
        .then(() => {
          resolve(fulfillmentText);
        })
        .catch(error => {
          resolve(error); // want to resolve to minimize code
        }); // end smartThings
    } // end if status
  }); // end Promise
}; // end sonos

exports.outlet = command => {
  return new Promise((resolve, reject) => {
    const device = devices.outlet; // which outlet
    if (!device) resolve("No outlet specified in my code");

    const capability = "switch";
    var fulfillmentText =
      command == "on" ? "Turning on the outlet" : "Turning off the outlet";

    if (command == "status") {
      // return value
      SmartThingsStatus(device, capability).then(status => {
        status = JSON.parse(status);
        resolve(`The outlet is ${status.switch.value}`);
      });
    } else {
      commandSmartThings(device, capability, command)
        .then(() => {
          resolve(fulfillmentText);
        })
        .catch(error => {
          resolve(error); // want to resolve to minimize code
        }); // end smartThings
    } // end if status
  }); // end Promise
}; // end outlet

function commandSmartThings(device, capability, command, argument = null) {
  return new Promise((resolve, reject) => {
    let path = `/v1/devices/${device}/commands`;
    let payload = {
      commands: [
        {
          component: "main",
          capability: capability,
          command: command,
        },
      ],
    };

    if (argument) {
      payload.commands[0].arguments = argument;
    }

    let body = JSON.stringify(payload);

    let options = {
      host: host,
      path: path,
      headers: {
        Authorization: "Bearer: " + token,
        "Content-Length": Buffer.byteLength(body),
      },
      method: "POST",
    }; // end options

    const request = https.request(options, function(res) {
      let body = "";
      if (res.statusCode != "200") {
        reject(`Error calling the Smarthings API: Status ${res.statusCode}`);
      }
      res.on("data", d => {
        body += d;
      });
      res.on("end", () => {
        resolve(body);
      });
    }); // end request

    request.on("error", error => {
      console.log(`Error calling the Smarthings API: ${error}`);
      reject(`Error calling the Smarthings API: ${error}`);
    });

    request.write(body);
    request.end();
  }); // end Promise
} // end commandSmartThings

function SmartThingsStatus(device, capability) {
  return new Promise((resolve, reject) => {
    let path = `/v1/devices/${device}/components/main/capabilities/${capability}/status`;

    let options = {
      host: host,
      path: path,
      headers: {
        Authorization: "Bearer: " + token,
      },
      method: "GET",
    }; // end options

    const request = https.request(options, function(res) {
      let body = "";
      if (res.statusCode != "200") {
        resolve(`Error calling the Smarthings API: Status ${res.statusCode}`);
      }
      res.on("data", d => {
        body += d;
      });
      res.on("end", () => {
        resolve(body); // this needs to be formatted
      });
    }); // end request

    request.on("error", error => {
      console.log(`Error calling the Smarthings API: ${error}`);
      resolve(`Error calling the Smarthings API: ${error}`);
    });

    request.end();
  }); // end Promise
} // end commandSmartThings
