# Jarvis Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

## Supported Devices

1. Nest Camera
2. Nest Thermostat
3. Samsung Smarthings Hub
4. Samsung Smarthings Power Outlet
5. Silvania Smart Bulb (through Samsung Smarthings)
7. Sonos (through Samsung Smarthings and Spotify)
8. Yale Lock (through Samsung Smarthings)

## Prerequisites

1. You have completed https://dialogflow.com/docs/getting-started/building-your-first-agent
2. You have created a new agent and are ready to deploy a new fulfillment webhook

## Setup

Begin by creating a `.env` file with contents shared by the team (privately). 

Import the Postman collection to manually explore the Smartthings API.

If you need to update your `.env` file:

### Smartthings

1. Update `.env` with your Personal Access Token (`smartthingsToken`) from https://account.smartthings.com/tokens.
2. Update `smartthings.js` with the Device Ids (`devices`) from https://api.smartthings.com/v1/devices (called with header `Authorization: Bearer: smartthingsToken`)
2. Update `colors.js` with your desired color map if you are using the lightbulb

### Nest Camera

5. Follow the [instructions](https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md) to generate a camera URL and update `nestcamUri` in your `.env` file.

### Nest Thermostat

6. Update `.env` with the `username` and `password` of your Nest account for the thermostat

### Spotify

1. Update `.env` with your `spotifyId` and `spotifySecret` from https://beta.developer.spotify.com/dashboard/applications

### Sonos

1. Update `spotify.js` with the `sid` and `sn` intercepted by querying the Sonos device through the Smartthings API as it is playing a track from the app.

## Deploy

This library provides a `jarvis` function to act as the fulfillment webhook. Deploy the webhook as per the tutorial above.

## Routing

`index.js` receives all intents from Dialogflow. You will need to build up the `switch` statement to process your intents as required.

For some examples, see `example.js`.

## Rich Messages

To return a rich message containing a picture (and optionally text):

1. Make sure you have imported the utilities first:

`const utils = require('./utils.js');`

2. Add the following code for your final response, updating `IMAGEURL` with your image url:

```
res.json(utils.imageResponse(IMAGEURL));
```

or 

```
res.json(utils.imageResponse(IMAGEURL,"Your text description"));
```

## Defeating third party API caches

Some services (Microsoft) cache URLs for their services - they only check the URL once, rather than checking to see if the contents have changed.

To overcome this limitation, you can generate unique URLs that do not affect the underlying request, but do "trick" the API into reloading the contents.

1. Make sure you have imported the utilities first:

`const utils = require('./utils.js');`

2. Use the following code for your final response, updating `IMAGEURL` with your image url:

`utils.uniqueUrl(IMAGEURL)`

e.g.

`requestAPI(utils.uniqueUrl(process.env.nestcamProxyUri))`

## Functionality

### Light Bulb

#### Switch

Get status and switch on or off:

```
smartthing.light("switch","status").then(result => {
	res.json(result);
});

smartthing.light("switch","off").then(result => { // or on
	res.json(result);
});
```

#### Brightness

Get current brightness and set the brightness (0-100):

```
smartthing.light("switchLevel","status").then(result => { // 0-100
  res.json(result);
});

smartthing.light("switchLevel",100).then(result => { // 0-100
  res.json(result);
});
```

#### Color

Get current hue and saturation, and set the color based on the mapping in `colors.js`:

```
smartthing.light("colorControl","status").then(result => {
	res.json(result);
});

smartthing.light("colorControl","red").then(result => { // defined in colors.js
	res.json(result);
});

```

### Lock

Check the lock status and lock/unlock:

```
smartthing.lock("status").then(result => {
	res.json(result);
});

smartthing.lock("lock").then(result => { // or unlock
	res.json(result);
});
```

### Sonos

Check what's currently playing:

```
smartthing.outlet("status").then(result => {
	res.json(result);
});
```

#### Play/pause

Play/pause the current track:

```
smartthing.sonos("pause").then(result => { // or play
	res.json(result);
});
```

#### Volume

Set the volume (0-100):

```
smartthing.sonos("setLevel",60).then(result => { // 0-100
	res.json(result);
});
```

#### Play Music (from Spotify)

You can search for a track, artist or album, and pass the result onto Sonos:

```
spotify.searchv2("The Beatles").then(result => {
  smartthing.sonos("playTrack",result).then(result => {
	  res.json(result);
  });
}).catch( error => {
	res.json({'fulfillmentText':`Whoops - ${error}`});
});
```

### Smart Outlet

Check status and switch on/off:

```
smartthing.outlet("status").then(result => {
	res.json(result);
});

smartthing.outlet("off").then(result => { // or on
	res.json(result);
});
```

### Nest Thermostat

Check the current and target temperature, and set the target temperature:

```
nest.thermostat("status").then( result => {
	res.json(result);
});

nest.thermostat("set",50).then( result => { // F or C
	res.json(result);
});
```

### Nest Camera

Returns URL for most recent image:

```
res.json(nest.camera());
```

## APIs

### Microsoft Emotion

Load the library:

```
const microsoft = require('./microsoft.js');
```

Send the library an image URL, and it will return the raw data which you need to process:

```
microsoft.emotion(process.env.nestcamUri).then( result => {
  console.log(result);
  // Now, process the data as needed...
  res.json({'fulfillmentText':'Your response message'});
}).catch( error => {
  res.json({'fulfillmentText': error});
})
```

## Testing

Open `test.js` and add any of your code you want to test.

Then, run `node test.js` to test it.
