function createElement(type, attributes, ...children) {
    let element = null;
    // 鸭子类型：无论element是鸭子（dom）还是狗子（组件），都调用相关方法
    if (typeof type === 'string') {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    // children会自动编译为 createElement(child)
    for (const child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child);
        }
        element.append(child);
    }
    return element;
}
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    append(child) {
        child.montTo(this.root);
    }
    montTo(parent) {
        parent.append(this.root);
    }
}
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    append(child) {
        child.montTo(this.root);
    }
    montTo(parent) {
        parent.append(this.root);
    }
}

class Div {
    constructor() {
        this.root = document.createElement('div');
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    append(child) {
        child.montTo(this.root);
    }
    montTo(parent) {
        parent.append(this.root);
    }
}

let a = <Div id="a">
    <span>d</span>
    <span>c</span>
</Div>
// 这里 组件的a.root才是dom元素，document.body.append(a.root)才可以
// 但是又不能在DiV内设置this，所以使用另一种办法a.montTo
a.montTo(document.body);