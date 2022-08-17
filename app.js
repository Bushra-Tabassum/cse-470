const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require("./utils/appError");
const session = require('express-session');
const authController = require('./controllers/authController');
const viewRouter = require('./routes/viewRouter');
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.post('/signup', authController.signup);
app.get('/login', (req, res, next) => {
    res.render('login')
});
app.post('/login', authController.logIn);
app.use((req, res, next) => {
    if (req.path.startsWith('/login') && req.method === 'POST') {
        next();
    } else if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
})
app.use('/', viewRouter);
// app.use('/api/v1/schedule', scheduleRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;