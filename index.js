// ************************ INSTANTIATE EXPRESS ************************
const express = require('express');
const app = express();

// ***************** ACCESS TO HTML, CSS, JS & IMAGES *******************
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


// ************************ ROUTES **********************

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// ************************ STARTS SERVER ************************
const server = app.listen(3000);
