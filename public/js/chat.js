(function () {

  // makes connection to server socket
  var socket = io.connect('http://localhost:3000');

  // connects the html value of buttons & inputs
  var message = document.getElementById("message");
  var send_message = document.getElementById("send_message");
  var chatroom = document.getElementById('chatroom');

  // Emit message
  send_message.onclick = function() {
    socket.emit('new_message', {
      message: message.value
    });
    // clears message input after intent is submitted
    message.value = '';
  }

  //submit message on enter key press as well
  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      socket.emit('new_message', {
        message: message.value
      });
      // clears message input after intent is submitted
      message.value = '';
    }
  })

  // Listen to new message & renders new intent as a paragrap
  socket.on("new_message", (data) => {
    // when there's a new message, create new paragraph & post it
    updated_message = document.createElement("p");
    updated_message.setAttribute("class", "chat_message");
    updated_message.innerHTML += "ariana: " + data.message + "";
    chatroom.appendChild(updated_message);

    setTimeout(function() {
      jarvisResponse(data.message);
    }, 1000 );
  })

  function jarvisResponse(data){
    jarvis_response = document.createElement("p")
    jarvis_response.setAttribute("class", "jarvis_message");

    if(data === 'light on') {
      jarvis_response.innerHTML += "jarvis: " + "Turning on light";
    } else {
      jarvis_response.innerHTML += "jarvis: " + "Sorry, I don't understand";
    }
    chatroom.appendChild(jarvis_response);
  }

})();
