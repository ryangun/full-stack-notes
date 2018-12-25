const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use(async(ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set("Access-Control-Allow-Headers", 'content-type');
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async ctx => {
        console.log('get ok!')
        ctx.body = {
            code: 200,
            msg: 'get ok!'
        };
    })
    .post('/add', async ctx => {
        ctx.req.on('data', data => {
            console.log(data.toString());
        });
        ctx.body = {
            code: 200,
            msg: 'post ok!'
        };
    })

router.get('/login', async ctx => {
        ctx.body = 'Login Page!'
    })
    .post('/login', async ctx => {
        ctx.req.on('data', data => {
            console.log(data.toString());
        })
        ctx.body = {
            code: 200,
            token: '1111',
            msg: 'login ok!'
        }
    })

app.listen(8888, () => {
    console.log('Server is running !')
})