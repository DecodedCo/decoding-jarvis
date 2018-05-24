var request = require('request')

exports.emotion = (imageUrl) => {

  return new Promise((resolve, reject) => {

    if (!process.env.microsoft_key) {
      reject("No Microsoft Key detected");      
    } else if (!imageUrl) {
      reject("No image specified");
    }

    var options = {
      url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
      method: 'POST',
      body: '{"url": "' + imageUrl + '"}',
      headers: {
        'Content-Type':'application/json',
        'Ocp-Apim-Subscription-Key': process.env.microsoft_key
      },
      timeout: 3000
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var results = JSON.parse(body); // response from Emotion API
        console.log(`${results.length} face(s) detected`);
        if (results.length > 0) {
          resolve(results);
        }
      } else { // there was an error
        reject(error);
      } // end processing response
    }); // end request

  }); // end Promise

} // end microsoftEmotion

