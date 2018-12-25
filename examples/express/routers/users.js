const { Router } = require('express');
const path = require('path');
const router = Router();

router.get(
    '/users',
    (req, res, next) => {
        req.user = { name: 'jerry', password: '123' }
        if (req.user) return next();
        res.redirect('/login');
    },
    (req, res, next) => {
        try {
            res.sendFile(path.resolve(__dirname, '../views/users.html'));
        } catch (err) {
            console.log(err)
            next(new Error(505));
        }
    }
)

router.get(/users/, (req, res) => {
    res.send('/users/***')
})

module.exports = router;