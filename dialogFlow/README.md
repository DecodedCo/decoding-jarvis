## Setup

`gcloud init`

Choose the correct project.

Go into project settings (web) and find the bucket name for below

## Deploy

`gcloud beta functions deploy jarvis --stage-bucket staging.jarvis-ab47a.appspot.com --trigger-http`

## Logs

`gcloud beta functions logs read`
