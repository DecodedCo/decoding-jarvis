// Testing functionality

// Do not modify below, unless you also modify index.js

'use strict';

require('dotenv').config()

const smartthing = require('./smartthings.js');
const spotify = require('./spotify.js');
const nest = require('./nest.js');
const fitbit = require('./fitbit.js');
const microsoft = require('./microsoft.js');
const utils = require('./utils.js');

const res = {
    json: function(data) {
        console.log(data);
    }
};

////////////////////////////////
///     Your testcode below:  //
////////////////////////////////

spotify.searchv2("Miley Cyrus").then(result => {
  smartthing.sonos("playTrack",result).then(result => {
    res.json(result);
  });
}).catch( error => {
  res.json({'fulfillmentText':`Whoops - ${error}`});
});
