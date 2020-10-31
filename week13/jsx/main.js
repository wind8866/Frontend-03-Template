import { createElement, Component } from './framework.js';
class Carousel extends Component {
    constructor() {
        super();
    }
    render() {
        return document.createElement('div');
    }
}

let a = <Carousel/>
const d = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];
// 这里 组件的a.root才是dom元素，document.body.append(a.root)才可以
// 但是又不能在DiV内设置this，所以使用另一种办法a.montTo
a.montTo(document.body);