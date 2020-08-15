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
        response.end(`<html lang="en">
<head>
    <style>
        div {
            color: #ffa;
        }
    </style>
</head>
<body>
    <div>
        <img src="pic.png" alt="pic"/>
        <p>文本文本段落段落</p>
    </div>
</body>
</html>`);
    });
}).listen(8088);
console.log("server started: http://localhost:8088");

