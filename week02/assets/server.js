const http = require('http');
http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        console.log(chunk);
        body.push(Buffer.from(chunk));
        // body.push(chunk.toString());
    }).on('end', () => {
        console.log('end');
        body = Buffer.concat(body).toString();
        console.log('body:', body);

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end('Hello World\n');
    });
}).listen(8088);
console.log("server started: http://localhost:8088");

