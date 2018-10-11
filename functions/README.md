# Jarvis Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

## Supported Devices

1. Nest Camera
2. Nest Thermostat
3. Samsung Smarthings Hub
4. Samsung Smarthings Power Outlet
6. Silvania Smart Bulb (through Samsung Smarthings)
8. Sonos (through Samsung Smarthings and Spotify)
9. Yale Lock (through Samsung Smarthings)

## Setup

First, create an agent and deploy this library following instructions at https://github.com/DecodedCo/decoding-jarvis

### Smartthings

1. Obtain your Personal Access Token (`token`) from https://account.smartthings.com/tokens.
2. Set the environment variable for your deployment: `firebase functions:config:set smartthings.token="TOKEN"`
3. Collect the necessary Device Ids (`devices`) from https://api.smartthings.com/v1/devices (called with header `Authorization: Bearer: token`) and update `smartthings.js`
4. Update `colors.js` with your desired color map if you are using the lightbulb

### Nest Camera

1. Obtain the snapshot URL following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md
2. Set the environment variable: `firebase functions:config:set nest.uri=""`

### Nest Thermostat

1. Set the environment variables: `firebase functions:config:set nest.username=""` and `firebase functions:config:set nest.password=""`

### Spotify

1. Set the environment variables: `firebase functions:config:set spotify.id=""` and `firebase functions:config:set spotify.secret=""`

### Sonos

1. Update `spotify.js` with the `sid` and `sn` intercepted by querying the Sonos device through the Smartthings API as it is playing a track from the app.

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
smartthing.light("switch","status").then(result => {
  agent.add(result);
});

smartthing.light("switch","off").then(result => { // or on
  agent.add(result);
});
```

#### Brightness

Get current brightness and set the brightness (0-100):

```
smartthing.light("switchLevel","status").then(result => { // 0-100
  agent.add(result);
});

smartthing.light("switchLevel",100).then(result => { // 0-100
  agent.add(result);
});
```

#### Color

Get current hue and saturation, and set the color based on the mapping in `colors.js`:

```
smartthing.light("colorControl","status").then(result => {
  agent.add(result);
});

smartthing.light("colorControl","red").then(result => { // defined in colors.js
  agent.add(result);
});

```

### Lock

Check the lock status and lock/unlock:

```
smartthing.lock("status").then(result => {
  agent.add(result);
});

smartthing.lock("lock").then(result => { // or unlock
  agent.add(result);
});
```

### Sonos

Check what's currently playing:

```
smartthing.outlet("status").then(result => {
  agent.add(result);
});
```

#### Play/pause

Play/pause the current track:

```
smartthing.sonos("pause").then(result => { // or play
  agent.add(result);
});
```

#### Volume

Set the volume (0-100):

```
smartthing.sonos("setLevel",60).then(result => { // 0-100
  agent.add(result);
});
```

#### Play Music (from Spotify)

You can search for a track, artist or album, and pass the result onto Sonos:

```
spotify.searchv2("The Beatles").then(result => {
  smartthing.sonos("playTrack",result).then(result => {
    agent.add(result);
  });
}).catch( error => {
  agent.add(`Whoops - ${error}`);
});
```

### Smart Outlet

Check status and switch on/off:

```
smartthing.outlet("status").then(result => {
  agent.add(result);
});

smartthing.outlet("off").then(result => { // or on
  agent.add(result);
});
```

### Motion Sensor

Check if the motion sensor has been triggered:

```
smartthing.motion().then(result => {
  agent.add(result);
})
```

### Nest Thermostat

Check the current and target temperature, and set the target temperature:

```
nest.thermostat("status").then( result => {
  agent.add(result);
});

nest.thermostat("set",50).then( result => { // F or C
  agent.add(result);
});
```

### Nest Camera

Returns URL for most recent image:

```
agent.add(new Image(nest.camera()));
```
