var request = require('request')
require('dotenv').config()

var imageUrl= ''

var options = {
  url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  method: 'POST',
  body: '{"url": "' + imageUrl + '"}',
  headers: {
    'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key': process.env.microsoft_key
  },
  timeout: 2000
};

request(options, callback);

function callback(error, response, body) {

  if (!error && response.statusCode == 200) {
    var results = JSON.parse(body); // response from Emotion API
    console.log(`${results.length} face(s) detected`);
    if (results.length > 0) {
      results.forEach( face => {
        console.log(face);
      });
    }
  } else { // something horrible happened - see fake.js
    console.error(error);
  } // end processing response
} // end callback
