const passport   = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models").User;
const axios = require("axios");

const callbackURL = "http://127.0.0.1:8000/auth/google/callback";

//callback url
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: "795629014976-l56265d1lb0mf6l9nf03pl8oikbhlkm9.apps.googleusercontent.com",//take these out later USE .ENV FILE LATER
    clientSecret: "dKyCbJiVwRAcXItOl-56vtKN",//take out later
    callbackURL: callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    //discuss if we should store refresh tokens
    if (profile._json.domain === 'g.ucla.edu') {
      const [user] = await User.findOrCreate({
        where: { id: profile.id },
      });
      console.log('\n\n',  profile.displayName, accessToken);
      user.name = profile.displayName;
      user.token = accessToken;
      await user.save();
      return done(null, user);
    } else {
      done(new Error('Invalid host domain.'));
    }
  }
));

module.exports = {
  isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
  },
  getCalendar(req, res, next) {
      var AuthStr = "Bearer " + req.user.token;
      axios.get("https://www.googleapis.com/calendar/v3/users/me/calendarList", { 'headers': { 'Authorization': AuthStr}})
      .then(response => res.status(201).send(response.data))
      .catch(error => res.status(400).send(error));
  }
}