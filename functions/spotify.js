'use strict';

const Spotify = require('node-spotify-api');
const functions = require('firebase-functions')

const spotify = new Spotify({
  id: functions.config().spotify.id,
  secret: functions.config().spotify.secret
});

var country = 'us'; // todo - update search to reflect this

exports.searchv2 = (search) => {

  // Sonos settings:

  let sid = 12; // from sniffing status - hard coded :(
  let sn = 1; // ditto from sniffing
  
  return new Promise((resolve, reject) => {
 
    spotify
      .search({ type: 'artist,album,track,playlist', query: search, limit: 1 })
      .then(function(response) {
        if (response.tracks.items[0]) {
          let item = response.tracks.items[0];
          let name = item.name;
          let spotifyUri = encodeURIComponent(item.uri);
          let sonosUri = `x-sonos-spotify:${spotifyUri}?sid=${sid}&flags=8224&sn=${sn}`;

          resolve({'name' : name, 'sonosUri' : sonosUri});
        } else {
          reject("Nothing found.");
        }

      })
      .catch(function(err) {
        reject(err);
      });

  }); // end Promise

} // end searchSpotifyv2

function topTrack(artistId) {

  return new Promise((resolve, reject) => {

    spotify
      .request(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`)
      .then(function(data) {
        let tracks = shuffle(data.tracks);
        resolve(tracks[0]); 
      })
      .catch(function(err) {
        reject('Error occurred: ' + err); 
      });

  }); // end Promise

} // end topTrack

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Deprecated

exports.search = (search,type) => {

  var items, sonosUri;

  // Sonos settings:

  let sid = 12; // from sniffing status - hard coded :(
  let sn = 1; // ditto from sniffing
  
  return new Promise((resolve, reject) => {
 
    spotify
      .search({ type: type, query: search, limit: 1 })
      .then(function(response) {
        
        // from https://github.com/jishi/node-sonos-http-api
        // playlist: x-rincon-cpcontainer:0006206c${id}
        // album: x-rincon-cpcontainer:0004206c${id}
        // song: x-sonos-spotify:spotify%3atrack%3a${id}?sid=${sid}&flags=8224&sn=${accountSN}

        if (type == "artist") { // we need to find a track for an artist
          items = response.artists.items;
          if (items[0]) {
            topTrack(items[0].id).then( item => {
              let spotifyUri = encodeURIComponent(item.uri);
              resolve({ 'name': item.name, 'uri': item.uri, 'sonosUri': `x-sonos-spotify:${spotifyUri}?sid=${sid}&flags=8224&sn=${sn}` });
              });
          } else {
            reject("No artists found");
          } // end if results
        } else {

          switch (type) {
            case "track":
              items = response.tracks.items;
              break;
            case "album":
              items = response.albums.items;
              break;
            case "playlist":
              items = response.playlists.items;
              break;
          }

          if (items[0]) {

            switch (type) {
              case "playlist":
                sonosUri = `x-rincon-cpcontainer:0006206c${items[0].id}`; //todo: fix
                break;
              case "album":
                sonosUri = `x-rincon-cpcontainer:0004206c${items[0].id}`;
                break;
              default:
                let spotifyUri = encodeURIComponent(items[0].uri);
                sonosUri = `x-sonos-spotify:${spotifyUri}?sid=${sid}&flags=8224&sn=${sn}`;
                break;              
            } // end switch on type
            resolve({ 'name': items[0].name, 'uri': items[0].uri, 'sonosUri': sonosUri });
          } else {
            reject("No tracks found");
          } // end if results
        
        } // end if artist

      })
      .catch(function(err) {
        reject(err);
      });

  }); // end Promise

} // end searchSpotify
