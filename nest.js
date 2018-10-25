"use strict";

// Camera
// Manually generate this url by following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md

exports.camera = label => {
  return process.env[`nest_${label}_uri`]; // end return
}; // end camera
