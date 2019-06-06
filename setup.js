"use strict";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var Client = require('ssh2').Client;
var conn = new Client();

var config = JSON.parse(require('fs').readFileSync('config.json'));
var setupInstructions = [
  'curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -',
  'sudo yum install --y nodejs',
  'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash',
  'export NVM_DIR="$HOME/.nvm"',
  '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"',
  'nvm install 8.16.0',
  'nvm use 8.16.0',
  'npm install'
]

function setupNode(){
  conn.on('ready', function() {
    for (var i = 0; i < setupInstructions.length; i++){
      conn.exec(setupInstructions[i], function(err, stream){
        if (err) throw err;
        stream.on('close', function(code, signal) {
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
    }
  }).connect({
    host: config['ec2instance'],
    port: 22,
    username: config['ec2user'],
    privateKey: require('fs').readFileSync(config['ec2keyfile'])
  });
}

async function rsync() {
  const { stdout, stderr } = await exec('rsync -av -e "ssh -i ' + config['ec2keyfile'] + '" package.json ' + config['ec2user'] + '@' + config['ec2instance'] + ':~/');
  if (stderr !== ''){
    console.log('Error:', stderr);
  } else {
    console.log('Successfully connected to ' + config['ec2instance'] + '\nNow setting up the instance...');
    setupNode();
  }
}
rsync();