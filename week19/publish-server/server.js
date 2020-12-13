const http = require('http');
const unzipper = require('unzipper');
const querystring = require('querystring');
const https = require('https');

// 2. auth路由下允许接收code，用code加client_id+clent-secret换token
function auth(request, response) {
    const query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query)
    getToken(query.code, function(info) {
        response.write(`<a href="http://127.0.0.1:8083/?token=${info.access_token}">publish</a>`);
        response.end();
    });
}
function getToken(code, callback) {
    const request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.7825dfc2930b7be0&client_secret=40c0499ce418bd9499a4fe1d234b89d47e9dbdfc`,
        port: 443,
        method: 'POST',
    }, function(response) {
        console.log(response);
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        });
        response.on('end', chunk => {
            console.log(body);
            callback(querystring.parse(body));
        })
    });
    request.end();
}
// 4. publish路由：用token获取用户信息，检查权限接收发布

function publish(request, response) {
    const query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    getUser(query.token, function(info) {
        if (info.login === 'wind8866') {
            console.log('success???');
            request.pipe(unzipper.Extract({ path: '../server/public' }));
            console.log('success!!!!');
            request.on('end', function() {
                response.end('success!');
            })
        }
    });
}
function getUser(token, callback) {
    const request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        headers: {
            Authorization: 'token ' +  token,
            'User-agent': 'toy-publist-wind',
        }
    }, function(response) {
        console.log(response);
        let body = '';
        response.on('data', chunk => {
            body += chunk.toString();
        });
        response.on('end', chunk => {
            callback(JSON.parse(body))
        })
    });
    request.end();
}

http.createServer(function(request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }
}).listen(8082);