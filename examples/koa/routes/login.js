const Router = require('koa-router');
const router = new Router();

router.get('/login', ctx => {
        ctx.body = 'Login Page!';
    })
    .post('/login', ctx => {
        ctx.body = {
            code: 200,
            msg: 'login success!'
        }
    })

module.exports = router;