"use strict";

const utils = require("./utils.js");

exports.camera = label => {
  // Manually generate this url by following https://github.com/DecodedCo/decoding-jarvis/blob/webapp/documentation/nest.md

  return utils.uniqueUrl(process.env[`nest_${label}_uri`]);
}; // end camera
