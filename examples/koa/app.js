const Koa = require('koa');
const session = require('koa-session');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const app = new Koa();

app.keys = ['Koa', 'learn'];

const CONFIG = {
    key: 'koa-sess',
    maxAge: 20 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true,
};

app.use(session(CONFIG, app));

app.use((ctx, next) => {
    console.log(`${Date.now()} ${ctx.method} ${ctx.path}`);
    next();
})

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

app.use((ctx, next) => {
    ctx.body = { 'name': 'jerry' };
})

app.listen(1234, () => {
    console.log('Server is running!')
})