'use strict';

const FitbitApiClient = require("fitbit-node");

// From https://dev.fitbit.com/apps/oauthinteractivetutorial

const accessToken = process.env.fitbitAccessToken;

// From https://dev.fitbit.com/apps
const client = new FitbitApiClient({clientId: process.env.fitbitClientId, clientSecret: process.env.fitbitClientSecret, apiVersion: "1.2"});

exports.profile = () => {
  return new Promise((resolve, reject) => {

    const path = '/profile.json';

    client.get(path, accessToken).then( data => {
      if (data[0]) {
        resolve(data[0].user);
      } else {
        reject({ 'fulfillmentText': `No fitbit users found.` });
      }
      
    }); // end client.get


  }); //end Promise
} // end profile

exports.steps = (date) => {
  return new Promise((resolve, reject) => {

    if (!date) { // set to today
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      date = `${yyyy}-${mm}-${dd}`
    }

    const path = `/activities/date/${date}.json`;

    client.get(path, accessToken).then( data => {
      if (data[0]) {
        resolve({ 'fulfillmentText': `${data[0].summary.steps} steps logged on ${date}.` });
      } else {
        reject({ 'fulfillmentText': `No steps logged on ${date}.` });
      }
      
    }); // end client.get


  }); //end Promise
} // end profile
