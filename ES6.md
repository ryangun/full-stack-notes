# ES6

## let和const

- let用于变量声明，相对于var不会提升成全局变量

``` js
if(true){
    let a = 1; //这个a在外部无法访问
}
```

- const用于值不会改变的量（常量）的声明

``` js
// 变量
let num = 1;

// 常量
const PI = 3.14;
PI = 3.15; //报错

// 对象里面的东西可以改变
const obj = { name: 'jack' }
obj.name = 'rose'
obj = { name: 'rose' }	//报错
```



## 箭头函数

- 相对于function，ES6更简洁
- （左边）一个参数小括号可省

```js
// ES5
var fn = function (num) {
    return num
}

// ES6，（左边）一个参数小括号可省
let fn = (num) => {
    return num
}
```

- （右边）一行代码大括号可省

```js
// ES5
var fn = function (n1, n2) {
    return n1 + n2
}

// ES6
let fn = (n1, n2) => {
    return n1 + n2
}
// （右边）一行代码大括号可省
let fn = (n1, n2) => n1 + n2
```

- 箭头函数this会向上级函数绑定
- 同时arguments也向上绑定

``` js
var button = document.querySelector('button');

// ES5
var obj = {
    name: 'jack',
    init: function(){
        //这里的this是init的this，也是obj
        var that = this;
        button.onclick = function() {
            console.log(this); //这里的this是button
            console.log(that.name); //jack
        }
    }
}
obj.init();

// ES6
var obj = {
    name: 'jack',
    init: function() {
        button.onclick = () => {
            //箭头函数自身没有this，向上层function绑定this
            console.log(this); //这里的this是obj
            console.log(this.name); //jack
        }
    }
}
obj.init();
```

- 箭头函数本身没有this，会向上级function绑定this，因此，其不可以作为构造函数的使用

## promise

promise有三种状态，该状态一经改变，无法回退和暂停：

- resolve调用=>resoleved/fullfilled，成功
- reject调用=>rejected，失败
- 没有调用这两种任意一个=>pending（初始状态），待发

promise是一个存储异步操作的容器，异步执行后，标记不同的成功/失败/发生中状态，后续根据状态控制异步执行顺序

```js
// ES5，回调地狱
$.ajax('/a', function(){
    //请求a后请求b
    $.ajax('./b', function(){
        //请求b后的操作
	})
})

//ES6
new Promise(function(resolve, reject){
    //成功调用resolve(data)
    //失败调用reject(err)
}).then(function(data){
    //成功对应的代码
}, function(err){
	//失败对应的代码
})
```

## 解构赋值

```js
let obj = {a: 1, b: 2, c: 3}
let a = obj.a；
let b = obj.b;

//等同于
let obj = {a: 1, b: 2, c: 3}
let {a, b} = obj; //a:1, b:2 关键是key

let arr = [1, 2, 3, 4];
let [a,,,d] = arr; //a:1, d:4 关键是顺序
```



