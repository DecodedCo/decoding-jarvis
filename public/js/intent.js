// These are the top 12 intents for the following devices
// fitbit tracker, nest camera, nest thermostat, motion sensor,
// outlet, lightbulb, lock, sonos speaker

// Future items to intergrate:
// Chromecast, LittleBits, Spotify API

function jarvisResponse(data){
  jarvis_response = document.createElement("p")
  jarvis_response.setAttribute("class", "jarvis_message");

  let intent = parseIntent(data);
  const jarvis = "jarvis: ";
  let answer = "";

  switch(intent) {
    // Fitbit activity tracker
    // To do: add variables for steps, sleep & heartrate
    case "daily stats":
      answer = "Here are your daily stats...";
      //API CALL HERE
      break;
    // Nest Camera
    case "show camera":
      answer = "Showing view of office camera";
      // API CALL HERE
      break;
    // Nest Thermostat
    // To do: add temperature variable
    case "temperature":
      answer = "The temperature today is [variable]";
      break;
    case "change temperature to [variable]":
      answer = "Changing the temperature to [variable]";
      break;
    // Motion Sensor
    case "motion":
      answer = "Yes, someone is there.";
      break;
    // Outlet
    case "outlet on":
      answer = "Turning outlet on.";
      break;
    case "outlet off":
      answer = "Turning outlet off.";
      break;
    // Lightbulb
    case "light on":
      answer = "Turning light on.";
      break;
    case "light off":
      answer = "Turning light off.";
      break;
    // Lock
    case "lock door":
      answer = "Locking door.";
      break;
    case "unlock door":
      answer = "Unlocking door.";
      break;
    // Sonos Speaker
    // To Do: Integrate the Spotify API to request specific songs
    case "play song":
      answer = "Playing your favorite mix.";
      break;
    case "pause song":
      answer = "Pausing song.";
      break;
    default:
      answer = "Sorry, I don't understand";
  }

  jarvis_response.innerHTML +=  jarvis + answer;

  chatroom.appendChild(jarvis_response);
}

// Where magical api.ai stuff with happen
function parseIntent(data) {
  return data;
}
