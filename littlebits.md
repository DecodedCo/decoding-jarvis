# LittleBits Cloud Starter Kit
**Device:** [LittleBits CloudBit Starter Kit](https://www.amazon.com/littleBits-Electronics-cloudBit-Starter-Kit/dp/B00L9WFI5A)  
**Dev Documentation:** [LittleBits Developers](http://control.littlebitscloud.cc/)  
**API Documentation:** [LittleBits API](http://developers.littlebitscloud.cc/)    
**Attendee Guide:** [LittleBits Cloud Guide](http://littlebits.com/cloudstart)    

**LittleBits Account:** jarvis@decoded.com  
**Current Permissions:** Read & Write

**Mobile App:** None
**Works with IFTTT?**: Yes. Works well.
**Works with Google Home?**: No

## Device Setup
1. Login into the [LittleBits Account](http://control.littlebitscloud.cc/) & click the **settings** icon on the bottom right corner.
2. Setup your circuit: p3 usb → input module → cloudBit
3. Plug the p3 usb cable into wall & wait for the status light to start blinking (want green or yellow light), then click the **next** button.
4. Then hold the setup, button until it blinks blue, then once it's steady blue click the **next** button.
5. Choose the LittleBits cloud wifi from wifi list & pair it with the wifi you want it to use.
6. Finally test out to device using the LED Bit to make sure it's ready to use & you are good!

## Authentication/Authorization
[LittleBits Authentication Walk Through](http://developers.littlebitscloud.cc/#authentication)  
1. Grab API key from the **settings** tab in [cloud control](http://control.littlebitscloud.cc/).
2. Run the following command in the terminal to authentication, replacing `meowmeowmeow` with your API key.
`curl "https://api-http.littlebitscloud.cc" \ -H "Authorization: Bearer meowmeowmeow"`
3. Test that you can get information for the device by running the following command, replacing `meowmeowmeow` with your API key:
`curl "https://api-http.littlebitscloud.cc/v2/devices" \ -H "Authorization: Bearer meowmeowmeow"`

## Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [LittleBits Javascript Documentation](http://developers.littlebitscloud.cc/#introduction)  

## Mark Notes
- This is also one of the more reliable products. Sensing inputs and outputs pretty easily.
- For IFTTT “If motion on SmartThings motion sensor, turn on output” or “If new weight logged on scale turn on output”
