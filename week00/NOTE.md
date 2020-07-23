# 正式开课之前的准备

## 入学自评
1. 编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动
2. 讲讲 position float display 各有哪些取值，它们互相之间会如何影响？
3. JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？
4. HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？
5. 编写一个快速排序代码，并且用动画演示它的过程。

## 入学自评解答
### 1.
见[demo](./dom-edit/index.html)

### 2.
position
- static
- absoult
- resolete
- fixed

float
- left
- right
- none

display
- none
- block
- inline
- inline-block
- table
- flex
- grid

position的absoute和fixed设置后，display和float都会失效。
float的left和right会影响盒模型，使原本inline、inline-block都变为block
display中的table、flex、grid会影响float的left、right，使其失效
display的none直接就不渲染dom元素了，float和position都没有作用了

### 3.
在浏览器中所有的对象都是window的属性，那么window有多少属性值就应该有多少对象
使用`window.keys(window)`可以取出所有值，应该是203个。

### 4.
不能理解题意

### 5.
不会快速排序
https://www.runoob.com/w3cnote/quick-sort-2.html
https://wiki.jikexueyuan.com/project/easy-learn-algorithm/fast-sort.html
https://zhuanlan.zhihu.com/p/63202860
https://zhuanlan.zhihu.com/p/57436476


