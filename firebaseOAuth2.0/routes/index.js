var express = require('express');
var router = express.Router();
// set up session
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// var identityKey = 'skey';
// app.set('trust proxy', 1) // trust first proxy


/* GET home page. */
router.get('/', function (req, res, next) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  var usertokenID = sess.tokenID;
  var uid = session.userEmail;
  var isLogined = !!loginUser;

  res.render('index', {
    title: 'Express',
    isLogined: isLogined,
    tokenID: usertokenID,
    name: loginUser || '',
    userID: uid
  });
});

module.exports = router;
