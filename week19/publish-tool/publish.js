const http = require('http');
const fs = require('fs');

const serverPort = '118.190.156.209';
const localPort = '127.0.0.1';

const request = http.request({
    hostname: serverPort,
    port: 8082,
    method: "POST",
    headers: {
        'Content-type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const file = fs.createReadStream('./template.html');
file.on('data', chunk => {
    // console.log(chunk.toString());
    request.write(chunk);
});
file.on('end', chunk => {
    // console.log('read finished');
    request.end(chunk);
});