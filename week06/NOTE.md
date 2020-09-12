# 作业
文件在[./css.xmind](./css.xmind)，注意有四个画布，作业在第二个。

---

学习笔记
## CSS排版盒模型
标签Tag、元素Element、盒Box

HTML代码中可以书写开始【标签】，结束【标签】，和自封闭【标签】
一对起止【标签】，表示一个【元素】。
DOM树中存储的是【元素】和其他类型的节点（Node）。
CSS选择器选中的是【元素】。
CSS选择器选中的【元素】，在排版时可能产生多个【盒】。
排版和渲染的基本单位是【盒】。

一个元素可能产生多个盒

盒从外到内
- margin
- border
- padding
- content

`box-sizing`的`content-box`影响`content`，`border-content`影响`border + padding + content`
 
## 正常流
*老师把胡子刮了*
`inline-box`行内盒，IFC（行内级格式化上下文）
`block-level-box`块级盒，BFC（块级格式化上下文）

## 正常流的行级排布
Baseline基线，英文中文都是基于基线对齐的。
字符就是一个码点，具体形状由字体决定

CSS行模型
- line-top：由line-height决定
- text-top：由字体大小决定（如果混排，由最大字体决定）
- base-line：基线
- text-bottom： 字体大小决定
- line-bottom：由line-height决定

- [ ] 这里需要再听一遍，弄懂

## 正常流的块级排布
float
clear其实不是影响别人，而是影响自身，使自己的某一侧不能有浮动使。

## BFC合并
- Block Container: 里面有BFC的，能容纳正常流的盒，里面就有BFC。
- Block-level Box: 外面有BFC的
- Block Box = Block Container + Block-level Box：里外都有BFC的


## 


