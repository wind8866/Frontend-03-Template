const http = require('http');
const fs = require('fs');

console.log()

const serverPort = '118.190.156.209';
const localPort = '127.0.0.1';

const request = http.request({
    hostname: process.env.NODE_ENV === 'PROD' ? serverPort : localPort,
    port: 8082,
    method: "POST",
    headers: {
        'Content-type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const file = fs.createReadStream('./template.html');
file.pipe(request);