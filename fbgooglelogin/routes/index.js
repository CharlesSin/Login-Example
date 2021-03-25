const express = require('express');
const router = express.Router();

/* LOGIN ROUTER */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;