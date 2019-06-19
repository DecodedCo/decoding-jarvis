var request = require("request");

exports.text = (toNumber, textBody) => {
  console.log(`Sending ${textBody} to ${toNumber}...`);
  return new Promise((resolve, reject) => {
    if (!process.env.twilio_account_sid) {
      reject("No Twilio Key detected");
    } else if (!process.env.twilio_auth_token) {
      reject("No Twilio Auth Token specified");
    }

    var options = {
      url: 'https://api.twilio.com/2010-04-01/Accounts/ACe3215cd09a970ddbc8693b96b14335b1/Messages.json',
      method: "POST",
      headers: {
         Host: 'api.twilio.com',
         Authorization: 'Basic ' + new Buffer(process.env.twilio_account_sid + ":" + process.env.twilio_auth_token).toString("base64"),
      },
      formData: { To: toNumber, From: '+12055258885', Body: textBody }
    };

    console.log("Making request to Twilio");
    request(options, (error, response, body) => {
      if (response.statusCode === 201) {
        var results = JSON.parse(body); // response from Twilio
        if (results.error_message !== null) {
          reject(`Error: ${error}`);
        } else {
          resolve(`Messaged delivered to ${toNumber}`);
        }
      } else {
        reject(`Error: ${error}`);
      } // end processing response
    }); // end request
  }); // end Promise
}; // end twilioText
