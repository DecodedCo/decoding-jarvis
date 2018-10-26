var request = require("request");

let face = imageUrl => {
  console.log(`Checking for faces in ${imageUrl}`);
  return new Promise((resolve, reject) => {
    if (!process.env.microsoft_key_face) {
      reject("No Microsoft Key detected");
    } else if (!imageUrl) {
      reject("No image specified");
    }

    var options = {
      url:
        "https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
      method: "POST",
      body: '{"url": "' + imageUrl + '"}',
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.microsoft_key_face,
      },
      timeout: 2000,
    };

    console.log("Making request to Microsoft");
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var results = JSON.parse(body); // response from Emotion API
        console.log(`${results.length} face(s) detected`);
        if (results.length > 0) {
          resolve(results);
        } else {
          reject("No faces found");
        }
      } else {
        // there was an error
        reject(`Error: ${error}`);
      } // end processing response
    }); // end request
  }); // end Promise
}; // end microsoftEmotion

exports.emotion = imageUrl => {
  return new Promise((resolve, reject) => {
    face(imageUrl)
      .then(result => {
        let data = result[0].faceAttributes.emotion;
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.prediction = imageUrl => {
  return new Promise((resolve, reject) => {

    var options = {
      url:
        "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/7c9d932a-0956-434b-b939-842abe5797e9/url?iterationId=d063039e-6f5b-452c-a306-95e8ba22eb61",
      method: "POST",
      body: '{"url": "' + imageUrl + '"}',
      headers: {
        "Content-Type": "application/json",
        "Prediction-Key": "24a36be869414e18b39596255d276a98"
      },
      timeout: 2000,
    };

    console.log("Making request to Microsoft");
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var results = JSON.parse(body); // response from Prediction API
        if (results.predictions.length > 0) {
          resolve(formatPredictions(results.predictions));
        } else {
          reject("Error: no predictions available");
        }
      } else {
        // there was an error
        reject(`Error: ${error}`);
      } // end processing response
    }); // end request

  });
}

const formatPredictions = (predictions) => {
  let formatted = {};
  predictions.forEach((prediction) => {
    formatted[prediction.tagName] = prediction.probability
  })
  console.log(formatted);
  return formatted;
}
