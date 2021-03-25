const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const config = require("../config/config");
const { IP, PORT, FB_CLIENT_ID, FB_CLIENT_SECRET } = config;

passport.use(
  new FacebookStrategy(
    {
      clientID: `${FB_CLIENT_ID}`,
      clientSecret: `${FB_CLIENT_SECRET}`,
      callbackURL: `http://${IP}:${PORT}/auth/facebook/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { name: profile.displayName },
        { name: profile.displayName, userid: profile.id },
        function (err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);

module.exports = passport;
