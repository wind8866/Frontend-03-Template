
/**
 * 异步执行的generator
 */
const status = {
    loading: false
}
function fetch(url) {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve({
                name: 'zhangsan',
                age: 14,
            });
        }, 1000);
    });
    return p;
}
function* getUser() {
    status.loading = true;
    yield fetch('/user');
    status.loading = false;
}
function created() {
    const g = getUser();
    const user = g.next();
    user.value.then(data => {
        console.log(data.name);
        // render user
    }).catch(err => {
        console.err(err);
    }).finally(() => g.next());
}
created();

/**
 * 传值调用
 */
function addThunk(){
    return 10 * 10;
}
function add(fun) {
    return fun() + 16;
}
console.log(add(addThunk));
/**
 * JS语言的Thunk函数
 */
function addEventThunk(event) {
    return function(callback) {
        document.addEventListener(event, callback);
    }
}
const clickThunk = addEventThunk('click');
clickThunk(function(e) {
    console.log(e.target.tagName);
});
/**
 * Thunk函数转化器
 */
function addEvent(node, event, callback) {
    node.addEventListener(event, callback);
}
function Thunk (fun) {
    return function() {
        const args = [...arguments];
        return function(callback) {
            args.push(callback);
            fun.apply(this, args);
        }
    }
}
// 使用Thunk函数转化器
const addEventThunk = Thunk(addEvent);
const clickElement = addEventThunk(document, 'click');
clickElement(function(e) {
    console.log(e.target.tagName);
});

/**
 * callback模式的generator异步遍历
 */
function readFile(url, callback) {
    setTimeout(() => {
        if (url.includes('err')) {
            callback(new Error('文件不存在'), '');
        } else {
            callback(null, url + ': content');
        }
    }, 1000)
}
const readFileThunk = Thunk(readFile);
function* readFileList () {
    const fileA = yield readFileThunk('a.text');
    console.log(fileA);
    const fileB = yield readFileThunk('b.text');
    console.log(fileB);
    const fileErr = yield readFileThunk('err.text');
    console.error(fileErr);
}

const read = readFileList();
let file = read.next();

// 手动遍历
file.value(function (err, text) {
    if (err) {
        read.next(err);
        return;
    }
    file = read.next(text);
    file.value(function (err, text) {
        if (err) {
            read.next(err);
            return;
        }
        file = read.next(text);
        file.value(function (err, text) {
            if (err) {
                read.next(err);
                return;
            }
            file = read.next(text);
        })
    })
});

// 将上面的步骤使用递归改为自动遍历循环
function loop(file) {
    file.value(function (err, text) {
        if (err) {
            read.next(err);
            return;
        }
        file = read.next(text);
        if (file.done) {
            return
        }
        loop(file)
    })
}
loop(file);

/**
 * Promise模式的generator异步遍历
 */
function fetch(url) {
    const p = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve({
                name: 'zhangsan',
                age: 14,
                url,
            });
        }, 1000);
    });
    return p;
}
function* getUserList() {
    const user1 = yield fetch('user1');
    console.log(user1);
    const user2 = yield fetch(user1.name);
    console.log(user2);
}

// 手动遍历
function forEach() {
    const gen = getUserList();
    let user = gen.next();
    user.value.then((data) => {
        user = gen.next(data);
        user.value.then(data => {
            user = gen.next(data);
            console.log('end');
        })
    });
    
}
forEach();

// 自动遍历
function autoForEach() {
    const gen = getUserList();
    let user = gen.next();
    const auto = function (promise) {
        promise.then((data) => {
            user = gen.next(data);
            if (user.done) {
                return;
            }
            auto(user.value);
        });   
    }
    auto(user.value);
}
autoForEach();

/**
 * 处理并发的异步操作
 */

/**
 * 处理 Stream
 */