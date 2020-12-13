const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const querystring = require('querystring');
const child_process = require('child_process');

// 1. 打开 https://github.com/login/oauth/authorize
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.7825dfc2930b7be0`)
// 3. 创建server，接收token，点击发布
http.createServer(function(request, response) {
    const query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    console.log(query);
    publish(query.token);
}).listen(8083);

function publish(token) {
    const serverPort = '118.190.156.209';
    const localPort = '127.0.0.1';
    const fileURL = './template.html'

    const request = http.request({
        hostname: process.env.NODE_ENV === 'PROD' ? serverPort : localPort,
        port: 8082,
        path: '/publish?token=' + token,
        headers: {
            'Content-type': 'application/octet-stream',
        }
    }, response => {
        console.log(response);
    });

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    archive.directory('./sample/', false);
    archive.finalize();
    archive.pipe(request);
}




