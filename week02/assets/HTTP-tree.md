- HTTP
    - Request
        - request line
            - methed
                - GET：获取
                - POST：表单
                - HEAD：只返回请求头
                - PUT：添加
                - DELETE：删除
                - CONNECT：HTTPS或WebSocket
                - OPTIONS：调试
                - TRACE：调试
            - path
            - version
        - head
            - Accpet：请求的数据格式
                - application/json
                - application/x-www-form-urlencoded
                - multipart/form-data
                - text/xml
            - Host：域名
            - Cookie：客户端存储的Cookie字符串
            - ⌛️
        - body
    - Reponse
        - reponse line
            - methed
                - version
                - status code
                    - 1xx：临时相应，需进一步处理
                    - 200：成功
                    - 3xx：重定向
                    - 301：永久重定向
                    - 302：临时重定向
                    - 304：资源未改变（客户端可使用缓存）
                    - 4xx：客户端错误
                    - 403：服务器拒绝执行
                    - 404：资源未找到
                    - 405：请求方法不正确
                    - 5xx：服务器错误
                    - 500：未知错误
                    - 503：暂时性错误，稍后再试
                - status text
            - head
                - Date：服务器时间
                - Keep-Alive：是否长链接
                - Set-Cookie：设置cookie
                - ⌛️
            - body
- HTTPS
- HTTP2
    - HTTP长连接
    - 服务端主动推送



```
HTTP/1.1 301 Moved Permanently
Date: Fri, 25 Jan 2019 13:28:12 GMT
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```


参考：
- [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [HTTP状态码](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
- [HTTP头](https://tools.ietf.org/html/rfc2616#section-14)