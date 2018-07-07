# HTML5

## html版本

- html:xt	— xhtml过渡版本
- html:xs — xhtml严格版本
- html:4t — html4松散版本
- html:4s	— html4严格版本
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

### 获取地理位置

#### 获取当地地理信息

``` js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
```

#### 实时获取地理信息

``` js
navigator.geolocation.watchPosition(successCallback, errorCallback)
```

#### 回调参数

```` js
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