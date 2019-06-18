# Jarvisv3 Dialogflow Webhook Library

This library provides fuctionality for integrating a variety of IoT devices with Dialogflow.

If you are participating in the live session, you will need to:
1. Clone this repo by running `$git clone https://github.com/DecodedCo/decoding-jarvis.git` in your Terminal, then change into the new directory by running `$cd decoding-jarvis`.
2. Create a new file called `.env` in your local directory containing environment variables such as API tokens. Please use the environment variables provided.
3. Update `smartthings.js` to include your device IDs.
4. Be sure to use `node version 8.16.0` by running `$nvm install 8.16.0` and `$nvm use 8.16.0` in the Terminal.
5. Install neccessary Node packages by running `$npm install` in the Terminal.
6. Create and set up an AWS EC2 instance (or use an existing one), then deploy (see "Deploying to AWS" below).
7. Enable webhook fulfillment for your [Dialogflow](http://dialogflow.com) agent and use the public IP address as your URL. Be sure to map your Dialogflow intents to functions in your server file.

## Supported Devices

1. Nest Camera
3. Samsung Smarthings Hub
4. Samsung Smarthings Power Outlet
6. Silvania Smart Bulb
8. Sonos (using Spotify)
9. Yale Lock

### SmartThings

If you are participating in a live session, skip ahead to step 3:

1. Obtain your Personal Access Token (`token`) from https://account.smartthings.com/tokens.
2. Set the environment variable in your `.env` file for your deployment: `smartthings_token="TOKEN"`
3. Collect the necessary Device Ids (`devices`) from https://api.smartthings.com/v1/devices (called with header `Authorization: Bearer: token`) and update `smartthings.js`
4. Update `colors.js` with your desired color map if you are using the lightbulb

### Nest Camera

1. Obtain the snapshot URL following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md
2. Set the environment variable in your `.env` file for e.g. camera A: `nest_a_uri=""`

### Spotify

1. Set the environment variables in your `.env` file: `spotify_id=""`

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

# Deploying to AWS

#### Setup EC2 Instance in AWS Console

1. Log into [AWS Management Console](https://console.aws.amazon.com)
2. Go to the EC2 Management console. Click Services, and choose EC2 under Compute
3. Launch a new instance by clicking the blue “Launch Instance” button
4. Select Amazon Linux 2 (likely defaults to first option)
5. Choose t2.micro type machine
6. Skip to **6. Configure Security Group** and create a security group that allows each of the following types of connections. These will allow us to connect to the instance directly from our own machines, and through a web browser or Dialogflow. See below for the specific settings:

![alt text](https://presley-assets.decoded.com/71271f08-4007-4d92-a14c-e308ba781246_awssetup.png "AWS Setup")

7. Click Review and Launch, then Launch. You’ll be prompted to add a key pair - name a new one and **be sure to download the file** (it will warn you if you don’t click download).

8. Launch the instance and edit the name to something memorable (double-click on the name field)

#### Setup EC2 Instance from Terminal

9. Move the .pem keyfile you downloaded to this project directory. In a Terminal, navigate to this directory (`$ cd decoding-jarvis`) and run `$ chmod 400 <filename>` to set appropriate file permissions.

10. Edit config.json to include the filename of the keyfile, the EC2 username (by default for the Amazon Linux option we picked, it’s ec2-user) and the public DNS of your instance from the EC2 console. Save the file.

11. In a Terminal, run `$ node setup` from the project directory to install node and download the necessary packages to run the webapp. It may prompt you to accept the ECDSA signature - simply type “yes” and rerun `$ node setup`.


#### Deploy App to Instance

Once you have completed all of the setup steps, you should be ready to deploy your app!

1. In a Terminal, run `$ node deploy` from the project directory.

2. Navigate to the IP address printed out, or get the public IP from the EC2 page on the AWS console

3. Visit public IP on port 5000 (example, 12.345.6.78:5000) in the browser and see your app!

# Outside APIs

If you want to integrate outside APIs into your Jarvis program, you can! In the live session we saw several machine learning APIs including the [Google Cloud Vision API](https://cloud.google.com/vision/) and [Microsoft Cognitive Service](azure.microsoft.com/en-us/services/cognitive-services). We also saw some API directories, including [toddmotto's Public APIs](https://github.com/public-apis/public-apis) and [Programmable Web](https://www.programmableweb.com/category/all/apis). 
