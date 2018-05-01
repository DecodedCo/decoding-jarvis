# Decoding Javis

This repo is the hub for creating a client build based on [this proposal](https://docs.google.com/presentation/d/1i-W7ku5x-y3Ck8yJlZdvMJUU96WQ34Bt40LDqQVRf5Y/edit#slide=id.g24f9bda3d1_0_91) for Itaú where they will

**The Mission**  
"By the end of this session, participants will leave with a powerful, elevated understanding of disruptive tech, an AI project they have built themselves, and the ability to approach strategy at Itaú more effectively.""

## Attendee Downloads
- [Chrome](https://www.google.com/chrome/)  
- [Postman](https://www.getpostman.com/apps)

## Table of Contents by Device
[Nest Camera](#nest-camera)  
[Nest Thermostat]()  
[Sonos Speaker](#sonos-speaker)  
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

## Nest Camera
**Device:** [Nest Camera](https://www.amazon.com/Nest-Security-Camera-Matters-Anywhere/dp/B00WBJGUA2/ref=sr_1_1?s=grocery&ie=UTF8&qid=1523896108&sr=8-1&keywords=nest+cam)  
**Dev Documentation:** [Nest Developers](https://developers.nest.com/)
**API Documentation:** [Nest Camera Official API](https://developers.nest.com/documentation/cloud/api-camera)  
**Attendee Guide:** [Nest API Quick Start Guide](https://codelabs.developers.google.com/codelabs/wwn-api-quickstart/#0)    

**Account:** jarvis@decoded.com  
**Live Stream:** [Our camera url](https://home.nest.com/camera/4fe5618ba62f413dbd943fc47b2f34e1)  
**Current Permissions:** Camera & Images Read  

**Mobile App:** Nest  
**Works with IFTTT?**: yes (“If motion detected, turn on Hue Lights”)  
**Works with Google Home?**: yes, but voice commands don't seem to work (can use Chromecast).  

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
