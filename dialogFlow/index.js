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

'use strict';

const https = require('https');

const host = 'api.smartthings.com';
const device = 'eeb62d1e-ae4d-4124-ae65-f42c97134e2e'
const token = '8cfc63f8-e342-4607-9797-09ee094b2970';

exports.switchBulb = (req, res) => {
  let intent = req.body.queryResult.intent.displayName;

  let command = '';
  switch (intent) {
    case "Turn light on":
      command = "on";
      break;
    case "Turn light off":
      command = "off";
      break;
  }

  console.log(command);

  let payload = {
    "commands": [
      {
        "component": "main",
        "capability": "switch",
        "command": command
      }
    ]
  }
  
  commandSmartThings(device, payload).then((output) => {
    res.json({ 'fulfillmentText': 'Turning the light ' + command });
  }).catch((error) => {
    res.json({ 'fulfillmentText': error });
  });

}; // end BulbTurnOn

function commandSmartThings (device, payload) {
  return new Promise((resolve, reject) => {

    let path = '/v1/devices/' + device + '/commands';
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

