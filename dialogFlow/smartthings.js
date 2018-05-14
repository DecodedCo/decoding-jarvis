/*
  This is the "master" webhook to process _all_ intents from DialogFlow
*/

'use strict';

const https = require('https');

const host = 'api.smartthings.com';
const token = '8cfc63f8-e342-4607-9797-09ee094b2970';

exports.light = (state) => {
  
  let device = 'eeb62d1e-ae4d-4124-ae65-f42c97134e2e'; // which light
  let capability = 'switch';
  let command = state; // on or off

  commandSmartThings(device, capability, command).then((output) => {
    return ({ 'fulfillmentText': 'Turning the light ' + command });
  }).catch((error) => {
    return ({ 'fulfillmentText': error });
  });

}; // end light

function commandSmartThings (device, capability, command, argument = null) {

  return new Promise((resolve, reject) => {

    let path = '/v1/devices/' + device + '/commands';
    let payload = {
      "commands": [
        {
          "component": "main",
          "capability": capability,
          "command": command
        }
      ]
    }

    if (argument) {
      payload.commands[0].arguments = argument;
    }

    let body = JSON.stringify(payload);

    let options = {
      host: host,
      path: path,
      headers: {
        'Authorization': 'Bearer: ' + token,
        'Content-Length': Buffer.byteLength(body)
      },
      method: 'POST'
    } // end options

    const request = https.request(options, function(res) {
      let body = ''
      res.on('data', (d) => { body += d; });
      res.on('end', () => {
        resolve(body);
      });
      res.on('error', (error) => {
        console.log(`Error calling the Smarthings API: ${error}`)
        reject(error);
      });
    }); // end request

    request.write(body);

  }); // end Promise
} // end commandSmartThings
