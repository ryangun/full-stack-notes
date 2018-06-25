# 模块化

## 1、sea.js、require.js	
- 民间—野路子
- CMD、AMD
- 模块.js	define require/exports/module
- 前台.html	use

``` js
// 模块.js
define(function(require, exports, module){
	require('2.js') // 难点
})
```
``` js
// 前台.html
seajs.use('lib/1.js', function(mod){})
```

## 2、node.js
- 语言自身—半官方半野路
- require/exports/module
- node_modules ./

## 3、ES6
- 官方
- export/import
- babel-es6
- webpack—一站式

generator的本质：语法糖

``` js
function *show(){
	let a = 12;
	let data1 = yield $.ajax('1.txt');
	
	let b = 5;
	let data2 = yield $.ajax('2.txt');
	
	return a+b;
}
```
编译成：

``` js
function show(){
	let a = 12;
	$.ajax('1.txt').then(res=>{
		let data1 = res;
		
		let b = 5;
		$.ajax('2.txt').then(res=>{
			let data2 = res;
			
			return a+b;
		})
	})
}
```

promiss原理：状态机

- 1.当状态改变的时候，调用之前挂起的then队列
- 2.当then的时候，直接执行对应函数，并把参数给人家 

实现一个Promise

```
class Promise2 {
    constructor(fn) {
        const _this = this;
        // 重点
        this.__queue = [];

        this.__succ_res = null;
        this.__erro_res = null;
        this.status = '';

        fn(function(...arg) {
            _this.__succ_res = arg;
            _this.status = 'succ';

            _this.__queue.forEach(json => {
                json.fn1(...arg);
            })
        }, function(...arg) {
            _this.__erro_res = arg;
            _this.status = 'error';

            _this.__queue.forEach(json => {
                json.fn2(...arg);
            })
        });
    }

    then(fn1, fn2) {
        if (this.status == 'succ') {
            fn1(...this.__succ_res);
        } else if (this.status == 'error') {
            fn2(...this.__erro_res);
        } else {
            this.__queue.push({ fn1, fn2 })
        }
    }
}

Promise2.all = function(arr) {
    let result = [];

    return new Promise2((resolve, reject) => {
        let i = 0;
        let next = function() {
            arr[i].then(function(res) {
                result.push(res);

                i++;
                if (i == arr.length) {
                    resolve(result)
                } else {
                    next();
                }
            }, function(res) {
                reject(res)
            })
        }
        next();
    })
}
```

调用：

``` js
let p = new Promise2((resolve, reject)=>{
  setTimeout(function(){
    resolve(15);
  }, 1000)
});
p.then((res)=>{
  console.log(res)
}, (res)=>{
  alert('失败')
})

Promise2.all([
    $.ajax({ url: 'data/1.txt', dataType: 'json' }),
    $.ajax({ url: 'data/2.txt', dataType: 'json' })
]).then((arr) => {
    console.log(arr);
}, (arr) => {
    alert('失败')
})
```