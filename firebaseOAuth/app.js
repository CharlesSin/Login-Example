const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mean-social', { useMongoClient: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfKjEDn3F_1kyMeqbXdax0KaETXEXyo8k",
  authDomain: "javascript-example-1993.firebaseapp.com",
  databaseURL: "https://javascript-example-1993.firebaseio.com",
  projectId: "javascript-example-1993",
  storageBucket: "",
  messagingSenderId: "1092092685468",
  appId: "1:1092092685468:web:408dd1e9aa031fee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
