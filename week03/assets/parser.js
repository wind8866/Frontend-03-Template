const { error } = require("console");
const nodeList = [];

class Parser {
    constructor() {
        this.current = this.data;
        this.currentTag = {};
        this.attrKey = '';
        this.attrValue = '';
        this.EOF = Symbol('EOF');
        this.text = {
            type: 'text',
            value: '',
        };
    }
    parserHTML(html) {
        console.log(html);
        for (const char of html) {
            this.current = this.current(char);
        }
        this.current(this.EOF);
    }
    data(char) {
        if (char === '<') {
            token(this.text);
            this.text.value = '';
            return this.tagOpen;
        } else if (char === this.EOF) {
            console.log('结束');
            console.log(nodeList);
            return false;
        } 
        this.text.value += char;
        return this.data;
    }
    tagOpen(char) {
        if (char === '/') {
            // 这里如果</那么tagName为空，如果是自封闭标签，tagName有值
            if (this.currentTag.tagName === undefined) {
                return this.tagClose;
            } else {
                return this.selfCloseTag;
            }
        } else if (/^[a-zA-Z]$/.test(char)) {
            this.currentTag = {
                type: 'tagStart',
                tagName: '',
                attr: {}
            }
            return this.tagName(char);
        } else if (/^[\t\n\f ]$/.test(char)) {
            return this.attrOpen;
        } else if (char === '>') {
            token(this.currentTag);
            this.currentTag = {};
            return this.data;
        }
    }
    selfCloseTag(char) {
        this.currentTag.type = 'selfCloseTag';
        return this.tagOpen(char);
    }
    tagClose(char) {
        if (/^[a-zA-Z]$/.test(char)) {
            this.currentTag = {
                type: 'tagEnd',
                tagName: '',
            }
            return this.tagName(char);
        }
        return this.tagClose;
    }
    tagName(char) {
        if (/^[a-zA-Z]$/.test(char)) {
            this.currentTag.tagName += char;
            return this.tagName;
        } else if (/^[\t\n\f ]$/.test(char)) {
            return this.attrOpen;
        } else if (char === '>') {
            return this.tagOpen(char);
        }
    }
    attrOpen(char) {
        if (/^[a-zA-Z]$/.test(char)) {
            this.attrKey += char;
            return this.attrOpen;
        } else if (char === '=') {
            return this.attrKeyClose;
        }
        return this.attrOpen;
    }
    attrKeyClose(char) {
        if (char === '"') {
            return this.attrValueOpen;
        } else {
            return new error('无属性值');
        }
    }
    attrValueOpen(char) {
        if (char === '"') {
            this.currentTag.attr[this.attrKey] = this.attrValue;
            this.attrKey = '';
            this.attrValue = '';
            return this.tagOpen;
        } else {
            this.attrValue += char;
            return this.attrValueOpen;
        }
    }
}
function token(node) {
    nodeList.push(node);
    console.log(node);
}
module.exports = Parser;