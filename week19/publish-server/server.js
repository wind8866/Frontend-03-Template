const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    // console.log(request.headers);
    const outfile = fs.createWriteStream('../server/public/index.html')
    request.pipe(outfile);
}).listen(8082);