
const https = require('https');

var payload = JSON.stringify({
    "list": [
      0,
      10,
      20,
      -30,
      40,
      50,
      -1,
    ]
  });

  var options = {
    host: '1lt4pqsfrf.execute-api.eu-central-1.amazonaws.com',
    port: '443',
    path: '/findBiggestPossibleSumDeploymentStage/findBiggestPossibleSum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log(chunk);
    });
  });
  
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  
  req.write(payload);
  req.end();


