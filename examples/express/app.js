const express = require('express');
const loginRouter = require('./routers/login');
const usersRouter = require('./routers/users');
const checkLogin = require('./middlewares/checkLogin');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${Date.now()} ${req.method} ${req.path}`)
    next();
})

app.use(checkLogin());

// app.use('/', loginRouter);
// app.use('/api', loginRouter);
app.use(loginRouter);
app.use(usersRouter);

app.get('/', (req, res) => {
    res.send('Home Page!')
})

app.use((req, res, next) => {
    let error = new Error('404')
    next(error);
})

app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.message == 404) return res.status(err.message).send('Page Not Found!');
    res.status(500).send('Something Error.')
})

/* app.use((req, res) => {
    res.send('Hello Express!')
}) */

// app.get('/', (req, res) => {
//     res.send('Home Page!')
// })

if (!module.parent) {
    app.listen(1234, () => {
        console.log('Server is running!')
    })
}

module.exports = app;