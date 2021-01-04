/**
 * 一个最普通的例子
 */
const promise = new Promise(function(resolve, reject) {
    setTimeout(function () {
        const value = parseInt(Math.random() * 10);
        if (value % 2 === 0) {
            resolve(value);
        } else {
            reject(new Error('奇数: ' + value));
        }
    }, 1000);
});

promise.then(function(value) {
    // success
    console.log(value)
}, function(error) {
    // error
    console.error(error)
});

/**
 * Promise新建后会立即执行，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行。
 */
setTimeout(function(){
    console.log(1);
}, 0);
console.log(2);
const promise = new Promise(function(resolve, reject) {
    console.log(3);
    resolve(555);// a
    console.log(4);
})
console.log(5);
promise.then(function(value) {
    // success
    console.log(6);
}).catch(function(error) {
    // error
    console.log(7);
});
console.log(8);
// 依次返回：
// 2 3 4 5 8 6 1
// a改为value依次返回
// 2 3 5 8 7 1

/**
 * 
 * @param {请求参数} res 
 * @param {成功的回调} success 
 * @param {失败的回调} fail 
 */
function request(res, success, fail) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                success(request.responseText)
            } else {
                if (fail) {
                    fail(request);
                } else {
                    new Error('HTTP Status: ' + request.status);
                    new Error('HTTP response: ' + request.responseText);
                }
            }
        } else {
            // console.log('pending')
        }
    }
    request.open(res.method, res.url);
    request.send();
}
request({
    method: 'GET',
    url: 'https://run.mocky.io/v3/3a053c13-9363-4c6c-83bc-c43793eaccd4'
}, function(res) {
    console.log(res)
});

/**
 * promise的写法
 */
const request = function(res) {
    const promise = new Promise(function(resolve, reject) {
        function handler() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    new Error('HTTP Status: ' + request.status);
                    new Error('HTTP response: ' + request.responseText);
                    reject(request);
                }
            } else {
                // console.log('pending')
            }
        }
        const request = new XMLHttpRequest();
        request.onreadystatechange = handler;
        request.open(res.method, res.url);
        request.send();
    });
    return promise;
}
request({
    method: 'GET',
    url: 'https://run.mocky.io/v3/3a053c13-9363-4c6c-83bc-c43793eaccd4'
}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
});

/**
 * 异步的依赖关系
 */
// a > b > c > d
// pubilc
function a() {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => resolve('a'), 1000);
    });
    return p;
}
function b() {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => resolve('b'), 1000);
    });
    return p;
}
function c() {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => resolve('c'), 1000);
    });
    return p;
}
function d() {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => resolve('d'), 1000);
    });
    return p;
}

// 回调方法
a().then(function(who) {
    console.log(who + ' resolve');
}).then(function(who) {
    // who is undefined
    console.log(who + ' resolve');
    return b();
}).then(function(who) {
    console.log(who + ' resolve');
    return c();
}).then(function(who) {
    console.log(who + ' resolve');
    return d();
}).then(function(who) {
    console.log(who + ' resolve');
    console.log('end');
}).catch(function(err) {
    new Error(err);
});

// a & b > c & d
const ab = Promise.all([a(), b()]);
ab.then(function(who) {
    console.log(who);
}).catch(function(err) {
    new Error(err);
});
ab.then(() => c()).then(function(who) {
    console.log(who + ' resolve');
});
ab.then(() => d()).then(function(who) {
    console.log(who + ' resolve');
});


/**
 * 下面的代码p1和p2其实是并行执行。
 * p2依赖p1的执行结果，会等待状态变化后才改变自己的状态。
 * p2返回一个Promise，那么p1的状态决定了p2的状态
 */
let moment = +(new Date());
const p1 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        // 创建后立即执行，所以这里会在第三秒执行
        console.log(+(new Date()) - moment)
        reject(new Error('fail'))
    }, 3000)
});
const p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
});
p2.then(result => {
    console.log(result)
}).catch(error => {
    // p1和p2的大的定时器决定了此代码的执行时机
    console.log(error, +(new Date()) - moment);
})