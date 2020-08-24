# 任务
- [ ] 完成课程
- [ ] 完成根据MDN整理的CSS分类

---

计划：
- [x] 周天：看完两节课程（实际至三节）
- [x] 周一：完成第四节的实验工具（实际完成至六节）
- [ ] 周二：完成本周剩余课程
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


# 学习笔记
从语法版本出发

