const Router = require('koa-router');
const checkLogin = require('../middlewares/checkLogin');
const router = new Router();

router.use(checkLogin());

router.get('/', (ctx, next) => {
    ctx.body = 'Index Page!'
})

router.get('/users', (ctx, next) => {
    ctx.body = 'Users Page!'
})

module.exports = router;