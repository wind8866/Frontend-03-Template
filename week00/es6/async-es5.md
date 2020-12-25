问题
- [ ] 事件监听是订阅发布模式，还是观察者模式
- [ ] 防抖、截流

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
function queue(callbackList) {
    const callback = callbackList.shift();
    if (callback) {
        setTimeout(function() {
            callback();
            queue(callbackList);
        }, 1000);
    }
}
queue([setout, cook, eat, wash]);
```

### 并行
```javascript
function work() {
    console.log('工作✅');
}
function drink() {
    console.log('喝水✅');
}
function catchFish() {
    console.log('摸鱼✅');   
}
function learn() {
    console.log('学习✅');
}
function eat() {
    console.log('吃饭✅');
}
function queue(callbackList, final) {
    let already = 0;
    callbackList.forEach(callback => {
        setTimeout(function() {
            callback();
            already++;
            if (already === callbackList.length) {
                final();
            }
        }, 5000);
    });
}
queue([work, drink, catchFish, learn], eat);
```

### 并行串行结合
```javascript
let running = 0;
const limit = 2;
function work() {
    console.log('工作✅');
}
function drink() {
    console.log('喝水✅');
}
function catchFish() {
    console.log('摸鱼✅');   
}
function learn() {
    console.log('学习✅');
}
function eat() {
    console.log('吃饭✅');
}
function queue(callbackList, final) {
    while (running < limit && callbackList.length > 0) {
        const callback = callbackList.shift();
        setTimeout(function() {
            callback();
            --running;
            if (callbackList.length > 0) {
                queue(callbackList, final)
            } else if (running === 0) {
                // 因为是异步的在第三个函数和第四个函数执行到这时，callbackList都没有值了
                // 想要在第四步时执行final，需要同时满足“没有需要添加的了”和“没有待执行的了”两个条件
                final();
            }
        }, 5000);
        ++running;
    }
}
queue([work, drink, catchFish, learn], eat);

let i = 0;
const timer = setInterval(function() {
    console.log(++i);
    if (i === 15) {
        clearInterval(timer);
    }
}, 1000)
```

## 定时器
- 从第三个参数开始，传入的参数都会传给回调函数
- 如果回调是对象的方法，方法内的this指向全局，建议bind绑定
- 每次调用setTimeout/setInterval返回一个递增的整数，可以使用clearTimeout/clearInterval循环关闭所有定时器。
- setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行
- 如果同步任务超过了setTimeout设定的时间，则要等到同步任务执行完成后再执行setTimeout的回调
- 如果同步任务超过了setInterval设定的时间，等同步任务执行完，已经超时的setInterval任务会被忽略执行。

#### setTimeout与setInterval的区别
setTimeout定义的时间是延时timer秒之后执行，setInterval定义的时间是两次开始执行的时间间隔，因为执行代码需要耗时一段时间，所以两次执行之间的间隔要小于timer。
**如果你想每间隔3小时喝一杯水，那么使用setTimeout。**
```javascript
// 3h
const timer = 1000 * 60 * 60 * 3;
function drink() {
    setTimeout(function() {
        console.log('开始喝水', (new Date()).toString())
        setTimeout(function() {
            // 喝水用时一分钟
            console.log('喝完水了', (new Date()).toString());
            drink();
        }, 1000 * 60)
    }, timer)
}
drink();
```
假如00:00开始执行，那么时间线是：
1. 3:00 开始喝水
2. 3:01 喝完水了
3. 6:01 开始喝水
4. 6:02 喝完水了
5. ...

**如果想每3小时喝一杯水，使用setInterval();**
```javascript
// 3h
const timer = 1000 * 60 * 60 * 3;
function drink() {
    setInterval(function() {
        console.log('开始喝水', (new Date()).toString())
        setTimeout(function() {
            // 喝水用时一分钟
            console.log('喝完水了', (new Date()).toString());
        }, 1000 * 60)
    }, timer)
}
drink();
```
假如00:00开始执行，那么时间线是：
1. 3:00 开始喝水
2. 3:01 喝完水了
3. 6:00 开始喝水
4. 6:01 喝完水了
5. ...

如果细心观察，iOS的闹钟是这么设计的。6:30闹钟开始响，响了1分钟，此时点稍后（10分钟）提醒，则是在6:40（9分钟后）再次提醒。

#### setTimeout(f, 0) 
setTimeout(f, 0)会在下一轮事件循环一开始就执行，这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。

应用场景
- 事件冒泡，使父元素先于子元素执行
- keypress会在文本进入文本框前触发，让其延时到有文本时再进行执行
- 耗时任务

## Promise
Promise是起到代理的作用，他可以对现有的异步执行进行包装，对异步进行更多功能的扩充。
