### webpack



> webpack是一个现代JavaScript应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。
>

#### 历史介绍

- 2009年初，commonjs规范还未出来，此时前端开发人员编写的代码都是非模块化的，
  - 那个时候开发人员经常需要十分留意文件加载顺序所带来的依赖问题
- 与此同时 nodejs开启了js全栈大门，而requirejs在国外也带动着前端逐步实现模块化
  - 同时国内seajs也进行了大力推广
  - AMD 规范 ，具体实现是requirejs define('模块id',[模块依赖1,模块依赖2],function(){  return ;}) , ajax请求文件并加载
  - Commonjs || CMD 规范seajs 淘宝玉伯
    - commonjs和cmd非常相似的
      - cmd  require/module.exports
    - commonjs是js在后端语言的规范: 模块、文件操作、操作系统底层
    - CMD 仅仅是模块定义
  - UMD 通用模块定义，一种既能兼容amd也能兼容commonjs 也能兼容浏览器环境运行的万能代码
- npm/bower集中包管理的方式备受青睐，12年browserify/webpack诞生
  - npm 是可以下载前后端的js代码475000个包
  - bower 只能下载前端的js代码,bower 在下载bootstrap的时候会自动的下载jquery
  - browserify 解决让require可以运行在浏览器，分析require的关系，组装代码
  - webpack 打包工具，占市场主流



```javascript
(function (root, factory) {  
    if (typeof exports === 'object') { 
        module.exports = factory();  //commonjs环境下能拿到返回值
    } else if (typeof define === 'function' ) {  
        define(factory);   //define(function(){return 'a'})  AMD
    } else {  
        window.eventUtil = factory();  
    }  
})(this, function() {  
    // module  
    return {  
        //具体模块代码
        addEvent: function(el, type, handle) {  
            //...  
        },  
        removeEvent: function(el, type, handle) {  
              
        },  
    };  
}); 
```

![image-20180920212034709](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180920212034709.png)

#### 模块实现

###### 1.下载webpack为项目开发依赖

``` npm install webpack@3.12.0 -D```

######   2.创建main.js作为项目的入口文件

```javascript
// 整个程序的入口文件

import Vue from './vue.js'
import App from './App.js'
// 模块整体加载
// import {num,num2,add} from './App.js'

// console.log(num);
// console.log(num2);
// add(3,5);

// import * as object from './App.js'
// console.log(object);
// console.log(object.num);
// console.log(object.num2);
// add(3,5);
new Vue({
	el:'#app',
	components:{
		App
	},
	template:`<App />`
});
```



###### 3.创建一个App.js

```javascript
var App = {
	template:`
		<div>
			我是一个入口组件
		</div>
	`
};
//1. 声明并导出
export var num = 2; //作为一整个对象key导出

//2. 声明再导出
var  num2 = 4;
export {num2};
//3.抛出一个函数
export function add(x,y) {
	return console.log(x+y);
}
//4.抛出一个对象
export default App;
```

######  4.在package.json文件中配置如下：

```javascript
{
  "name": "29_module",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "build": "webpack ./main.js ./build.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.12.0"
  }
}

```

###### 5.新建一个index.html，script脚本引入打包完成的build.js如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<div id="app"></div>
	<script type="text/javascript" src="./build.js"></script>
	
</body>
</html>
```



#### webpack 编译之后的build.js文件解读

![image-20180821002853996](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180920201606552.png)

关于setimmediate介绍链接：

http://www.ruanyifeng.com/blog/2014/10/event-loop.html



##### webpack打包模块的源码 执行顺序

- 1:把所有模块的代码放入到函数中，用一个数组保存起来
- 2:根据require时传入的数组索引，能知道需要哪一段代码
- 3:从数组中，根据索引取出包含我们代码的函数
- 4:执行该函数，传入一个对象 module.exports
- 5:我们的代码，按照约定，正好是用module.exports = 'xxxx' 进行赋值
- 6:调用函数结束后，module.exports从原来的空对象，就有值了
- 7:最终return module.exports; 作为require函数的返回值

#### webpack.config.js文件配置

- ###### entry 是一个对象，程序的入口

  - key:随意写
  - value: 入口文件

- ###### output 是一个对象,产出的资源

  - key: filename
  - value : 生成的build.js

- ###### module 模块（对象）

  - loaders:[]
    - 存在一些loader   `{ test:正则,loader:'style-loader!css-loader'    }



###### 配置文件webpack.config.js的修改

修改配置文件名为:webpack.dev.config.js和webpack.prod.config.js

###### 在package.json文件中修改

```javascript
"scripts": {
     "dev": "webpack --config ./webpack.dev.config.js",
     "prod": "webpack --config ./webpack.prod.config.js"

}
```



#### css文件处理

###### es6模块导入

```javascript
import './main.css'
```

###### 编译之后报错

![image-20180821165449130](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180821165449130.png)

对于webpack来说，css文件也是一个模块，但是像这样的文件，webpack得需要loaders去处理这些文件

###### 下载并配置

```npm i css-loader style-loader -D	```

```javascript
module:{
		loaders:[
			{	
				// 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			}
            ]
}
```

#### 图片文件的处理

###### App.js 导入图片资源

```javascript
import imgSrc from './myGirl.jpg'

export default{
	template:`
		<div>
			<img :src="imgSrc" alt="" />
		</div>
	`,
	data(){
		return {
			imgSrc:imgSrc
		}
	}
};
```

对文件的处理，webpack得需要```url-loader```和```file-loader```

###### 下载处理图片的loader模块

```npm i url-loader file-loader -D```



###### 添加loader的配置

```javascript
module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit=4000'
			}
		]
	},
```

```javascript
webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
简易,对于比较小的图片，使用base64编码，可以减少一次图片的网络请求；那么对于比较大的图片,使用base64就不适合了，编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，反而加大了下载页面的大小，得不偿失了呢,因此设置一个合理的limit是非常有必要的。
```









#### html-webpack-plugin插件的使用

###### 下载模块

```npm i html-webpack-plugin --save-dev```

###### webpack.config.js文件配置

```javascript
const path = require('path');
//2.导入模块
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果一个，就默认从这一个入口开始分析
		 "main" : './src/main.js'
	},
	output:{
		// 指定产出的目录
		path: path.resolve('./dist'), //相对转绝对
		filename:'build.js'
	},
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{	
				// 遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit=100000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}
		]
	},
	watch:true, //文件监视改动 自动产生build.js
    //添加插件 
	plugins:[
		new HtmlWebpackPlugin({
			//插件的执行运行与元素索引有关
			templat:'./src/index.html', //参照物
		})
	]
}
```



#### CommonsChunkPlugin的使用

> CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，着实是优化的一把利器.

##### chunk的分类

- webpack当中配置的入口文件(entry)是chunk，可以理解为entry chunk
- 入口文件以及它的依赖文件通过code splite(代码分割) 出来的也是chunk，可以理解为children chunk
- 通过CommonsChunkPlugin创建出来的文件也是chunk，可以理解为commons chunk



##### CommonsChunkPlugin可配置的属性

- name：可以是已经存在的chunk（一般指入口文件）对应的name，那么就会把公共模块代码合并到这个chunk上；否则，会创建名字为name的commons chunk进行合并
- filename：指定commons chunk的文件名
- chunks：指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks
- minChunks：既可以是数字，也可以是函数，还可以是Infinity，具体用法和区别下面会说



##### 验证三种情况

- 不分离出第三方库和自定义公共模块
- 分离出第三方库、自定义公共模块、webpack运行文件，但它们在同一个文件中
- 单独分离第三方库、自定义公共模块、webpack运行文件，各自在不同文件

###### 不分离出第三方库和自定义公共模块

![image-20180924222636451](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924222636451.png)



src目录下各个文件内容，尽量保持简单，让大家理解：

```javascript
--common.js
	export const common = 'common file';
--main1.js
	import {common} from './common.js'
    import Vue from 'vue'
    console.log(Vue,`main1 ${common}`);
--main2.js
	import {common} from './common.js'
    import Vue from 'vue'
    console.log(Vue,`main1 ${common}`)
```

webpack.config.js

```javascript
const path  = require('path');
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main1":'./src/main1.js',
		"main2":'./src/main2.js'
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'[name].js'
	},
	watch:true,//文件监视改动 自动产出build.js
}
```

执行命令npm run build,

![image-20180924223321598](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924223321598.png)

![image-20180924223426110](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924223426110.png)

问题：**查看main1.js和main2.js，会发现共同引用的common.js文件和vue都被打包进去了，这肯定不合理，公共模块重复打包，体积过大。**

###### 分离出第三方库、自定义公共模块、webpack运行文件

修改webpack.config.js新增一个入口文件vendor和CommonsChunkPlugin插件进行公共模块的提取：

```javascript
const path = require('path');
const webpack = require('webpack');
const packagejson = require('./package.json');
module.exports = {
    // 入口
    entry: {
        "main1": './src/main1.js',
        "main2": './src/main2.js',
        "vendor": Object.keys(packagejson.dependencies) //获取生产环境依赖的库
    },
    //出口
    output: {
        path: path.resolve('./dist'), //相对转绝对
        filename: '[name].js'
    },
    watch: true, //文件监视改动 自动产出build.js
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            filename: '[name].js'
        })
    ]
}
```

查看dist目录，新增了一个vendor.js的文件

打包信息：

![image-20180924224013776](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924224013776.png)

通过查看vendor.js文件，发现main1.js和main2.js文件中依赖的vue和common.js都被打包进vendor.js中，同时还有webpack的运行文件。总的来说，我们初步的目的达到，提取公共模块，但是它们都在同一个文件中。

到这里，肯定有人希望自家的vendor.js纯白无瑕，只包含第三方库，不包含自定义的公共模块和webpack运行文件，又或者希望包含第三方库和公共模块，不包含webpack运行文件。

其实，这种想法是对，特别是分离出webpack运行文件，因为每次打包webpack运行文件都会变，如果你不分离出webpack运行文件，每次打包生成vendor.js对应的哈希值都会变化，导致vendor.js改变，但实际上你的第三方库其实是没有变，然而浏览器会认为你原来缓存的vendor.js就失效，要重新去服务器中获取，其实只是webpack运行文件变化而已，就要人家重新加载，好冤啊~

###### 单独分离出第三方库、自定义公共模块、webpack运行文件

这里我们分两步走：

1. 先单独抽离出webpack运行文件
2. 接着单独抽离第三方库和自定义公共模块

**（1）抽离webpack的运行文件**

修改webpack配置文件

```javascript
 plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            filename: '[name].js',
        })
```

其实上面这段代码，等价于下面这段：

```javascript
 plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),
    ]
```

上面两段抽离webpack运行文件代码的意思是创建一个名为runtime的commons chunk进行webpack运行文件的抽离，其中source chunks是vendor.js。

查看dist目录下，新增了一个runtime.js的文件，其实就是webpack的运行文件



再来查看一下命令行中webpack的打包信息，你会发现vendor.js的体积已经减小，说明已经把webpack运行文件提取出来了：

![image-20180924224404680](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924224404680.png)

可是，vendor.js中还有自定义的公共模块common.js，人家只想vendor.js拥有项目依赖的第三方库而已（这里是jquery），这个时候把minChunks这个属性引进来。

minChunks可以设置为数字、函数和Infinity，**默认值是2，并不是官方文档说的入口文件的数量**，下面解释下minChunks含义：

- 数字：模块被多少个chunk公共引用才被抽取出来成为commons chunk
- 函数：接受 (module, count) 两个参数，返回一个布尔值，你可以在函数内进行你规定好的逻辑来决定某个模块是否提取成为commons chunk
- Infinity：**只有当入口文件（entry chunks） >= 3 才生效，用来在第三方库中分离自定义的公共模块**

**(2) 抽离第三方库和自定义公共模块**

minChunks设为Infinity，修改webpack配置文件如下

```javascript
plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['main1','main2']//从first.js和second.js中抽取commons chunk
        }),
    ]
```

查看dist目录下，新增了一个common.js的文件：

![image-20180924225354427](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924225354427.png)

再来查看一下命令行中webpack的打包信息，自定义的公共模块分离出来：

![image-20180924225428549](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180924225428549.png)

这时候的vendor.js就纯白无瑕，只包含第三方库文件，common.js就是自定义的公共模块，runtime.js就是webpack的运行文件。

#### webpack异步加载的原理

webpack ensure 有人称它为异步加载，也有人说做代码切割。其实说白了，它就是把js模块给独立导出一个.js文件的，然后使用这个 模块的时候，webpack会构造script dom元素，由浏览器发起异步请求这个js文件。



webpack.ensure的原理：

它就是 **把一些js模块给独立出一个个js文件，然后需要用到的时候，在创建一个script对象，加入 到document.head对象中即可**，浏览器会自动帮我们发起请求，去请求这个js文件，在写个回调，去 定义得到这个js文件后，需要做什么业务逻辑操作。



main.js依赖三个js

- A.js是封装aBtn按钮点击后，才执行的业务逻辑
- B.js是封装bBtn按钮点击后，才执行的业务逻辑
- vue.js是封装了main.js需要利用的包



针对上面的需求，**优化方案**

 假设 A.js B.js   vue.js都是非常大的文件 因为 A.js B.js  都不是main.js必须有的，即未来可能发生的操作，那么我们把 他们利用异步加载，当发生的时候再去加载就行了

vue.js.js是main.js立即马上依赖的工具箱。但是它又非常的大，所以将其配置打包成一个公共模块， 利用浏览器的并发加载，加快下载速度。ok,构思完成，开始实现。

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<div id="app"></div>
	<button id="aBtn">Abtn</button>
	<br>
	<button id="bBtn">Bbtn</button>
	
</body>
</html>
```

定义了两个button

然后看看 main.js

```javascript
import Vue from 'vue'
console.log(Vue);
document.getElementById('aBtn').onclick = function(){
	require.ensure(['./B.js'],function(){
		var A = require('./A.js');
		alert(A.data);
		//异步里面再导入同步模块--实际是使用同步中的模块
		var Vue1 = require('vue');
	})
}
document.getElementById('bBtn').onclick = function(){
	require.ensure([],function(){

		var B = require('./B.js');
		alert(B.data);

	})
}
```

可以看到，A.js， B.js 都是点击后才ensure进来的。什么时候加载完成呢？ 就是 require.ensure() 第二个函数参数，即回调函数，它表示当下载js完成后，发生的。



webpack打包后，形成

![image-20180925200630629](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180925200630629.png)



#### webpack-dev-server

###### 下载模块

1.```npm install webpack-dev-server --save-dev```

常用配置参数

--open 自动打开浏览器

--hot 热更新 ，不在刷新的情况下替换 css样式

--inline  自动刷新

--port 9999 指定端口

--process 显示编译进度

###### 在package.json文件中配置

![image-20180920230626538](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180920230626538.png)

###### 直接执行 ```npm run dev```







#### es6的解析

###### 模块介绍

```babel-core```:

`javascript babel-core的作用是把js代码分析成ast（抽象语法树），方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js`

abel转译器本身，提供了babel的转译API，如babel.transform等，用于对代码进行转译。像webpack的babel-loader就是调用这些API来完成转译过程的。

```babel-loader```:

在将es6的代码transform进行转义，就是通过babel-loader来完成	

```babel-preset-env```

如果要自行配置转译过程中使用的各类插件，那太痛苦了，所以babel官方帮我们做了一些预设的插件集，称之为preset，这样我们只需要使用对应的preset就可以了。以JS标准为例，babel提供了如下的一些preset：

- es2015
- es2016
- es2017
- env
   es20xx的preset只转译该年份批准的标准，而env则代指最新的标准，包括了latest和es20xx各年份
   另外，还有 stage-0到stage-4的标准成形之前的各个阶段，这些都是实验版的preset，建议不要使用。

```babel-plugin-transform-runtime```

Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。

参考链接：https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1 看这个回答，说的非常详细。

###### 安装模块

```npm install babel-core babel-loader babel-preset-env babel-plugin-transform-runtime -D``` 

###### 在webpack-dev-config.js配置

```javascript
loader:[
    {
		// 处理es6,7,8
		test:/\.js$/,
		loader:'babel-loader',
		options:{
			presets:['env'],//处理关键字
			plugins:['transform-runtime'],//处理函数
		}
    }
]
```

配置完成之后执行 ```npm run dev```

发现！！！！！

![image-20180920013826881](/var/folders/7b/sz6pt5jd3y3b51q1ngm_8pph0000gn/T/abnerworks.Typora/image-20180920013826881.png)

解决：

排除不包含node_modules的路径，然后再配置文件中修改

```javascript
loader:[
    {
		// 处理es6,7,8
		test:/\.js$/,
		loader:'babel-loader',
         exclude:/node_modules/,
		options:{
			presets:['env'],//处理关键字
			plugins:['transform-runtime'],//处理函数
		}
    }
]
```

也会发现，当排除掉node_modules文件中的es6代码编译后，编译的时间也快了
以前出错的，3601毫秒的时候就开始出错了。。。。

排除掉node_modules之后



#### 单文件引入

###### 下载包

```npm install vue-loader@14.1.1 vue-template-compiler@2.5.17 -D```

###### 创建App.vue文件

```javascript
//组件的模板结构
<template>
	<div>
		{{ text }}
	</div>
</template>

//组件的业务逻辑
<script>
export default {
	data(){
		return {
			text:'hello Single file'				
		}
	}
}
</script>
//组件的样式
<style>
	body{
		background-color: green;
	}
</style>
```

###### 创建入口文件main.js

```javascript
import Vue from 'vue';
import App from './App'
new Vue({
	el:'#app',
	//Render函数是Vue2.x版本新增的一个函数；
	// 使用虚拟dom来渲染节点提升性能，因为它是基于JavaScript计算。
	// 通过使用createElement(h)来创建dom节点。createElement是render的核心方法。其Vue编译的时候会把template里面的节点解析成虚拟dom；
	render:c=>c(App)
	// components:{
	//  	App
	// },
	// template:`<App />`
});

```

###### webpack.dev.config.js文件配置

```javascript
// 处理Vue文件
{
	test:/\.vue$/,
	loader:'vue-loader'
}
```









