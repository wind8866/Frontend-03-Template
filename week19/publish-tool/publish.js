const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

const serverPort = '118.190.156.209';
const localPort = '127.0.0.1';
const fileURL = './template.html'

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

const archive = archiver('zip', {
    zlib: { level: 9 }
});
archive.directory('./sample/', false);
archive.finalize();
archive.pipe(request);



