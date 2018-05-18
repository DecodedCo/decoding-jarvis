'use strict';

const FitbitApiClient = require("fitbit-node");

// manually generate token from https://dev.fitbit.com/apps/oauthinteractivetutorial

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2S1RWMjMiLCJhdWQiOiIyMkNXWTQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNTI2Njg2ODA2LCJpYXQiOjE1MjY2NTgwMDZ9.TJbHLqTb16aOW04_2Tg1dMnCM-oflr-u3mCF1PmSjak';

const client = new FitbitApiClient({clientId: "22CWY4", clientSecret: "7f4f7ab89c15dac152dd5da0283e555c", apiVersion: "1.2"});

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
