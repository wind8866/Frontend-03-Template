# 作业
#### 作业一：编写一个match函数，接受选择器字符串和dom，返回两者是否匹配
在文件[./match.html](./match.html)

#### 作业二：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）
因为`first-letter`伪元素实现时可以作为一个dom节点处理，dom节点内的内容是确定的。但是`first-line`内的文本是不固定的，假如设置了`float`或`position`属性，会脱离文档流，脱离了整个段落也就不能作为段落的第一行。逻辑是矛盾的，所以不能设置float。


# 周总结

---
# 笔记
## 遍历文档的爬虫
```javascript
const domList = Array.prototype.slice.call(document.querySelector('#container').children);
const cssTagDomList = domList.filter(e => e.getAttribute('data-tag').match(/css/));
const targetList = cssTagDomList.map(e => ({
    name: e.children[1].innerText,
    url: e.children[1].children[0].href,
}));
console.log(targetList);
```

## 选择器
### 简单选择器（simple）
- 星号选择器：`*`
- 标签选择器：`div` `svg|a`
- 类选择器：`.class`
- ID选择器：`#id`
- 属性选择器：`[attr=value]`
- 伪类选择器：`:hover`
- 伪元素选择器：`::before`

### 复合选择器
- <简单选择器><简单选择器><简单选择器>
- 星号选择器和标签选择器必须在最前，伪类伪元素必须在最后

### 复杂选择器（combinator）
- 后代选择器：`.title h1`
- 父子选择器：`ul>li`
- 后续选择器：`.fist-post~div`
- 相邻元素选择器：`li+li`
- 选中某一列(css4)：`||`


## 选择器

### 优先级计数器
```
#id div.a#id

[0, 2, 1, 1]

s = 0 * n^3 + 2 * n^2 + 1 * n^1 + 1 * n^0
取n = 1000000
s = 2000001000001
```
### 优先级规则
```
0000 通用选择器`*`、组合选择器`+>~ ||`、否定伪类`:not()`
0001 标签选择器`div`、伪元素选择器`::before`
0010 类选择器`.title`、属性选择器`[name=username]`、伪类选择器`:hover`
0100 ID选择器`#passwd`
1000 内联样式`style="color: red"`
     重要优先级`!important`
```
注意：
- 相同优先级的css，后声明的会覆盖先声明的
- `!important`比其他种类的选择器优先级更高，如果两个规则都有`!important`，再进行优先级比较


## 练习
- [x] 找出下面表达式的优先级

- `div#a.b .c[id=x]`: `['0', '1', '3', '1']`
- `#a:not(#b)`: `['0', '2', '0', '0']`
- `*.a`: `['0', '0', '1', '0']`
- `div.a`: `['0', '0', '1', '1']`

## 伪类
### 链接/行为
- `:any-link`: 所有超链接
- `:link`: 未访问过的超链接
- `:visited`: 访问过的超链接
- `:hover`: 鼠标移动到元素上
- `:active`: 激活状态
- `:focus`：获得焦点
- `:target`: 链接到当前目标，锚点

### 树结构
- `:empty`
- `:nth-child()`
- `:nth-last-child()`
- `:first-child` `:last-child` `:only-child`

破坏回溯原则的性能上会有一些影响

一旦使用`link`或`visited`之后，再也没有办法更改颜色之外的属性。
layout变化了之后就能通过JS获取链接是否被访问过

### 逻辑型
- `:not`
- `:where` `:has`等css4

## 伪元素
- `::before`: 子节点之前
- `::after`: 子节点之后
- `::first-line`: 第一行
- `::first-letter`: 第一个文字

---

# 本周任务
- [x] 完成课程
- [x] 完成作业
- [ ] 完成根据MDN整理的CSS分类
计划：
- [x] 周天：看完两节课程（实际至三节）
- [x] 周一：完成第四节的实验工具（实际完成至六节）
- [x] 周二：完成本周剩余课程
- [ ] 周三：完成本周作业【未完成】
- [x] 周五：完成所有作业并提交
- [x] 周末：整理css-manual中的选择器部分
---

