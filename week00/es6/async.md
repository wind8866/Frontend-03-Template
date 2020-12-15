问题
- [ ] 事件监听是订阅发布模式，还是观察者模式


## 异步操作的模式
### 回调函数
```javascript
function fun1(callback) {
    setTimeout(callback, 1000)
}
function fun2() {

}
fun1(fun2);
```
**优点：**
简单、容易理解和实现
**缺点：**
不利于代码的阅读和维护
各个部分之间高度耦合（coupling）
每个任务只能指定一个回调函数
### 事件监听
```javascript
document.body.addEventListener('click', function() {
    console.log('点击了body')
});
```
**优点：**
比较容易理解
可以绑定多个事件
每个事件可以指定多个回调函数
可以“去耦合”（decoupling），有利于实现模块化
**缺点：**
整个程序都要变成事件驱动型，运行流程会变得很不清晰
阅读代码的时候，很难看出主流程
### 发布/订阅
```javascript
class Event {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(fun => {
                fun(data);
            })
        } else {
            console.error('没有绑定事件')
        }
    }
}
const button = new Event();
button.on('click', function(data) {
    console.log(data);
});
button.emit('click', { type: 'submit' });
```

因为可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。
### 异步执行的流程控制
1、准备食材2、做饭、3、吃饭4、洗碗

```javascript
function setout() {
    console.log('准备食材✅');
}
function cook() {
    console.log('做饭✅');
}
function eat() {
    console.log('吃饭✅');   
}
function wash() {
    console.log('洗碗✅')
}
function async(callback) {
    setTimeout(callback, 1000);
}
async(() => {
    setout();
    async(() => {
        cook();
        async(() => {
            eat();
            async(() => {
                wash();
            });
        });
    });
});
```
### 串行执行

