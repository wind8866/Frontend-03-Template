const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    console.log(request.headers);

    const outfile = fs.createWriteStream('../server/public/index.html')

    request.on('data', chunk => {
        console.log(chunk.toString());
        outfile.write(chunk);
    });
    request.on('end', chunk => {
        outfile.end();
        response.end('Success');
    });
}).listen(8082);