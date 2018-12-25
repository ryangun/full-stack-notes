const Vue = require('vue');
const express = require('express')();
const renderer = require('vue-server-renderer').createRenderer();

const app = new Vue({
    template: '<div>Hello World!</div>'
})

express.get('/', (req, res) => {
    renderer.renderToString(app, (err, html) => {
        if (err) return res.state(500).end('运行错误');

        res.send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Document</title>
            </head>
            <body>
              ${html}
            </body>
          </html>
        `)
    })
})

express.listen(8001, () => {
    console.log('服务已启动！')
})