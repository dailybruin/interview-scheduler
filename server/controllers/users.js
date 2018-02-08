const passport   = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models").User;
const axios = require("axios");

const callbackURL = "http://127.0.0.1:8000/auth/google/callback";

//callback url
passport.serializeUser((user, done) => {
  console.log("serializing user");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("\n\n\ndeserializing user");
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
      console.log('\n\n',  user);
      user.name = profile.displayName;
      user.token = accessToken;
      await user.save();
      return done(null, user);
    } else {
      done(new Error('Invalid host domain.'));
    }

  }
  // function(token, refreshToken, profile, done) {
  //   process.nextTick(function() {
  //             // try to find the user based on their google id
  //     User.findOne({ 'google.id' : profile.id }, function(err, user) {
  //          if (err)
  //             return done(err);

  //                 if (user) {

  //                     // if a user is found, log them in
  //                     return done(null, user);
  //                 } else {
  //                     // if the user isnt in our database, create a new user
  //                     var newUser          = new User();

  //                     // set all of the relevant information
  //                     newUser.google.id    = profile.id;
  //                     newUser.google.token = token;
  //                     newUser.google.name  = profile.displayName;
  //                     newUser.google.email = profile.emails[0].value; // pull the first email

  //                     // save the user
  //                     newUser.save(function(err) {
  //                         if (err)
  //                             throw err;
  //                         return done(null, newUser);
  //                     });
  //                 }
  //             });
  //       });
  // }
));

module.exports = {
  isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      console.log(req.user);
      res.redirect('/login');
  },
  getCalendar(req, res) {
      var AuthStr = "Bearer " + req.user.token;
      axios.get("https://www.googleapis.com/calendar/v3/users/me/calendarList", { 'headers': { 'Authorization': AuthStr}})
      .then(response => res.status(201).send(response.data))
      .catch(error => res.status(400).send(error));
  },
  getPrimaryCalendar(req, res) { //pass in paramter instead of primary
      console.log("\n\n", req.user.id);
      var AuthStr = "Bearer " + req.user.token;
      axios.get("https://www.googleapis.com/calendar/v3/calendars/" + req.params.calendarID, { 'headers': { 'Authorization': AuthStr}})
      .then(response => res.status(201).send(response.data))
      .catch(error => res.status(400).send(error));
  },
  getPrimaryCalendarEvents(req, res) { //pass in paramter instead of primary
      var AuthStr = "Bearer " + req.user.token;
      axios.get("https://www.googleapis.com/calendar/v3/calendars/" + req.params.calendarID + "/events", { 'headers': { 'Authorization': AuthStr}})
      .then(response => res.status(201).send(response.data.items))
      .catch(error => res.status(400).send(error));
  },
  getSchedule(req, res) {
    return User
      .findAll({where: {id:req.user.id}})
      .then(user => {
        res.status(201).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
}