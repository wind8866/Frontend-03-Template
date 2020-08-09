// 解析Trunked Body
class TrunkedBodyParser {
    constructor() {
        this.current = this.catchLength;
        this.length = 0;
        this.isFinished = false;
        this.bodyContent = ''
    }
    receive(string) {
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
        return this.bodyContent;
    }
    receiveChar(char) {
        this.current = this.current(char);
    }
    catchLength(char) {
        if (char === '\n') {
            if (this.length === 0) {
                this.isFinished = true;
            }
            return this.catchBodyContent;
        } else {
            // ?
            this.length *= 16;
            this.length += parseInt(char, 16);
            return this.catchLength;
        }
    }
    catchBodyContent(char) {
        this.bodyContent += char;// 数组？
        if(--this.length === 0) {
            return this.catchNewLine;
        }
        return this.catchBodyContent;
    }
    catchNewLine(char) {
        if (char === '\n') {
            return this.catchLength;
        }
    }
}

// 解析响应
class ResponseParser {
    constructor() {
        this.current = this.catchProtocol;
        this.protocol = '';
        this.status = '';
        this.statusContent = '';
        this.headers = {};
        this.body = '';
        this.bodyContent = '';

        this.headerKey = '';
        this.headerValue = '';

        this.bodyParser = null;
    }
    receive(string) {
        console.log('response body', string);
        // 感觉这里遇到三个或四个字节会出问题
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
        this.bodyContent = this.bodyParser.receive(this.body);
        console.log(this);
    }
    receiveChar(char) {
        this.current = this.current(char);
    }
    
    catchProtocol(char) {
        if (char !== ' ') {
            this.protocol += char;
            return this.catchProtocol;
        } else {
            return this.catchStatus;
        }
    }
    catchStatus(char) {
        if (char !== ' ') {
            this.status += char;
            return this.catchStatus;
        } else {
            return this.catchStatusContent;
        }
    }
    catchStatusContent(char) {
        if (char !== '\n') {
            this.statusContent += char;
            return this.catchStatusContent;
        } else {
            return this.catchHeaderKey;
        }
    }
    catchHeaderKey(char) {
        if (char !== ':') {
            this.headerKey += char;
            return this.catchHeaderKey;
        } else {
            return this.catchHeaderBlank;
        }
    }
    catchHeaderBlank(char) {
        if (char !== ' ') {
            return this.catchHeaderBlank;
        } else {
            return this.catchHeaderValue;
        }
    }
    catchHeaderValue(char) {
        if (char !== '\n') {
            this.headerValue += char;
            return this.catchHeaderValue;
        } else {
            this.headers[this.headerKey] = this.headerValue;
            this.headerKey = '';
            this.headerValue = '';
            return this.catchHeaderBodyLine;
        }
    }
    catchHeaderBodyLine(char) {
        if (char !== '\n') {
            // 一个换行
            return this.catchHeaderKey(char);
        } else {
            // 两个换行
            // 响应头结束后需要确定解析body的方式
            if (this.headers['Transfer-Encoding'] === 'chunked') {
                this.bodyParser = new TrunkedBodyParser();
            }
            return this.catchBody;
        }
    }
    catchBody(char) {
        // 剩下的字符都认为是body
        this.body += char;
        return this.catchBody;
    }
}

// const fakeResponse = `HTTP/1.1 200 OK
// Content-Type: text/html
// Date: Sat, 08 Aug 2020 07:46:16 GMT
// Connection: keep-alive
// Transfer-Encoding: chunked

// c
// Hello World

// 0
// `;
// const re = new ResponseParser();
// re.receive(fakeResponse);

module.exports = ResponseParser;

