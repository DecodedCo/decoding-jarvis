# Samsung Connected Devices

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

## Device Setup
1. Login to [SmartThings Groovy IDE](https://graph-na04-useast2.api.smartthings.com/)
2. Verify the location is **DecodedHQ** & that there is a SmartApp named **Jarvis Hub**
3. If this above is in place, the devices will be ready to be used with the API.

## Authentication/Authorization
[SmartApp Web Services Tutorial](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part1.html) is where it's at.

1. [Step One](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part1.html): Create **SmartApp** & define preferences in code (Completed, with no need to redo).
2. [Step Two](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/tutorial-part2.html): Using the Sinatra/Ruby template, walk the the steps of creating an app to spin up the authentication process to receive the url & endpoints (token lasts 24 hours).

## Application Build
The Authentication steps above only got me so far. When we build out the fullstack app, we will have have to use the resources below to get us set up for success.
[The SmartApp Auth Process](http://docs.smartthings.com/en/latest/smartapp-web-services-developers-guide/smartapp.html)

## Mark Notes
- The motion sensor has an internal battery, and it just stays on.
- The outlet pairs when you press the button on the side.
