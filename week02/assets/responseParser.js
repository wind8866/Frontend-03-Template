// 解析Trunked Body
class TrunkedBodyParser {
    constructor() {
        this.current = this.catchLength;
        this.length = 0;
        this.isFinished = false;
        this.body = '';
    }
    receive(string) {
        console.log('response Body', string);
        for(let i = 0; i < string.length; i++) {
            if (this.isFinished) {
                break;
            }
            this.receiveChar(string.charAt(i));
        }
        return this.body;
    }
    receiveChar(char) {
        this.current = this.current(char);
    }
    catchLength(char) {
        if (char === '\r') {
            if (this.length === 0) {
                this.isFinished = true;
            }
            return this.catchLengthEnd;
        } else {
            // ?
            this.length *= 16;
            this.length += parseInt(char, 16);
            return this.catchLength;
        }
    }
    catchLengthEnd(char) {
        if (char === '\n') {
            return this.catchBodyContent;
        }
        return this.catchLengthEnd;
    }
    catchBodyContent(char) {
        this.body += char;// 数组？
        if(--this.length === 0) {
            return this.catchChunkBodyEnd;
        }
        return this.catchBodyContent;
    }
    catchChunkBodyEnd(char) {
        if (char === '\n') {
            return this.catchLength;
        }
        return this.catchChunkBodyEnd;
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
        this.bodyAll = '';
        this.body = '';

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
        this.body = this.bodyParser.receive(this.bodyAll);
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
        if (char !== '\r') {
            this.statusContent += char;
            return this.catchStatusContent;
        } else {
            return this.catchLineEnd;
        }
    }
    catchLineEnd(char) {
        if (char === '\n') {
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
        if (char !== '\r') {
            this.headerValue += char;
            return this.catchHeaderValue;
        } else {
            this.headers[this.headerKey] = this.headerValue;
            this.headerKey = '';
            this.headerValue = '';
            return this.catchHeaderLineEnd;
        }
    }
    catchHeaderLineEnd(char) {
        // 如果是第二个\r说明请求头已经结束
        if (char === '\r') {
            return this.catchHeaderBodyLine;
        }
        // 即不是\r、\n，已经到了另一个新请求头
        if (char !== '\n') {
            return this.catchHeaderKey(char);
        }
        return this.catchHeaderLineEnd
    }
    catchHeaderBodyLine(char) {
        if (char === '\n') {
            // 请求头结束
            if (this.headers['Transfer-Encoding'] === 'chunked') {
                this.bodyParser = new TrunkedBodyParser();
            }
            return this.catchBody;
        }
        return this.catchHeaderBodyLine;
    }
    catchBody(char) {
        // 剩下的字符都认为是body
        this.bodyAll += char;
        return this.catchBody;
    }
}

module.exports = ResponseParser;

