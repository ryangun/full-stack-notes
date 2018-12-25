module.exports = (uncheck = []) => {
    return (req, res, next) => {
        if (uncheck.indexOf(req.url.slice(1)) != -1 || req.user) return next();
        req.url = '/login';
        // res.redirect('/login');
        next();
    }
};