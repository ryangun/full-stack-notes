# HTML5

## html版本

- html:xt	— xhtml过渡版本
- html:xs — xhtml严格版本
- html:4t — html4松散版本
	 html:4s	— html4严格版本
- html:5 — html5版本

html5最主要的目的是为了在移动设备上支持多媒体，新特性：

- 取消过时的显示效果标签，如<font></font>和<center></center>
- 新表单元素的引入
- 新语义标签的引入
- canvas标签（图形设计）
- 本地数据库
- 一些API

优点：

- 提高可用性和用户的友好体验
- 给站点带来更多的多媒体元素（视频和音频）
- 替代flash和silverlight
- 涉及到站点抓取和索引时，对于SEO友好
- 将被大量用于移动应用和游戏
- 可移植性好

缺点：

- 该标准并未能很好的被浏览器所支持，因新标签的引入，各浏览器之间缺少一种统一的数据描述格式，造成用户体验不佳

### 解决兼容性问题

方法一：css设置标签display: block，通过DOM的方式创建该标签

``` html
<style>
.header{
	display: block;
}
</style>
<script>
document.createElement('header');
</script>
```

方法二：引入外部的html5shiv.js文件，网址：[https://www.bootcdn.cn/html5shiv/](https://www.bootcdn.cn/html5shiv/)

``` html
<!--[if lte IE 8]>
<script src="html5shiv.js"></script>
<![endif]-->
```

## 多媒体

兼容性问题比较突出，如自动播放问题、资源格式支持问题、安卓下点击播放自动全屏问题

``` html
<audio src="audio.mp3" controls autoplay loop></audio>
<video src="video.mp4" controls autoplay loop></video>
```
上述音频和视频在谷歌浏览器中都不能自动播放，火狐浏览器中正常；而给video添加一个muted属性，video就可以自动播放，但处于静音状态。

## 新表单控件和表单属性

新表单控件：

```
邮箱：<input type="email"><br>
电话：<input type="tel"><br>
网址：<input type="url"><br>
搜索框：<input type="search"><br>
数值范围<input type="range" step="2" min="0" max="10" value="5"><br>
数字：<input type="num"><br>
色值：<input type="color"><br>
完整日期：<input type="datetime"><br>
完整日期，不带时区：<input type="datetime-local"><br>
时间：<input type="time"><br>
日期：<input type="date"><br>
周：<input type="week"><br>
月：<input type="month">
```

新表单属性：

``` html
palcehoder:显示提示信息，
autocomplete:是否保存用户输入值，默认是on，关闭提示选择off
autofocus：鼠标焦点自动聚集，没有值
list和datelist:为输入框构造一个选择列表（list的值为datalist的ID）
required：必须填写
pattern:正则验证，例如pattern="\d{1,5}"只能输入1到5 的数字
formaction:在submit中定义提交地址,只在submit中有用
novalidate:关闭验证功能
autofocus:自动获取焦点
```

## html5的一些API

### 选择器
- document.querySelector('选择器')
- document.querySelectorAll('选择器')

### Dom结构样式对象
- Dom结构.classList.add('class名')
- Dom结构.classList.add('class名')
- Dom结构.classList.toggle('class名')
- Dom结构.classList.contains('class名')

### 自定义属性

``` html
// 设置自定义属性，data-名字，都是小写
<div id="test" data-name="帅哥" data-age="20" data-user-sex="男"></div>
<script>
// 获取自定义属性对象
var dataset = document.querySelector('#test').dataset;

// 打印自定义属性的值
console.log(dataset.name);
console.log(dataset['age']);
console.log(dataset.userSex);

// 代码为标签添加自定义属性
dataset.userHeight = '170'
</script>
```

### 文件读取FileReader

#### 读取方法

- readAsBinaryString — 读取为二进制编码
- readAsText — 读取为文本
- readAsDataURL — 读取为DataURL

#### 提供的事件

- onloadstart — 读取开始时
- onloadend — 读取结束时，无论成功与失败
- onload — 读取成功结束时
- onprogress — 读取过程中
- onabort — 中断时触发
- onerror — 出错时触发

``` html
<!-- 上传图片显示出来例子 -->
<input type="file" id="file" />
<script>
var file = document.querySelector('#file');
file.onchange = function(){
	console.dir(this)
	// 获取上传的文件
	var fl = this.files[0];
	// 创建文件对象
	var fReader = new FileReader();
	// 读取文件
	fReader.readAsDataURL(fl);
	// 开始读取文件的加载事件
	fReader.onload = function(){
		// 获取读取文件的结果
		var result = fReader.result;
		var img = new Image();
		img.src = result;
		document.body.appendChild(img);
	}
}
</script>
```

### 网路状态

#### 属性
navigator.onLine: 返回一个布尔值，true网络在线，flase网络不在线

#### 事件

- window.ononline: 用户网络连接时被调用
- window.onoffline: 用户网络断开时被调用

### 地理位置

#### 获取当地地理信息

``` js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
```

#### 实时获取地理信息

Chrome、IOS10等已不再支持非安全域的浏览器定位请求，Firefox要翻墙才能请求，目前的解决方案是使用百度地图、高德地图或者微信API。

``` js
navigator.geolocation.watchPosition(successCallback, errorCallback)
```

#### 回调参数

``` js
function successCallback(position){
	console.log(position.coords.latitude) //纬度
	console.log(position.coords.longitude) //经度
	console.log(position.coords.accuracy) //精度
	console.log(position.coords.altitude) //海拔高度
}
function errorCallback(msg){
	console.log(msg)
}
```

### 本地存储

传统的document.cookie存储大小只有4k左右，解析也相当复杂。HTML5本地存储的特性：

- 有设置、读取方法；
- 容量较大；
- 能存储字符窜。

#### sessionStorage:

- 生命周期为关闭浏览器窗口；
- 只能在同一窗口下共享数据；
- 容量约为5M；

#### localStorage

- 永久生效，除非手动删除；
- 可以多窗口共享数据；
- 容量约为20M。

``` js
// 设置session
window.sessionStorage.setItem('name', '帅哥');
window.sessionStorage.setItem('age', '18');
window.sessionStorage.setItem('sex', '男');

// 读取session
var name = window.sessionStorage.getItem('name');
var age = window.sessionStorage.getItem('age');
var sex = window.sessionStorage.getItem('sex');
console.log(name); //帅哥
console.log(age); //18
console.log(sex); //男

// 删除session键及键名
window.sessionStorage.removeItem('sex');
console.log(window.sessionStorage.getItem('sex')); //null

// 清除sesstion
window.sessionStorage.clear();
```

## Canvas

推荐一个有意思的学习网站：[http://canvas.migong.org/](http://canvas.migong.org/)

### 基础API

- beginPath()
- closePath()
- moveTo(x, y)
- lineTo(x, y)
- lineWidth
- lineJoin — miter、round、bevel
- lineCap — butt、round、square
- strokeStyle
- stroke()
- fillStyle
- fill()
- font
- textAlign
- textBaseline
- shadowColor
- shadowOffsetX
- shadowOffsetY
- shadowBlur
- rect(x1, y1, x2, y2);
- fillRect(x1, y1, x2, y2)
- strokeRect(x1, y1, x2, y2)
- arc(x, y, radius, sAngle, eAngle, [counterclockwise]);
- createLinearGradient(x1, y1, x2, y2)
- createRadialGradient(x1, y1, radius1 x2, y2, radius2)
- addColorStop(0, '#f00')、addColorStop(1, '#0f0')
- setLineDash([线段长度, 线段间距])，参数为奇数个会自动复制一份成为偶数
- drawImage(图片对象, 图片选择的x坐标, 图片选择的y坐标, 图片的宽, 图片的高, 绘图的x坐标, 绘图的y坐标, 绘图的宽, 绘图的高)
- translate(x, y)
- scale(0.5, 1)
- rotate(Math.PI/2)

### 非零环绕规则

<img src="https://img20.360buyimg.com/cms/jfs/t22828/352/930212759/154363/4ef12fc/5b487da6N1888516f.png" width="500" />

非零环绕规则：对于路径中指定范围区域，从该区域内部画一条足够长的线段，使此线段的完全落在路径范围之外。

非零环绕规则计数器：然后，将计数器初始化为0，每当这个线段与路径上的直线或曲线相交时，就改变计数器的值，如果是与路径顺时针相交时，那么计数器就加1， 如果是与路径逆时针相交时，那么计数器就减1。如果计数器始终不为0，那么此区域就在路径范围里面，在调用fill()方法时，浏览器就会对其进行填充。如果最终值是0，那么此区域就不在路径范围内，浏览器就不会对其进行填充。
