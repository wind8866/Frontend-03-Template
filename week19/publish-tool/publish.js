const http = require('http');
const fs = require('fs');

const request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: "POST",
    headers: {
        'Content-type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const file = fs.createReadStream('./package.json');
file.on('data', chunk => {
    // console.log(chunk.toString());
    request.write(chunk);
});
file.on('end', chunk => {
    // console.log('read finished');
    request.end(chunk);
});