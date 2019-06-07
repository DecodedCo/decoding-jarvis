"use strict";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var Client = require('ssh2').Client;
var conn = new Client();

var config = JSON.parse(require('fs').readFileSync('config.json'));

const args = process.argv.slice(2);
var serverFile = config['serverFile'];
if (args.length == 1){
  serverFile = args[0];
  if (serverFile.substr(serverFile.length - 3) !== '.js'){
    serverFile = serverFile + '.js';
  }
}

function sshIn(){
  conn.on('ready', function() {
    console.log('Launching JARVIS using ' + serverFile);
    conn.exec('pkill -SIGINT -f "node .*.js" && echo Public Address: http://$(curl http://checkip.amazonaws.com):5000 && node ' + serverFile, function(err, stream){
      if (err) throw err
      stream.on('close', function(code, signal) {
        console.log('Connection closed');
        conn.end();
      }).on('data', function(data) {
        console.log(data.toString());
        if(!data.toString().includes("Public Address:")){
          conn.end();
        }
      }).stderr.on('data', function(data) {
        if (data !== ''){
         //console.log('ERROR: ' + data);
        }
      });
    });
  }).connect({
    host: config['ec2instance'],
    port: 22,
    username: config['ec2user'],
    privateKey: require('fs').readFileSync(config['ec2keyfile'])
  });
}

async function rsync() {
  const { stdout, stderr } = await exec('rsync -av -e "ssh -i ' + config['ec2keyfile'] + '" --exclude "node_modules/" . ' + config['ec2user'] + '@' + config['ec2instance'] + ':~/');
  if (stderr !== ''){
    console.log('Error:', stderr);
  } else {
    console.log('Successfully deployed to ' + config['ec2instance']);
    sshIn();
  }
}
rsync();