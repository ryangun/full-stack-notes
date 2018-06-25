# 数据交互

- http/https
- form
- ajax—官方、不能跨域、单向(get、不支持post)
- jsonp—民间、跨域，不推荐
- websocket—官方、跨域、双工

## http/https

### 什么是http协议?

[rfc 2616](https://tools.ietf.org/html/rfc2616)

- 客户端（浏览器）
- 服务端（服务器）
- 无状态，每次请求都是新的
- 请求过程：三次握手（发送连接请求、响应接受、发送请求）
- 消息（报文）
 - 头/header	信息<=32K
 - 体/body		数据<=2G
- 缓存 
 - 野路子—随机时
 - 官方—Cache-Control/Date/Expires

### 什么是https协议？

[rfc 2818](https://tools.ietf.org/html/rfc2818)

- HTTP Over TLS
- 证书
- 版本
	- https1.0	短链接
	- https1.1	主流，长链接—keep alive
	- https2.0	最近，试图加状态

## 表单form

ajax、jsonp都是对form的模拟，只是不用刷新页面

- action—提交到哪去
- method—数据怎么传给服务器
	- get	获取东西，把数据放在url中，数据量小、缓存
	- post	发送东西，把数据放在body，数据量大、无缓存
	- put	发送东西、和post类型
	- delete	删除东西
	- head	让服务器只发送头回来就行，不需要内容
- name—名字
- enctype
	- application/x-www-form-urlencoded	名字=值&名字=值&...	默认、小数据
	- multipart/form-data	分块	文件上传、大数据 

## Ajax

XMLHttpRequest	

- 用户体验、性能高
- readyState
	- 0	初始状态，xhr对象刚创建完
	- 1	连接，连接到服务器
	- 2	发送请求，刚刚send完
	- 3	head接收完
	- 4	body接收完
- status（HTTP状态码）
	- 1xx 信息
	- 2xx 成功
	- 3xx 重定向
		- 301 永久，下回不再请求
		- 302 临时，下回依然请求
		- 304 缓存，客户端/服务端都能控制是否缓存
	- 4xx 请求错误
	- 5xx 服务器错误
	- 6xx+ 自定义 
- 接收响应数据
	- xhr.responseText
	- xhr.responseXML
	- xhr.responseURL
	- json不兼容IE6/IE7/IE8
- 安全问题
	- 1.前台没有安全性；后台才有问题（注入）
	- 2.xss—跨站脚本攻击
	- eval不全、ajax本身不允许跨域—为防止安全性问题
- ajax如何实现跨域
- ajax如何上传文件
- json标准格式：key必须用双引号包起来

``` html
<input type="button" value="按钮" id="btn" />
window.onload = function() {
  let btn = document.getElementById('btn');
  btn.onclick = function() {
      // 1.创建对象
      let xhr = new XMLHttpRequest();
      console.log('xhr对象创建完', xhr.readyState) // 0

      // 2.连接：true异步，false同步
      xhr.open('GET', 'data/1.txt', true)
      console.log('已连接服务器', xhr.readyState) // 1

      // 3.发送
      xhr.send();

      // 4.接受：当通信状态改变
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 2) {
              console.log('send完', xhr.readyState)
          } else if (xhr.readyState == 3) {
              console.log('头接收完', xhr.readyState)
          } else if (xhr.readyState == 4) {
              console.log('body接收完，但是能否成功返回内容尚未可知，需要判断状态码', xhr.readyState)
              if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                  console.log('成功', xhr.status);
                  console.log(xhr);

                  let json = null;
                  try {
                      json = JSON.parse(xhr.responseText);
                  } catch (e) {
                      json = eval('(' + xhr.responseText + ')');
                  }
                  console.log(json);
                  // 读取data/2.xml 
                 	// console.log(xhr.responseXML);
                  // let p = xhr.responseXML.getElementsByTagName('person')[0];
                  // console.log(p.children);
              } else {
                  console.log('失败', xhr.status);
              }
          }
      }
  }
}
```

## jsonp

- 不安全，不好用，被历史抛弃

## websocket

- 安全、跨域、双工

__自我要求__
- 1.读、写 [https://tools.ietf.org/html/rfc2616](https://tools.ietf.org/html/rfc2616)
- 2.解释http状态——20个
- 3.了解ajax2.0
- 4.了解RESTful
