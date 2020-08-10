# 周总结
本周的内容相对一周时内容没那么多，动手实践的代码更多。
状态机的思想可以在很多地方用到，我们在不同状态之间跳来跳去，可以解析特别特别复杂的逻辑。
手动完成`客户端发送请求 => 服务端接收请求 => 服务端返回响应 => 客户端接收请求 => 客户端解析请求`的整个代码流程，要比看文章强1000倍。老师的课程安排的真好。
以下是本周需要进一步完成的作业，争取在第三周完成
- [ ] 学习ES6异步执行、Permise、ansy、awit等知识
- [ ] 完成选做的作业
- [ ] 优化代码，解决代码中的疑惑点
- [ ] Transfer-Encoding请求头是做什么的？其他请求头的解析方式是什么样的呢？
- [ ] 换行符`\r`和`\n`有什么区别，不同系统中敲击`enter`键，输入的是什么字符？

----
# 学习笔记
### 【预习】一个浏览器是如何工作的
渲染步骤：
1. 使用HTTP或HTTPS协议向服务端请求内容
2. 把请求来的HTML经过解析，构建成DOM树
3. 计算DOM树上的CSS属性
4. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图
5. 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度
6. 合成之后，再绘制到界面上

流式处理数据

#### 向服务端请求内容
整理了一个HTTP的思维导图: [assets/HTTP-tree.md](./assets/HTTP-tree.md)
使用TCP连接工具
```shell
telnet time.geekbang.org 80

GET / HTTP/1.1
Host: time.geekbang.org
```

#### 解析HTML，构建DOM树

**分词（token）**
接受字符流，每次读取一个字符串，使用状态机每次决策，解析成想要的词。
状态机有当前状态，每读入一个字符都去判断是否是当前状态，不是则跳转到其他状态。状态机就能将字符串分割成一个一个的词。

**构建DOM树**
使用栈，入栈，出栈

- [ ] 写一个函数，分析HTML将其拆分成DOM树，[可参考](https://github.com/aimergenge/toy-html-parser)
- [ ] 理解状态机


### 剩下的3、4、5预习
第三四五课预习对应第三四周的课程，后面再看

### 1、浏览器工作原理总论

---

[HTTP 协议中的 Transfer-Encoding](https://imququ.com/post/transfer-encoding-header-in-http.html)
1、看HTTP模块教程，完成一个服务端https://nodejs.org/zh-cn/docs/guides/anatomy-of-an-http-transaction/
2、了解异步执行、Permise、ansy、awit等知识
3、编写发送请求的代码
4、完成状态机的作业👌
5、完成状态机选做作业