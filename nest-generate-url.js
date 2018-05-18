'use strict';

// Camera
const nestcam = require('node-nest-cams');

let nestCamConfig = {
    productId: '',
    productSecret: ''
}

nestcam.setConfig(nestCamConfig);

nestcam.listCameras((cameras) => {

  if (cameras[0]) {
    console.log(cameras[0].snapshot_url,cameras[0].web_url);
  } // end if cameras

}); // end listcameras
