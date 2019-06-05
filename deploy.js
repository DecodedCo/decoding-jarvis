"use strict";
require("dotenv").config();

const util = require('util');
const exec = util.promisify(require('child_process').exec);

var Client = require('ssh2').Client;
var conn = new Client();

const args = process.argv.slice(2);
var serverFile = process.env.serverFile;
if (args.length == 1){
  serverFile = args[0];
  if (serverFile.substr(serverFile.length - 3) !== '.js'){
    serverFile = serverFile + '.js';
  }
}

function sshIn(){
  conn.on('ready', function() {
    console.log('Launching JARVIS using ' + serverFile);
    conn.exec('pkill -SIGINT -f "node .*.js" && node ' + serverFile, function(err, stream){
      if (err) throw err;
      stream.on('close', function(code, signal) {
        console.log('Connection closed');
        conn.end();
      }).on('data', function(data) {
        console.log(data.toString());
        conn.end();
      }).stderr.on('data', function(data) {
        if (data !== ''){
          console.log('ERROR: ' + data);
        }
      });
    });
  }).connect({
    host: process.env.ec2instance,
    port: 22,
    username: 'ec2-user',
    privateKey: require('fs').readFileSync(process.env.ec2keyfile)
  });
}

async function rsync() {
  const { stdout, stderr } = await exec('rsync -av -e "ssh -i ' + process.env.ec2keyfile + '" --exclude "node_modules/" . ec2-user@' + process.env.ec2instance + ':~/');
  if (stderr !== ''){
    console.log('Error:', stderr);
  } else {
    console.log('Successfully deployed to ' + process.env.ec2instance);
    sshIn();
  }
}
rsync();