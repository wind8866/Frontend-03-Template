import { createElement, Component } from './framework.js';
class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        console.log(this.attributes)
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for(const src of this.attributes.src) {
            const div = document.createElement('div');
            div.style.backgroundImage = `url(${src})`;
            this.root.append(div);
        }

        let position = 0;
        this.root.addEventListener('mousedown', event => {
            console.log('down', event)
            const startX = event.clientX;
            /**
             * event对象
             * clientX: 返回鼠标位置相对于浏览器窗口左上角的水平坐标
             * layerX: 可能是chrome浏览器的私有属性
             * movementX: 返回当前位置与上一个mousemove事件之间的水平距离
             * offsetX: 返回鼠标位置与目标节点左侧的padding边缘的水平距离
             * pageX: 返回鼠标位置与文档左侧边缘的距离
             * screenX: 返回鼠标位置相对于屏幕左上角的水平坐标
             * x
             */
            const move = event => {
                // console.log(event.clientX - startX);
                const moveOffsetX = event.clientX - startX;
                for(const child of this.root.children) {
                    child.style.transition = 'none';
                    child.style.transform = `translateX(${-position * 500 +  moveOffsetX}px)`;
                }
            };
            const up = event => {
                console.log('up')
                const moveOffsetX = event.clientX - startX;
                position = position - Math.round(moveOffsetX / 500);
                for(const child of this.root.children) {
                    child.style.transition = '';
                    child.style.transform = `translateX(${-position * 500}px)`;
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };

            document.addEventListener('mouseup', up);
            document.addEventListener('mousemove', move);
        })

        /*let currentIndex = 0;
        setInterval(() => {
            const children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            const current = children[currentIndex];
            const next = children[nextIndex];

            next.style.transition = 'none';
            // 归位状态
            // 将第n个元素挪到所见位置（消除本身位置影响）：-nextIndex * 100
            // 再向后挪一个，即下一个位置
            next.style.transform = `translateX(${-nextIndex * 100 + 100}%)`;
            // 这里设置timeout的意思防止后面的值把前面的值覆盖后，只执行一次render
            setTimeout(() => {
                // 目标状态
                next.style.transition = '';
                current.style.transform = `translateX(${-currentIndex * 100 - 100}%)`;
                next.style.transform = `translateX(${-nextIndex * 100}%)`;

                currentIndex = nextIndex;
            }, 16)
        }, 3000)*/
        return this.root;
    }
    montTo(parent) {
        parent.appendChild(this.render());
    }
}
const d = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];
const a = <Carousel src={d}/>

// 这里 组件的a.root才是dom元素，document.body.append(a.root)才可以
// 但是又不能在DiV内设置this，所以使用另一种办法a.montTo
a.montTo(document.body);