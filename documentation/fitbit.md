# Fitbit Band/Scale
**Device:** [Fitbit](https://www.amazon.com/Fitbit-Alta-Black-Small-Version/dp/B06W58QKH6/ref=sr_1_4_a_it?ie=UTF8&qid=1523904573&sr=8-4&keywords=fitbit&th=)/[Fitbit Scale](https://www.amazon.com/Fitbit-Aria-Wi-Fi-Smart-Scale/dp/B0752M6T6K/ref=sr_1_11_s_it?s=hpc&ie=UTF8&qid=1523904718&sr=1-11&keywords=fitbit)  
**Dev Documentation:** [Fitbit Developers](https://dev.fitbit.com)  
**API Documentation:** [Fitbit Web API](https://dev.fitbit.com/build/reference/web-api/explore/)    

**Fitbit Account:** jarvis@decoded.com  
**Current Permissions:** Read

**Mobile App:** FitBit  
**Works with IFTTT?**: Both seem to be compatible with IFTTT but it takes a while for the applets to fire
**Works with Google Home?**: No

## Device Setup
1. [Register your app](https://dev.fitbit.com/apps)(Completed, don't need to do again).
2. Then proceed forward with the Authentication steps below.

## Authentication/Authorization
Thank gawd! Authentication made easy. Just follow the step by step [OAuth 2.0 tutorial page](https://dev.fitbit.com/apps/oauthinteractivetutorial?clientEncodedId=22CWY4&clientSecret=7f4f7ab89c15dac152dd5da0283e555c&redirectUri=http://decoded.com&applicationType=SERVER) and you are set to go! Below is an overview:

1. Click on **authorization URL** & cut the **authorization code** into editor.
2. Make the `curl` command and parse the response to get the access token & API endpoint URL.
3. Then use the **FitBit Web API** above to change the endpoint URL to get different information.

## Application Build
Below are materials for easy reference later when we are building out the full flow:  
- [Web API Reference](https://dev.fitbit.com/build/reference/web-api/)  

## Mark Notes
- For IFTTT “If a new weight is logged on scale, turn on CloudBit output for 10 seconds”
