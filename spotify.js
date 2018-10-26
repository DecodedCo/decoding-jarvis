"use strict";

const Spotify = require("node-spotify-api");

const spotify = new Spotify({
  id: process.env.spotify_id,
  secret: process.env.spotify_secret,
});

var country = "us"; // todo - update search to reflect this

const sonosUri = spotifyUri => {
  // Sonos settings:

  let sid = 12; // from sniffing status - hard coded :(
  let sn = 2; // ditto from sniffing using Postman

  return `x-sonos-spotify:${encodeURIComponent(spotifyUri)}?sid=${sid}&flags=8224&sn=${sn}`;

}

exports.sonosUri = sonosUri;

exports.searchv2 = search => {

  return new Promise((resolve, reject) => {
    spotify
      .search({ type: "artist,album,track,playlist", query: search, limit: 1 })
      .then(function(response) {
        if (response.tracks.items[0]) {
          let item = response.tracks.items[0];
          let name = item.name;
          resolve({ name: name, sonosUri: sonosUri(item.uri) });
        } else {
          reject("Nothing found.");
        }
      })
      .catch(function(err) {
        reject(err);
      });
  }); // end Promise
}; // end searchSpotifyv2
