export function createElement(type, attributes, ...children) {
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

export class Component{
    constructor(content) {
        this.root = this.render(); 
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

class TextWrapper extends Component{
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}
class ElementWrapper extends Component{
    constructor(type) {
        this.root = document.createElement(type);
    }
}