// import { a } from './sidebar.js';
// console.log(a);// 123

// setTimeout(() => {
//     console.log(a);// 345
// }, 1500)

import c from './sidebar.js';
import * as abc from './sidebar.js';
console.log(c, abc);// 3, { a: 1, b: 2, c: 3, default: 3 }
console.log(abc.a, abc.default);// 1, 3