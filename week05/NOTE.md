# 任务
- [ ] 完成课程
- [ ] 完成根据MDN整理的CSS分类

---

计划：
- [x] 周天：看完两节课程（实际至三节）
- [x] 周一：完成第四节的实验工具（实际完成至六节）
- [x] 周二：完成本周剩余课程
- [ ] 周三：完成本周作业
---

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
### 简单选择器
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

### 复杂选择器
- 子孙选择器：`.title h1`
- 子元素选择器：`ul>li`
- 后续选择器：`.fist-post~div`
- 相邻元素选择器：`li+li`
- 选中某一列`||`


## 选择器优先级计数器
```
#id div.a#id

[0, 2, 1, 1]

s = 0 * n^3 + 2 * n^2 + 1 * n^1 + 1 * n^0
取n = 1000000
s = 2000001000001
```

## 练习
- [ ] 找出下面表达式的优先级

- `div#a.b .c[id=x]`
- `#a:not(#b)`
- `*.a`
- `div.a`

## 伪类
### 链接/行为
- `:any-link`: 所有超链接
- `:link`: 未访问过的超链接
- `:visited`: 访问过的超链接
- `hover`: 鼠标移动到元素上
- `:active`: 激活状态
- `:focus`：获得焦点
- `:target`: 链接到当前目标，锚点

### 树结构
- :empty
- :nth-child()
- :nth-last-child()
- :first-child :last-child :only-child

破坏回溯原则的性能上会有一些影响

### 逻辑型
- `:not`
- `:where` `:has`等css4

## 伪元素
- `::before`: 
- `::after`: 
- `::first-line`: 
- `::first-letter`: 

### 思考题
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）

- [ ] 完成思考题

因为`first-letter`伪元素实现时可以作为一个dom节点处理，dom节点内的内容是确定的。但是`first-line`内的文本是不固定的，假如设置了`float`或`position`属性，会脱离文档流，脱离了整个段落也就不能作为段落的第一行。所以逻辑是矛盾的。


- [ ] 作业：编写一个match函数，接受选择器字符串和dom，返回两者是否匹配

```javascript
function match(selector, element) {
    return true'
}

match('div #id.class', document.getElementById('id'))
```


一旦使用`link`或`visited`之后，再也没有办法更改颜色之外的属性。
layout变化了之后就能通过JS获取链接是否被访问过




# 学习笔记
从语法版本出发

