const net = require('net');
const ResponseParser = require('./responseParser');
const Parser = require('./parser');
const { render } = require('./render');
const images = require('images');

class Request {
    constructor(args) {
        this.method = args.method || 'GET';
        this.host = args.host;
        this.port = args.port || 80;
        this.path = args.path || '/';
        this.headers = args.headers || {};
        this.body = args.body || {};

        // 必须要加Content-Type，否则服务端无法解析request body
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'applicattion/x-www-form-urlencoded';
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'applicattion/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => {
                return `${key}=${encodeURIComponent(this.body[key])}`
            }).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();

            // 这里能使用参数传过来的吗？调用send时没传任何值，connection是不是始终为undefined啊？
            if (connection) {
                connection.write(this.toString());
            } else {
                // net是什么？
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
                // console.log(data.toString());// 感觉这不用toString也行吧
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser);
                    connection.end();
                }
            });
            connection.on('error', (err) => {
                connection.end();
            })
        });
    }
    // GET / HTTP/1.1
    // Host: time.geekbang.org
    // 这里为什么是/r？不同系统的换行的符号是什么？
    toString() {
        // 视频中没加hosts，感觉这应该是必须的吧
        const headerText = Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')
        return `${this.method} ${this.path} HTTP/1.1\r
Host: ${this.host}\r
${headerText}\r
\r
${this.bodyText}`
    }
}


/**
 * 这里的void是调用后面的匿名函数
 * todo：看不懂async语法是什么意思
 */
void async function() {
    // 实例化接口请求对象
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            'X-Foo2': 'customed'
        },
        body: {
            name: 'wind'
        }
    });

    // 发送请求
    let response = await request.send();
    console.log(response);
    const parser = new Parser();

    let dom = parser.parseHTML(response.body);
    let viewport = images(800, 600);
    render(viewport, dom.children[0].children[3].children[1].children[3]);
    viewport.save('viewport.jpg');
}();