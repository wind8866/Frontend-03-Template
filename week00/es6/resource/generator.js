/**
 * 基础代码
 */
function* helloWorld() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
const hw = helloWorld();
console.log(hw.next());

/**
 * 一个遍历实现
 */
var arr = [1, [[2, 3], 4], [5, 6]];
1, 2, 3, 4, 5, 6
const flat = function* (arr) {
    for (const item of arr) {
        if (typeof item === 'number') {
            yield item;
        } else {
            yield* flat(item);
        }
    }
}
for (const num of flat(arr)) {
    console.log(num);
}

/**
 * 对象的遍历器属性
 * 问题：这里为什么不调用一下Generator函数？
 */
const obj = {};
obj[Symbol.iterator] = function* () {
    console.log(555)
    yield 1;
    yield 2;
    yield 3;
};
// 只有执行下面的代码才会打印555，执行对象的遍历器时会先自动调用一下吗？是的，并不是在声明遍历器的时候预选调用一下Generator，二是在遍历then之前先调用一下Generator函数。
// console.log(obj[Symbol.iterator]())
console.log([...obj]);

/**
 * 传递不同的参数会影响函数的执行行为
 */
function* foo() {
    let i = 0;
    while(true) {
        let reset = yield i;
        if (reset === 'reset') {
            i = -1;
        }
        i++;
    }
}
const g = foo();
g.next();// {value: 0, done: false}
g.next();// {value: 1, done: false}
g.next();// {value: 2, done: false}
g.next();// {value: 3, done: false}
g.next('reset');// {value: 0, done: false}
g.next();// {value: 1, done: false}

/**
 * 斐波那契数列
 */
function* f() {
    let arr = [0, 1];
    while(true) {
        yield arr[0] + arr[1];
        arr = [arr[1], arr[0] + arr[1]];
    }
}
for (const val of f()) {
    if (val > 1000) {
        break;
    }
    console.log(val);
}

/**
 * for of遍历任意对象
 */
const obj = {
    age: 12,
    name: 'zhangsan',
    learn: ['vue', 'react'],
};
function feature (obj) {
    obj[Symbol.iterator] = function* () {
        // Reflect.ownKeys(obj) 包括Symbol
        const keys = Object.keys(obj);
        for (const key of keys) {
            yield obj[key];
        }
    }
    return obj;
}

for (const val of feature(obj)) {
    console.log(val);
}

/**
 * 错误捕获
 */
const g = function* () {
    yield 6;
    try {
        yield 7;
    } catch(e) {
        console.error(e);
    }
    yield 8;
    yield 9;
    yield 10;
}
const run = g();
run.next();
// {value: 6, done: false}
run.next();
// {value: 7, done: false}
run.throw(new Error('error!!!!'))
// Error: error!!!!
//   at <anonymous>:1:11
// {value: 8, done: false}
run.return('ddddd')
// {value: 'ddddd', done: true}
run.next();
// {value: undefined, done: true}
run.next(3434);
// {value: undefined, done: true}

/**
 * 依次取出多维数组里的值
 * todo:
 */

/**
 * 遍历完全二叉树
 * todo:
 */

/**
 * 实现类似构造函数的特性
 * todo:
 */

/**
 * 同步操作的异步表达
 * 意思是request是异步函数执行函数，但在通过Generator使调用变成了同步方式调用
 * todo: 怎么将run.next(response);的run强耦合优化掉
 */
const status = {
    loading: false,
    data: {},
    setLoading(result) {
        console.log(result);
        this.loading = result;
    },
    setData(data) {
        console.log(data);
        this.data = data;
    }
};
function request() {
    setTimeout(function() {
        const response = {
            age: 11,
            name: 'zhangsan',
        };
        run.next(response);
    }, 1000);
}
function* main() {
    status.setLoading(true);
    const response = yield request();
    console.log(response)
    status.setLoading(false);
} 
const run = main();
run.next();

/**
 * 流程控制1
 */
function step1(val, fun) { fun(++val); }
function step2(val, fun) { fun(++val); }
function step3(val, fun) { fun(++val); }

function run(val) {
    step1(val, function(val1) {
        step2(val1, function(val2) {
            step3(val2, function(val3) {
                console.log(val3)
            })
        })
    })
}
run(1);

/**
 * 流程控制2
 * todo: 
 */
const step1Plus = new Promise(function(resolve, reject) {
    
    resolve(value)
});

/**
 * 流程控制3
 */
const step1 = val => ++val;
const step2 = val => ++val;
const step3 = val => ++val;
function* main(val) {
    const val1 = yield step1(val);
    const val2 = yield step2(val1);
    const val3 = yield step3(val2);
    console.log(val3.value);
}
function auto(g, init) {
    debugger
    const run = g(...init);// 这里是传递给step1使用的
    let val = run.next();// 这里传递了值也没用
    while(true) {
        if (val.done) {
            break;
        }
        val = run.next(val.value);
    }
}
auto(main, [1]);
// 有几个点需要注意：
// 首先，调用Generator函数虽然不会执行，但是会将传入的值val=1加入到他的执行环境上下文
// 然后，第一次调用next，传入的参数没用，执行后的值经过yield会被包装成 { done: false, value: 2 }
// 我们必须在外部存储第一次调用next的结果，然后在第二次next时作为参数传给他，才能执行
// 即：yield step2(val1.value)【yield step2(2)】 返回 { done: false, value: 3 }
// 随即：yield step3(val2.value)【yield step2(3)】 返回 { done: false, value: 4 }
// 然后打印 console.log(val3.value); 函数执行完，再次循环{ done: true, value: undefined }

/**
 * 流程控制：依次执行
 * 依次执行多个项目的多个任务（遍历树？）
 */

const jobTree = [
    {
        steps: [
            () => {console.log('job1 step1');return '1-1';},
            () => {console.log('job1 step2');return '1-2';},
            () => {console.log('job1 step3');return '1-3';},
            () => {console.log('job1 step4');return '1-4';},
        ]
    },
    {
        steps: [
            () => {console.log('job2 step1');return '2-1';},
            () => {console.log('job2 step2');return '2-2';},
            () => {console.log('job2 step3');return '2-3';},
            () => {console.log('job2 step4');return '2-4';},
        ]
    }
];

function* queueStep(steps) {
    for (const step of steps) {
        yield step();
    }
}
function* queueJob(jobs) {
    for (const job of jobs) {
        yield* queueStep(job.steps);
    }
}
for (const val of queueJob(jobTree)) {
    console.log(val);
}