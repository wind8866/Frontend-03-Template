学习笔记

- [ ] HTML元素参考
- [ ] 


- web API
    - DOM
    - BOM
    - CSSOM
    - Event
- HTML

<https://developer.mozilla.org/zh-CN/docs/Web>
<https://developer.mozilla.org/zh-CN/docs/Web/Reference/API>
<https://developer.mozilla.org/zh-CN/docs/Web/HTML>
<https://u.geekbang.org/lesson/28?article=273002>

- [ ] html单词标签加入单词本
- [ ] meta: <https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta>
- [ ] 
- [ ] 
- [ ] 
- [ ] 




---
## 语义标签
软件界面其实不需要语义标签，div和span就足够了。
语言没有唯一标准，语义标签也没有唯一标准。
语义标签的作用：
- 作为自然语言延伸
- 避免歧义
- 文章结构
- 机器友好

----
# 本周计划
有三部分内容
- 训练营课程
- 重学前端课程
- MDN文档课程

## 任务分解
- [ ] 视频课程的学习，笔记的记录
- [ ] 重学前端的文章
- [ ] [MDN HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
- [ ] [MDN 全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)
- [ ] [MDN 所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)
- [ ] window的属性找出相关的文档
- [ ] 再次看重学前端的文章
- [ ] 再次看课程视频，整理学习笔记


## 任务进度

---

### 事件API
冒泡和捕获与时间监听没有关系，在任何事件都会发生。默认是冒泡事件。
捕获或者冒泡只是事件监听的时机，浏览器始终是先捕获后冒泡。
有疑问，为什么捕获先于冒泡触发。

### DOM API

浏览器所有API
- traversal
- evnet
- element
- Range


- Node
    - Element
        - HTMLElement
            - HTMLAnchorElement
            - HTMLBodyElement
            - HTMLDivElement
        - SVGElement
            - SVGAElement
    - Document
    - CharacterData
        - Text
        - Comment
        - ProcessingInstruction
    - DocumentFragment
    - DocumentType

#### DOM API
Node导航
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

Element导航(忽略文本节点)
- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

修改操作
- appendChild
- insertBefore
- removeChild
- replaceChild

高级操作
- compareDocumentPosition: 比较两个节点的关系
- contains: 检查一个节点是否包含另一个节点
- isEqualNode: 检查两个节点是否完全相同
- isSameNode: 检查是否是同一个节点，可用'==='替代
- cloneNode: 克隆节点，传入true，会执行深拷贝

#### 
- iterator迭代器（无用途）
- Range

- [ ] 练习：子元素逆序，三种实现代码

```javascript
const range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)

const range = document.getSelection().getRangeAt(0)
```
API
- range.setStartBefore: 起点设置到某个节点之前
- range.setEndbBefore: 止点设置到某个节点之前
- range.setStartAfter: 起点设置到某个节点之后
- range.setEndAfter: 止点设置到某个节点之后
- range.selectNode: 选中一个元素
- range.selectNodeContents: 选中元素中的所有的内容

- range.extractContents: 内容取出来，从dom树上删掉
- range. insertNode: 插入新的节点

### CSSOM
document.styleSheets

```javascript
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule('p { color: pink;}', 0)
document.styleSheets[0].removeRule(0)
```

取到真实渲染的属性
```javascript
window.getComputedStyle(elt, pseudoElt)
getComputedStyle(document.querySelector('a'), '::before'.color)
```

- window
    - window.innerHeight, window.innerWidth: viewport的宽高
    - window.outerWidth, window.outerHeight: 自带包含浏览器整个大小
    - window.devicePixelRatio: 物理像素与像素的比值DPR
    - window.screen: 屏幕
        - window.screen.width
        - window.screen.height
        - window.screen.availWidth
        - window.screen.availHeight

- window API
    - window.open()
    - moveTo(x, y)
    - moveBy(x, y)
    - resizeTo(x, y)
    - resizeBy(x, y)

scroll
- scrollTop
- scrollLeft
- scrollWidth
- scrollHeight
- scroll(x, y)
- scrollBy(x, y)
- scrollIntoView()

window
- scrollX
- scrollY
- scroll(x, y)
= scrollby(x, y)

layout
- getClientRects()
- getBoundingClientRect()

#### 其他API
- khronos
    - WebGL
- ECMA
    - ECMAScript
- WHATWG
    - HTML
- W3C
    - webaudio
    - CG/WG/IG

