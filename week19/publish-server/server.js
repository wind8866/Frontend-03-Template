const http = require('http');
// import http from 'http';

http.createServer(function(request, response) {
    console.log(request.headers);
    request.on('data', chunk => {
        console.log(chunk.toString());
    });
    request.on('end', chunk => {
        response.end('Success');
    });
}).listen(8082);