const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const connectSession =require('connect-session-sequelize');
const dotenv = require('dotenv');
const sequelize  = require('./models').sequelize;
const app = express();
const SequelizeStore = connectSession(session.Store);

dotenv.config();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*Passport Stuff*/
app.use(cookieParser());
app.use(session({secret: 'key', resave: true, saveUninitialized: true, 
	store: new SequelizeStore({
      db: sequelize,
    })
}));//NEED TO USE CONFIG FILE LATER
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Interview scheduler',
}));

module.exports = app;