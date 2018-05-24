# Jarvis Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

## Supported Devices

1. Nest Camera
2. Nest Thermostat
3. Samsung Smarthings Hub
4. Samsung Smarthings Power Outlet
5. Samsung Smarthings Motion Sensor
6. Silvania Smart Bulb (through Samsung Smarthings)
7. Fitbit
8. Sonos (through Samsung Smarthings and Spotify)
9. Yale Lock (through Samsung Smarthings)
10. Chromecast (local network only) 

## Prerequisites

1. You have completed https://dialogflow.com/docs/getting-started/building-your-first-agent
2. You have created a new agent and are ready to deploy a new fulfillment webhook

## Setup

### Smartthings

1. Update `smartthings.js` with your Personal Access Token (`token`) from https://account.smartthings.com/tokens and Device Ids (`devices`) from https://api.smartthings.com/v1/devices (called with header `Authorization: Bearer: token`)  
2. Update `colors.js` with your desired color map if you are using the lightbulb

### Fitbit

3. Update `fitbit.js` with your `clientId` and `clientSecret` from https://dev.fitbit.com/apps and `accessToken` from https://dev.fitbit.com/apps/oauthinteractivetutorial

### Nest Camera

4. Update `nest-generate-url.js` with the `productId` and `productSecret` from https://console.developers.nest.com/products/a211585b-577a-48d1-993b-90c0d648411a (under Client ID and Client Secret)
5. Run `node nest-generate-url.js` and update `nest.js` with the `nestcamUri`

### Nest Thermostat

6. Update `nest.js` with the `username` and `password` of your Nest account for the thermostat

### Spotify

1. Update `spotify.js` with your `id` and `secret` from https://beta.developer.spotify.com/dashboard/applications

### Sonos

1. Update `spotify.js` with the `sid` and `sn` intercepted by querying the Sonos device through the Smartthings API as it is playing a track from the app.

### Chromecast

1. Run `npm install mdns castv2-client` to install dependencies

## Deploy

This library provides a `jarvis` function to act as the fulfillment webhook. Deploy the webhook as per the tutorial above.

## Routing

`index.js` receives all intents from Dialogflow. You will need to build up the `switch` statement to process your intents as required.

For some examples, see `example.js`.

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

### Motion Sensor

Check if the motion sensor has been triggered:

```
smartthing.motion().then(result => {
	res.json(result);
})
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

### Fitbit

Returns number of steps for a specific date, defaults to today if left blank:

```
fitbit.steps('2018-05-16').then( result => {
	res.json(result);
});

fitbit.steps().then( result => { // today
	res.json(result);
});

```

### Chromecast

From a local network (or bridge via VPN), you can play any media on a chromecast detected on the network.

Update `chromecast-local.js` with the `contentId` of your content.

Run using `node chromecast-local.js`.

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
