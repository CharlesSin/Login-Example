var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
    clientID: "1239066216296472",
    clientSecret: "47da7c4da8781d1c499ea0bb48bb06bd",
    callbackURL: "http://localhost:3000"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ name: profile.displayName }, { name: profile.displayName, userid: profile.id }, function (err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

module.exports = passport;