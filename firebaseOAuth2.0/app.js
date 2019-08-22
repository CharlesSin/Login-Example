var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require('firebase-admin');
var serviceAccount = require('./serviceaccount.json')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://javascript-example-1993.firebaseio.com",
  apiKey: "AIzaSyAfKjEDn3F_1kyMeqbXdax0KaETXEXyo8k",
  authDomain: "javascript-example-1993.firebaseapp.com",
  databaseURL: "https://javascript-example-1993.firebaseio.com",
  projectId: "javascript-example-1993",
  storageBucket: "",
  messagingSenderId: "1092092685468",
  appId: "1:1092092685468:web:408dd1e9aa031fee"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// set up session
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var identityKey = 'skey';
app.set('trust proxy', 1) // trust first proxy

app.use(session({
  name: identityKey,
  secret: 'charles', // 用來對session id相關的cookie進行簽名
  store: new FileStore(), // 本地儲存session（文字檔案，也可以選擇其他store，比如redis的）
  saveUninitialized: false, // 是否自動儲存未初始化的會話，建議false
  resave: false, // 是否每次都重新儲存會話，建議false
  cookie: {
    maxAge: 3600 * 1000 // 有效期，單位是毫秒 1hour
    // expires: expiryDate
  }
}));

/* GET home page. */
app.get('/', function (req, res, next) {
  var sess = req.session;
  var loginUser = sess.userEmail;
  var usertokenID = sess.tokenID;
  var name = sess.loginUser;
  var uid = sess.userEmail;
  var isLogined = !!loginUser;

  res.render('index', {
    title: 'Express',
    isLogined: isLogined,
    tokenID: usertokenID,
    name: loginUser || '',
    userID: uid || '',
    name: name || ''
  });
});

// Create authentication middleware
function isAuthenticated(req, res, next) {
  // check is user logged in
  // if they are, attach them to the request object and call next
  // if they are not, send them to the login pages
  // with a message saying : 'login!'

  var idToken = req.body.ids;
  // console.log({ idToken });
  // idToken comes from the client app
  firebase.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
      console.log({ decodedToken });
      let uid = decodedToken.uid;
      // ...
      console.log({ uid });
      if (uid) {
        req
          .session
          .regenerate(function (err) {
            if (err) {
              return res.json({ ret_code: 2, ret_msg: '登入失敗' });
            }
            //here for user id.
            req.session.tokenID = idToken;
            req.session.loginUser = decodedToken.name;
            req.session.userName = decodedToken.email;
            req.session.userEmail = uid;
            next();
          });
      } else {
        res.json({ ret_code: 1, ret_msg: '賬號或密碼錯誤' });
      }
    }).catch(function (error) {
      // Handle error
      console.log({ error });
      res.redirect('/');
    });
}

app.post('/home', isAuthenticated, function (req, res, next) {
  res.json({ ret_code: 0, ret_msg: '登入成功' });
  // res.render('index', { title: 'Express', isLogined: true });
});

app.get('/main', function (req, res, next) {
  res.render('index', { title: 'Express', isLogined: true });
});

// 退出登入
app.get('/logout', function (req, res, next) {
  // 備註：這裡用的 session-file-store 在destroy 方法裡，並沒有銷燬cookie 所以客戶端的 cookie 還是存在，導致的問題
  // --> 退出登陸後，服務端檢測到cookie 然後去查詢對應的 session 檔案，報錯 session-file-store 本身的bug
  req
    .session
    .destroy(function (err) {
      if (err) {
        res.json({ ret_code: 2, ret_msg: '退出登入失敗' });
        return;
      }
      // req.session.loginUser = null;
      res.clearCookie(identityKey);
      res.redirect('/');

    });
});

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
