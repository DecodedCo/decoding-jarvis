
# Sonos Speaker
To work with Sonos, you will be using a **Sonos HTTP API** to control the system & **Spotify API** to control the music.

**Device:** [Sonos Speaker](https://www.amazon.com/All-new-Sonos-One-built-incredible/dp/B074XLMYY5/ref=sr_1_1_sspa?ie=UTF8&qid=1523894304&sr=8-1-spons&keywords=sonos+wireless+speakers&psc=1)  
**Dev Documentation:** [Sonos HTTP API](https://github.com/jishi/node-sonos-http-api)  
**API Documentation:** [Spotify API](https://beta.developer.spotify.com/documentation/web-api/reference/browse/)  

**Sonos Account:** jarvis@decoded.com  
**Spotify Premium Account:** jarvis@decoded.com  
**Current Permissions:** TBD

**Mobile App:** Sonos Control  
**Works with IFTTT?**: No  
**Works with Google Home?**: No (But does work with Alexa)  

## Device Setup
1. Plug Sonos Speaker into outlet & connect to internet. That's it.

## Sonos Authentication/Authorization
No additional authentication needed for the Sonos speaker, so proceed with the following instructions to gain access to the API.
1. `git clone` the [Sonos HTTP API Repo](https://github.com/jishi/node-sonos-http-api) locally to access API functionality
2. `cd` into the directory & run `npm install --production` to install dependencies
3. Run `npm start` then go to `localhost:5005` & you'll be able to run commands using the format `http://localhost:5005/office/{command}` from there.
4. For all commands reference to the [Sonos HTTP API Documentation](https://github.com/jishi/node-sonos-http-api).

## Spotify Authentication/Authorization
Use the [Spotify Authorization Guide](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) to get the token. Below are simplified steps:
1. Create a [Spotify Application](https://developer.spotify.com/my-applications/#!/applications/create) to get client keys.
2. `git clone` the [Spotify Web API](https://github.com/spotify/web-api-auth-examples) & run `npm install` to install dependencies.
3. Open `app.js` in the `authorization` folder in Atom, add the **Client ID**, **Client Secret** and the redirect_uri of `http://localhost:8888/callback`
4. In the terminal, `cd authorization` then run `node app.js` to start the server.
5. In your browser, go to `localhost:8888`, allow Spotify to sign you in & you'll get your access token.
6. To verify token, use `curl` commands on the [Spotify Authorization Guide](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/) & match to [Spotify API](https://beta.developer.spotify.com/documentation/web-api/reference/browse/) endpoints for info.

## Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [Spotify Web API Libraries](https://beta.developer.spotify.com/documentation/web-api/libraries/)
- [Spotify API Reference](https://beta.developer.spotify.com/documentation/web-api/reference/browse/)

## Mark Notes
- Only a premium Spotify Account integrates with Sonos
