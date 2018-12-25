module.exports = () => {
    return async(ctx, next) => {
        if (ctx.session.userInfo) {
            await next();
            return;
        }
        ctx.redirect('/login');
    }
}