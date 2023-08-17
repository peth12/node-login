const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Connection 

mongoose.connect('mongodb+srv://admin:admin@cluster0.tm4snbi.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null


// Controller 
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/longinController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logout');
const homeController = require('./controllers/homeController');


// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(expressSession({
    secret: 'node secret'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')





// route
app.get('/',  indexController);
app.get('/home',authMiddleware,  homeController);
app.get('/login', redirectIfAuth , loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth , loginUserController);
app.get('/logout', logoutController);



app.listen(4000, () => {
    console.log('App listen on part 4000');
})