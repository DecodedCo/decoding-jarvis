"use strict";

// Thermostat
const nest = require("unofficial-nest-api");
const functions = require("firebase-functions");

const username = functions.config().nest.username;
const password = functions.config().nest.username;
const unit = "c"; // c or f

// Camera setup below

exports.thermostat = (command, value) => {
  var nestId, targetTemp;

  return new Promise((resolve, reject) => {
    nest.login(username, password, function(err, data) {
      if (err) {
        reject(err.message);
      } else {
        nest.fetchStatus(function(data) {
          for (var deviceId in data.device) {
            if (data.device.hasOwnProperty(deviceId)) {
              nestId = deviceId;
              break;
            }
          } // end foreach device

          switch (command) {
            case "status":
              let currentTemp = data.shared[nestId].current_temperature;
              targetTemp = data.shared[nestId].target_temperature;
              currentTemp =
                unit == "c"
                  ? currentTemp.toFixed(1)
                  : celsiusToFahrenheit(currentTemp);
              targetTemp =
                unit == "c"
                  ? targetTemp.toFixed(1)
                  : celsiusToFahrenheit(targetTemp);

              resolve(
                `Current temperature is ${currentTemp} with a target temperature of ${targetTemp}`
              );
              break;
            case "set":
              targetTemp = value > 45 ? fahrenheitToCelsius(value) : value; // needs to be C
              nest.setTemperature(nestId, targetTemp);
              resolve(`Setting temperature to ${value}`);
              break;
          } // end switch
        }); // end nest.fetchStatus
      } // end if err
    }); // end nest.login
  }); // end Promise
}; // end nest

var fahrenheitToCelsius = function(f) {
  return ((f - 32) * 5) / 9.0;
};

var celsiusToFahrenheit = function(c) {
  return Math.round(c * (9 / 5.0) + 32.0);
};

// Camera
// Manually generate this url by following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md

exports.camera = (label) => {
  return functions.config().nest[label].uri; // end return
}; // end camera
