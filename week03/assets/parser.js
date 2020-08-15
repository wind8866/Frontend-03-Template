const { error } = require("console");

class Parser {
    constructor() {
        this.current = this.data;
        this.currentTag = {};
        this.attrKey = '';
        this.attrValue = '';
        this.EOF = Symbol('EOF');
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
            return this.tagOpen;
        } else if (char === this.EOF) {
            console.log('结束');
            token(null);
            return false;
        }
        token({
            type: 'text',
            content: char,
        });
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
                type: 'startTag',
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
                type: 'endTag',
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
const stack = [
    {
        type: 'document',
        children: [],
    }
];
let currentTextNode = null;
function token(node) {
    let top = stack[stack.length - 1];
    if (node === null) {
        console.log(stack);
        return;
    } else if (node.type === 'startTag' || node.type === 'selfCloseTag') {
        const element = {
            type: 'element',
            children: [],
            attributes: node.attr,
            tagName: node.tagName,
        };
        top.children.push(element);
        element.parent = top;

        if (node.type === 'startTag') {
            stack.push(element);
        }
    } else if (node.type === 'endTag') {
        if (node.tagName === top.tagName) {
            stack.pop();
        } else {
            throw new Error('标签不匹配');
        }

    } else if (node.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            };
            top.children.push(currentTextNode);
        }
        currentTextNode.content += node.content;
    }
    if (node.type !== 'text') {
        currentTextNode = null;
    }
    console.log(node, stack);
}
module.exports = Parser;