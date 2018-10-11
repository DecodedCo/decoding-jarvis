# Dialogflow Fulfillment Webhook Library Jarvisv2

This webhook template sets up everything needed to deploy fulfillment for your Dialogflow Jarvis agent.

### Firebase CLI
1. Create [Dialogflow Agent](https://console.dialogflow.com/)
2. `git@github.com:DecodedCo/decoding-jarvis.git`
3. `cd` to the `functions` directory
4. `npm install`
5. Install the Firebase CLI by running `npm install -g firebase-tools`
6. Login with your Google account, `firebase login`
7. Add your project to the sample with $ `firebase use <project ID>`
  + In Dialogflow console under **Settings** ⚙ > **General** tab > copy **Project ID**.
8. Run `firebase deploy --only functions:dialogflowFirebaseFulfillment`
9. When successfully deployed, visit the **Project Console** link > **Functions** > **Dashboard**
  + Copy the link under the events column. For example: `https://us-central1-<PROJECTID>.cloudfunctions.net/<FUNCTIONNAME>`
10. Back in Dialogflow Console > **Fulfillment** > **Enable** Webhook.
11. Paste the URL from the Firebase Console’s events column into the **URL** field > **Save**.

## License
See [LICENSE](LICENSE).
