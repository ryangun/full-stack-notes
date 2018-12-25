const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'))
})

router.post('/login', (req, res) => {
    console.log(req.body)
    res.json({
        code: 200,
        msg: '登录成功!'
    })
})

module.exports = router;