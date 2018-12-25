const Koa = require('koa')
const render = require('koa-art-template')
const path = require('path')

const app = new Koa()

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  //获取环境变量中的NODE_ENV
  //debug: true 开发环境 => 1、不压缩、不混淆、实时更新静态页面
  //debug: false 生产环境 => 1、压缩、混淆、不实时更新静态页面
  debug: process.env.NODE_ENV !== 'production'
});

app.use((ctx, next) => {
	ctx.render('index.html', {
		msg: '你们好'
	})  //响应数据
})  

app.listen(8888, ()=>{
	console.log('服务器启动在8888端口')
})