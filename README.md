# Jarvisv2 Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

## Supported Devices

1. Nest Camera
3. Samsung Smarthings Hub
  4. Samsung Smarthings Power Outlet
  6. Silvania Smart Bulb
  8. Sonos (using Spotify)
  9. Yale Lock

## Setup

You will need a Dialogflow project and a Heroku account.

1. Clone this repository: `git clone https://github.com/DecodedCo/decoding-jarvis.git`
2. Create a new heroku app: `heroku create`
3. Update the heroku environment variables `heroku config:set ...` - ask for private `.env` file, or follow manually below
4. Deploy to heroku using `git push heroku master`
5. Make any updates by first committing your code: `git commit -am "Your commit message"` then by following step 4.

### smartthings

1. Obtain your Personal Access Token (`token`) from https://account.smartthings.com/tokens.
2. Set the environment variable for your deployment: `heroku config:set smartthings_token="TOKEN"`
3. Collect the necessary Device Ids (`devices`) from https://api.smartthings.com/v1/devices (called with header `Authorization: Bearer: token`) and update `smartthings.js`
4. Update `colors.js` with your desired color map if you are using the lightbulb

### Nest Camera

1. Obtain the snapshot URL following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md
2. Set the environment variable for e.g. camera A: `heroku config:set nest_a_uri=""`

### Spotify

1. Set the environment variables: `heroku config:set spotify_id=""` and `heroku config:set spotify_secret=""`

### Sonos

1. Update `spotify.js` with the `sid` and `sn` intercepted by querying the Sonos device through the smartthings API as it is playing a track from the app.

## Defeating third party API caches

Some services (Microsoft) cache URLs for their services - they only check the URL once, rather than checking to see if the contents have changed.

To overcome this limitation, you can generate unique URLs that do not affect the underlying request, but do "trick" the API into reloading the contents.

1. Make sure you have imported the utilities first:

`const utils = require('./utils.js');`

2. Use the following code for your final response, updating `IMAGEURL` with your image url:

`utils.uniqueUrl(IMAGEURL)`

e.g.

`requestAPI(utils.uniqueUrl("https://URL/"))`

## Functionality

### Light Bulb

#### Switch

Get status and switch on or off:

```
smartthings.light("switch","status").then(result => {
  agent.add(result);
});

smartthings.light("switch","off").then(result => { // or on
  agent.add(result);
});
```

#### Brightness

Get current brightness and set the brightness (0-100):

```
smartthings.light("switchLevel","status").then(result => { // 0-100
  agent.add(result);
});

smartthings.light("switchLevel",100).then(result => { // 0-100
  agent.add(result);
});
```

#### Color

Get current hue and saturation, and set the color based on the mapping in `colors.js`:

```
smartthings.light("colorControl","status").then(result => {
  agent.add(result);
});

smartthings.light("colorControl","red").then(result => { // defined in colors.js
  agent.add(result);
});

```

### Lock

Check the lock status and lock/unlock:

```
smartthings.lock("status").then(result => {
  agent.add(result);
});

smartthings.lock("lock").then(result => { // or unlock
  agent.add(result);
});
```

### Sonos

Check what's currently playing:

```
smartthings.sonos("status").then(result => {
  agent.add(result);
});
```

#### Play/pause

Play/pause the current track:

```
smartthings.sonos("pause").then(result => { // or play
  agent.add(result);
});
```

#### Volume

Set the volume (0-100):

```
smartthings.sonos("setLevel",60).then(result => { // 0-100
  agent.add(result);
});
```

#### Play Music (from Spotify)

You can search for a track, artist or album, and pass the result onto Sonos:

```
spotify.searchv2("The Beatles").then(result => {
  smartthings.sonos("playTrack",result).then(result => {
    agent.add(result);
  });
}).catch( error => {
  agent.add(`Whoops - ${error}`);
});
```

### Smart Outlet

Check status and switch on/off:

```
smartthings.outlet("status").then(result => {
  agent.add(result);
});

smartthings.outlet("off").then(result => { // or on
  agent.add(result);
});
```

### Nest Camera

Returns URL for most recent image from e.g. camera A:

```
agent.add(new Image(nest.camera("a")));
```
