

/**
 * 基本方法
 */
const query = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'zhangsan',
                age: 24,
                url,
            });
        }, 1300);
    })
}
const load = async function() {
    const user = await query('user');
    console.log(user);
    const user2 = await query(user.name);
    console.log(user2);
}
load();
/**
 * 指定多少毫秒后输出一个值
 */
const wait = (timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({});
        }, timer);
    })
}
const load = async function() {
    const user = await wait(5000);
    console.log('user');
}
load();

/**
 * 休眠效果 sleep
 * 类上
 */
const sleep = (timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timer);
    });
}
(async () => {
    for (let i = 0;i < 10;i++) {
        console.log(i);
        await sleep(1000);
    }
})();
/**
 * 内部抛出错误
 * 会阻止代码执行，使用try...catch
 */

/**
 * 并发执行
 * 两种写法
 */

/**
 * 
 */

/**
 * async 函数的内部实现原理
 */

/**
 * 
 */