# 周总结
本周的内容相对一周时内容没那么多，动手实践的代码更多。
状态机的思想可以在很多地方用到，我们在不同状态之间跳来跳去，可以解析特别特别复杂的逻辑。
手动完成`客户端发送请求 => 服务端接收请求 => 服务端返回响应 => 客户端接收请求 => 客户端解析请求`的整个代码流程，要比看文章强1000倍。老师的课程安排的真好。
以下是本周需要进一步完成的作业，争取在第三周完成
- [ ] 学习ES6异步执行、Permise、ansy、awit等知识
- [ ] 完成选做的作业
- [ ] 优化代码，解决代码中的疑惑点
- [x] Transfer-Encoding请求头是做什么的？其他请求头的解析方式是什么样的呢？参考[HTTP 协议中的 Transfer-Encoding](https://imququ.com/post/transfer-encoding-header-in-http.html)
- [x] 换行符`\r`和`\n`有什么区别，不同系统中敲击`enter`键，输入的是什么字符？

----
# 学习笔记
### 【预习】一个浏览器是如何工作的（对应第一节内容）
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

---
# 问题解答
### 换行符`\r`和`\n`有什么区别，不同系统中敲击`enter`键，输入的是什么字符？
- Unix、Linux、macOS：`\n`
- 旧版macOS：`\r`
- windows: `\r\n`

[回车](https://en.wikipedia.org/wiki/Carriage_return)：carriage return、简写CR，转义符`\r`，ASASCII为13，指将打印头移动到行首。
[换行](https://en.wikipedia.org/wiki/Newline)：Newline、line feed，简写LF，转义符`\n`，ASASCII为10，指将打印头移动到下一行。

[历史渊源](http://www.ruanyifeng.com/blog/2006/04/post_213.html)

### Transfer-Encoding请求头是做什么的？其他请求头的解析方式是什么样的呢？
参考[HTTP 协议中的 Transfer-Encoding](https://imququ.com/post/transfer-encoding-header-in-http.html)
HTTP长连接出现之前，浏览器可以根据TPC连接关闭确定响应已经完成。长连接出现后浏览器可以根据HTTP Header中的字段确定body的长度，但是这种做法是同步产生，耗时。`Transfer-Encoding`的出现规定了一种chunked的方式，流式的处理**传输编码**（注意传输编码在内容编码Content-Encoding之后）。而chunked的方式就是一行单独的十六进制数值表示本次chunked的字符长度。这样就能实现分组传输。浏览器接收到长度值为零的字符长度时就可以确定传输完成。
