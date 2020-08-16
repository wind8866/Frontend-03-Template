const { error } = require("console");
const css = require('css');

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

        computeCSS(element);
        if (node.type === 'startTag') {
            stack.push(element);
        }
    } else if (node.type === 'endTag') {
        if (node.tagName === top.tagName) {
            if (node.tagName === 'style') {
                addCSSRules(top.children[0].content);
            }
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
    // console.log(node, stack);
}
const rules = [];
// 将CSS文本转化为对象
function addCSSRules(styleText) {
    console.log(styleText);
    const ast = css.parse(styleText);
    console.log(ast);
    rules.push(...ast.stylesheet.rules);
    console.log(rules)
}

function computeCSS(element){
    // todo: 这里html被处理时，rules还没建立，导致html dom无法添加上css树
    console.log(element, rules);
    // todo: 这一步的目的是使DOM树从子到父顺序
    const elements = stack.slice().reverse();
    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    /**
     * 遍历每条css规则
     *  1、CSS规则分成选择器，倒序selectorParts = ['div', 'body', 'html']
     *  2、如果当前element不与selectorParts[0]匹配，跳过本次循环
     *  3、遍历当前dom栈(可能并不全)，例如[p.startTag, div.startTag, body.startTag, html.startTag]
     *      如果selectorParts中的tag(body)被匹配到，匹配下一个
     *  4、判断一共匹配个数如果selectorParts的值都被匹配，标记为改tag被匹配
     *  5、将改style规则添加到改element上
     */
    for(let rule of rules) {
        const selectorParts = rule.selectors[0].split(" ").reverse();
        
        // 匹配当前元素
        if (!match(element, selectorParts[0])) {
            continue;
        }

        let matched = false;
        let j = 1;
        for(let i = 0;i < elements.length && j < selectorParts.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }

        if (j >= selectorParts.length) {
            matched = true;
        }
        if (matched) {
            const sp = specificity(rule.selectors[0]);
            console.log('Element', element, 'rule', rule);
            for (let declaration of rule.declarations) {
                if (!element.computedStyle[declaration.property]) {
                    element.computedStyle[declaration.property] = {};
                }
                const specificity = element.computedStyle[declaration.property].specificity;
                if (!specificity) {
                    element.computedStyle[declaration.property].value = declaration.value;
                    element.computedStyle[declaration.property].specificity = sp;   
                } else if(compare(sp, specificity) >= 0) {
                    element.computedStyle[declaration.property].value = declaration.value;
                    element.computedStyle[declaration.property].specificity = sp;  
                }
            }
            console.log(element.computedStyle);
        }
    }
}

function specificity(selector) {
    const p = [0, 0, 0, 0];
    const selectorParts = selector.split(' ');
    for (const part of selectorParts) {
        if(part[0] === '#') {
            p[1]++;
        } else if (part[0] === '.') {
            p[2]++;
        } else {
            p[3]++;
        }
    }
    return p;
}

function compare (p1, p2) {
    if (p1[0] !== p2[0]) {
        return p1[0] - p2[0];
    } else if (p1[1] !== p2[1]) {
        return p1[1] - p2[1];
    } else if (p1[2] !== p2[2]) {
        return p1[2] - p2[2];
    } else {
        return p1[3] - p2[3];
    }
}

function match(element, selector) {
    let checked = false;
    // #id .class tagname
    if (!selector || !element.attributes) {
        return false;
    }
    if (element.attributes.id) {
        const idList = element.attributes.id.split(' ');
        if (idList.some(id => `#{id}` === selector)) {
            checked = true;
        }
    }
    if (element.attributes.class) {
        const classList = element.attributes.class.split(' ');
        if (classList.some(id => `.{id}` === selector)) {
            checked = true;
        }
    }
    if (element.tagName === selector) {
        checked = true;
    }
    return checked;
}
 
module.exports = Parser;