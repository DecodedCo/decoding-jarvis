// Speech Recognition code
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

const socket = io();

document.querySelector('#voice').addEventListener('click', () => {
  recognition.start();
});

// recognized when speech is
recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log(text);
  console.log('Confidence:' + e.results[0][0].confidence)
  // socket.emit('chat message: ', text);

  // chat message documentation. Need to refactor.
  updated_message = document.createElement("p");
  updated_message.setAttribute("class", "chat_message");
  updated_message.innerHTML += "ariana: " + text + "";

  chatroom.appendChild(updated_message);
  setTimeout(function() {
    jarvisResponse(text);
  }, 1000 );

});

// REFACTOR!
// function jarvisResponse(data){
//   jarvis_response = document.createElement("p")
//   jarvis_response.setAttribute("class", "jarvis_message");
//
//   if(data === 'light on') {
//     jarvis_response.innerHTML += "jarvis: " + "Turning on light";
//   } else {
//     jarvis_response.innerHTML += "jarvis: " + "Sorry, I don't understand";
//   }
//   chatroom.appendChild(jarvis_response);
// }
