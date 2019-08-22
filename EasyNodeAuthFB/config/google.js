var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "350017973878-dq4b6h5n967quadpsi3e4ag9secqap3p.apps.googleusercontent.com",
    clientSecret: "lkG8cEoUnZ6MfFemsLHSYhRL",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile.emails[0].value);
        return done(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;