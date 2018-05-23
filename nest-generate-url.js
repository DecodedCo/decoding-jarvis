'use strict';

// Camera
const nestcam = require('node-nest-cams');

let nestCamConfig = {
    productId: process.env.nestCamProductId,
    productSecret: process.env.nestCamProductSecret
}

nestcam.setConfig(nestCamConfig);

nestcam.listCameras((cameras) => {

  if (cameras[0]) {
    console.log(cameras[0].snapshot_url,cameras[0].web_url);
  } // end if cameras

}); // end listcameras
