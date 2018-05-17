'use strict';

// Camera
const nestcam = require('node-nest-cams');

let nestCamConfig = {
    productId: 'a211585b-577a-48d1-993b-90c0d648411a',
    productSecret: 'rGaCGsxz3iJhY8RJ4OeeqfuVa'
}

nestcam.setConfig(nestCamConfig);

nestcam.listCameras((cameras) => {

  if (cameras[0]) {
    console.log(cameras[0].snapshot_url);
  } // end if cameras

}); // end listcameras
