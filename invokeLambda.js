
const https = require('https');

var payload = JSON.stringify({
    "list": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "pairs": [
      null,
      null,
      3,
      2,
      5,
      4
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


