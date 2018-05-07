# Decoding Javis
This repo is the hub for creating a client build based on [this proposal](https://docs.google.com/presentation/d/1i-W7ku5x-y3Ck8yJlZdvMJUU96WQ34Bt40LDqQVRf5Y/edit#slide=id.g24f9bda3d1_0_91) for Itaú.

**The Mission**  
"By the end of this session, participants will leave with a powerful, elevated understanding of disruptive tech, an AI project they have built themselves, and the ability to approach strategy at Itaú more effectively."

## Attendee Downloads
- [Chrome](https://www.google.com/chrome/)  
- [Postman](https://www.getpostman.com/apps)

## Table of Contents by Device
Chromecast  
Fitbit Band  
Fitbit Scale
[Little Bit Cloud](#little-bit-cloud)  
[Nest Camera](#nest-camera)  
[Nest Thermostat](#nest-thermostat)  
[Sonos Speaker](#sonos-speaker)  
[Samsung Connected Devices](#samsung-connected-devices) including:
- Samsung Motion Sensor
- Samsung Smart Outlet   
- Sylvania Smart Color Bulb  
- Yale Smart Lock  


<!-- ************************** LITTLE BITS ************************** -->
## LittleBits Cloud Starter Kit
**Device:** [LittleBits CloudBit Starter Kit](https://www.amazon.com/littleBits-Electronics-cloudBit-Starter-Kit/dp/B00L9WFI5A)  
**Dev Documentation:** [LittleBits Developers](http://control.littlebitscloud.cc/)  
**API Documentation:** [LittleBits API](http://developers.littlebitscloud.cc/)    
**Attendee Guide:** [LittleBits Cloud Guide](http://littlebits.com/cloudstart)    

**LittleBits Account:** jarvis@decoded.com  
**Current Permissions:** Read & Write

**Mobile App:** None
**Works with IFTTT?**: Yes. Works well.
**Works with Google Home?**: No

### Device Setup
1. Login into the [LittleBits Account](http://control.littlebitscloud.cc/) & click the **settings** icon on the bottom right corner.
2. Setup your circuit: p3 usb → input module → cloudBit
3. Plug the p3 usb cable into wall & wait for the status light to start blinking (want green or yellow light), then click the **next** button.
4. Then hold the setup, button until it blinks blue, then once it's steady blue click the **next** button.
5. Choose the LittleBits cloud wifi from wifi list & pair it with the wifi you want it to use.
6. Finally test out to device using the LED Bit to make sure it's ready to use & you are good!

### Nest Authentication/Authorization
[LittleBits Authentication Walk Through](http://developers.littlebitscloud.cc/#authentication)  
1. Grab API key from the **settings** tab in [cloud control](http://control.littlebitscloud.cc/).
2. Run the following command in the terminal to authentication, replacing `meowmeowmeow` with your API key.
`curl "https://api-http.littlebitscloud.cc" \ -H "Authorization: Bearer meowmeowmeow"`
3. Test that you can get information for the device by running the following command, replacing `meowmeowmeow` with your API key:
`curl "https://api-http.littlebitscloud.cc/v2/devices" \ -H "Authorization: Bearer meowmeowmeow"`

### Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [LittleBits Javascript Documentation](http://developers.littlebitscloud.cc/#introduction)  

#### Mark Notes
- This is also one of the more reliable products. Sensing inputs and outputs pretty easily.
- For IFTTT “If motion on SmartThings motion sensor, turn on output” or “If new weight logged on scale turn on output”

<!-- ************************** NEST ************************** -->
## Nest Camera
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

<!-- ************************** NEST ************************** -->
## Nest Thermostat
**Device:** [Nest Thermostat](https://www.amazon.com/Nest-Thermostat-Temperature-Stainless-Generation/dp/B0131RG6VK/ref=sr_1_2?s=hi&ie=UTF8&qid=1523891400&sr=1-2&keywords=nest+thermostat)    
**Dev Documentation:** [Nest Developers](https://developers.nest.com/)  
**API Documentation:** [Nest Thermostat Official API](https://developers.nest.com/documentation/cloud/thermostat-guide)    
**Attendee Guide:** [Nest API Quick Start Guide](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#0)    

**NestAccount:** jarvis@decoded.com  
**Current Permissions:** Read & Write

**Mobile App:** Nest  
**Works with IFTTT?**: Yes  
**Works with Google Home?**: Yes, but voice commands don't seem to work (can use Chromecast).  

### Device Setup
1. Login into the [Nest Developer Account](https://console.developers.nest.com).
2. Click `Permissions` then `Thermostat` to approve the permissions.
3. Click `Save` & you are good to go.

### Nest Authentication/Authorization
[Nest Authentication/Authorization Walk Through](https://developers.nest.com/documentation/cloud/how-to-auth)  
1. Login as Jarvis with [Nest Developers](https://developers.nest.com/) to gain access to the client ID, client secret, & authorization url  
2. Get pin using the [authorization url](https://home.nest.com/login/oauth2?client_id=a211585b-577a-48d1-993b-90c0d648411a&state=STATE) in the browser  
3. [Set up Postman](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#4) per step 4 in the quick start instructions, including the pin from step 2.
4. Make `POST` request to obtain access token. Then open a new tab in Postman.
5. Make `GET` request to `https://developer-api.nest.com/devices/thermostats` following [step 6 on the quick start guide](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#5) to read from the API.

### Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [Authorization Sample Code](https://developers.nest.com/documentation/cloud/sample-code-auth)  
- [Node Nest Library](https://github.com/johnwyles/node-nest-api)  
- [Python Nest Library](https://github.com/nestlabs/nest-python)  


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

<!-- ************************** SAMSUNG MOTION SENSOR ************************** -->
## Samsung Connected Devices

**Devices:**
- [Samsung Motion Sensor](https://www.amazon.com/Samsung-SmartThings-F-IRM-US-2-Motion-Sensor/dp/B01IE35PCC/ref=sr_1_1?ie=UTF8&qid=1523904321&sr=8-1&keywords=smartthings+motion+sensors)
- [Samsung Smart Outlet](https://www.amazon.com/Samsung-F-OUT-US-2-SmartThings-Outlet-White/dp/B073GV2PQY/ref=sr_1_3?ie=UTF8&qid=1524587143&sr=8-3&keywords=smartthings+outlet)   
- [Sylvania Smart Color Bulb](https://shop.smartthings.com/products/osram-led-smart-bulb-rgbw)  
- [Yale Smart Lock](https://www.amazon.com/Yale-Assure-Touchscreen-YRD226ZW20BP-SmartThings/dp/B06VX45R2G/ref=sr_1_1_sspa?s=hi&ie=UTF8&qid=1524587500&sr=1-1-spons&keywords=yale+assure+lock+with+bluetooth+and+z-wave&psc=1)  


**Dev Documentation:** [SmartThings Dev Docs](http://docs.smartthings.com/en/latest/)  
**API Documentation:** [Web Services SmartApps](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/index.html)  

**Samsung SmartThings Account:** jarvis@decoded.com  
**Current Permissions:** TBD

**Mobile App:** SmartThings
**Works with IFTTT?**: Yes  
**Works with Google Home?**: No. Kept getting an HTTP 401 error on Oauth verification.

### Device Setup
1. Login to [SmartThings Groovy IDE](https://graph-na04-useast2.api.smartthings.com/)
2. Verify the location is **DecodedHQ** & that there is a SmartApp named **Jarvis Hub**
3. If this above is in place, the devices will be ready to be used with the API.

### Sonos Authentication/Authorization
[SmartApp Web Services Tutorial](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part1.html) is where it's at.

1. [Step One](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part1.html): Create **SmartApp** & define preferences in code (Completed, with no need to redo).
2. [Step Two](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part2.html): Using the Sinatra/Ruby template, walk the the steps of creating an app to spin up the authentication process to receive the url & endpoints.

### Application Build
The Authentication steps above only got me so far. When we build out the fullstack app, we will have have to use the resources below to get us set up for success.
[The SmartApp Auth Process](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/smartapp.html)

#### Mark Notes
- The motion sensor has an internal battery, and it just stays on.
- The outlet pairs when you press the button on the side.
- IFTTT Ex: “If motion detected on motion sensor, activate LittleBits CloudBit Ouput for 3 seconds”
