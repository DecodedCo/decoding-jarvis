# Decoding Javis
This repo is the hub for creating a client build based on [this proposal](https://docs.google.com/presentation/d/1i-W7ku5x-y3Ck8yJlZdvMJUU96WQ34Bt40LDqQVRf5Y/edit#slide=id.g24f9bda3d1_0_91) for Itaú.

**The Mission**  
"By the end of this session, participants will leave with a powerful, elevated understanding of disruptive tech, an AI project they have built themselves, and the ability to approach strategy at Itaú more effectively."

## Attendee Downloads
- [Chrome](https://www.google.com/chrome/)  
- [Postman](https://www.getpostman.com/apps)

## Table of Contents by Device
[Nest Camera](#nest-camera)  
[Sonos Speaker](#sonos-speaker)     
Nest Thermostat
Sylvania Smart Color Bulb  
Smart Outlet  
Motion Sensor  
Smart Lock  
Nest Thermostat  
Little Bit Cloud  
Chromecast  
Fitbit Band  
Fitbit Scale  
Smart Coffee

## Ariana Random Thoughts
- TBD

<!-- ************************** NEST ************************** -->
## Nest Camera
------
**Device:** [Nest Camera](https://www.amazon.com/Nest-Security-Camera-Matters-Anywhere/dp/B00WBJGUA2/ref=sr_1_1?s=grocery&ie=UTF8&qid=1523896108&sr=8-1&keywords=nest+cam)  
**Dev Documentation:** [Nest Developers](https://developers.nest.com/)  
**API Documentation:** [Nest Camera Official API](https://developers.nest.com/documentation/cloud/api-camera)    
**Attendee Guide:** [Nest API Quick Start Guide](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#0)    

**NestAccount:** jarvis@decoded.com  
**Live Stream:** [Our camera url](https://home.nest.com/camera/4fe5618ba62f413dbd943fc47b2f34e1)  
**Current Permissions:** Camera & Images Read  

**Mobile App:** Nest  
**Works with IFTTT?**: Yes (“If motion detected, turn on Hue Lights”)  
**Works with Google Home?**: Yes, but voice commands don't seem to work (can use Chromecast).  

### Device Setup
1. Plug Nest into computer & select device from menu
2. Click `Nest Cam Setup (Macintosh)` to get started.
3. Follow up setup prompts. Device setup will be completed when you plug into outlet & see recording.

### Nest Authentication/Authorization
[Nest Authentication/Authorization Walk Through](https://developers.nest.com/documentation/cloud/how-to-auth)  
1. Login as Jarvis with [Nest Developers](https://developers.nest.com/) to gain access to the client ID, client secret, & authorization url  
2. Get pin using the [authorization url](https://home.nest.com/login/oauth2?client_id=a211585b-577a-48d1-993b-90c0d648411a&state=STATE) in the browser  
3. [Set up Postman](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#4), including pin from step 2  
4. Make `POST` request, obtain access token, then open a new tab & follow [quick start guide step 6](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#5) to read from the API  

### Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [Authorization Sample Code](https://developers.nest.com/documentation/cloud/sample-code-auth)  
- [Node Nest Library](https://github.com/johnwyles/node-nest-api)  
- [Python Nest Library](https://github.com/nestlabs/nest-python)  

#### Mark Notes
- Streams video with about 1-5s latency.

<!-- ************************** SONOS ************************** -->
## Sonos Speaker
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

### Device Setup
1. Plug Sonos Speaker into outlet & connect to internet. That's it.

### Sonos Authentication/Authorization
No additional authentication needed for the Sonos speaker, so proceed with the following instructions to gain access to the API.
1. `git clone` the [Sonos HTTP API Repo](https://github.com/jishi/node-sonos-http-api) locally to access API functionality
2. `cd` into the directory & run `npm install --production` to install dependencies
3. Run `npm start` then go to `localhost:5005` & you'll be able to run commands using the format `http://localhost:5005/office/{command}` from there.
4. For all commands reference to the [Sonos HTTP API Documentation](https://github.com/jishi/node-sonos-http-api).

### Spotify Authentication/Authorization
Use the [Spotify Authorization Guide](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) to get the token. Below are simplified steps:
1. Create a [Spotify Application](https://developer.spotify.com/my-applications/#!/applications/create) to get client keys.
2. `git clone` the [Spotify Web API](https://github.com/spotify/web-api-auth-examples) & run `npm install` to install dependencies.
3. Open `app.js` in the `authorization` folder in Atom, add the **Client ID**, **Client Secret** and the redirect_uri of `http://localhost:8888/callback`
4. In the terminal, `cd authorization` then run `node app.js` to start the server.
5. In your browser, go to `localhost:8888`, allow Spotify to sign you in & you'll get your access token.
6. To verify token, use `curl` commands on the [Spotify Authorization Guide](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/) & match to [Spotify API](https://beta.developer.spotify.com/documentation/web-api/reference/browse/) endpoints for info.

### Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [Spotify Web API Libraries](https://beta.developer.spotify.com/documentation/web-api/libraries/)
- [Spotify API Reference](https://beta.developer.spotify.com/documentation/web-api/reference/browse/)

#### Mark Notes
- Only a premium Spotify Account integrates with Sonos
