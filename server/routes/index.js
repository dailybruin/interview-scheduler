const eventsController = require('../controllers/events');//.events;
const usersController = require('../controllers/users');//.users;
const passport = require("passport");//delete later if needed
const Event = require('../models').Event;
const User = require('../models').User;
const UserEvent = require('../models').UserEvent;

// Event.belongsToMany(User, {through: UserEvent, as: "user"});
// User.belongsToMany(Event, { through: UserEvent, as: 'event' });
const express = require('express');
var app = express();
const { Client, Query } = require('pg');
const router = express.Router();

module.exports = (app) => {

	/* Temp to link to google oauth */
	app.get('/', (req, res ) => {
		console.log("homepage");
		res.status(200)
		.write('<a href="./auth/google">aaaaaaaaaaaaaaaaaa</a>');
		res.end();
	});

    app.get('/api', (req, res ) => res.status(200).send({
        message: 'Interview scheduler API',
    }));

    /* Routes for google oauth and passport*/
    app.get('/auth/google',
	  	passport.authenticate('google', {
	    	scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
	    	hd: 'g.ucla.edu',
		}),
		function(req, res) {
		    // Explicitly save the session before redirecting!
		    req.session.save(() => {
		      	res.redirect('/success');
		    })
		}
	);

	app.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/'}),
	  function(req, res) {
	  	 req.session.save(() => {
	      res.redirect('/api/calendar');
	    })
	});
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	/* Test api for calenedar editting */
	/* Example to test to make sure user is logged in, gets the user calendar*/
	app.get('/api/calendar', usersController.isAuthenticated, usersController.getCalendar);
	//returns calendar list of stuff
	app.get('/api/calendar/:calendarID', usersController.isAuthenticated, usersController.getCalendarID); 
	app.get('/api/calendar/:calendarID/events', usersController.isAuthenticated, usersController.getCalendarIDEvents);
	app.post('/api/calendar/:calendarID/events', usersController.isAuthenticated, usersController.insertCalendarIDEvents);
	/* Get your weekly schedule */
	app.get('/api/schedule', usersController.isAuthenticated, usersController.getSchedule);
	// app.post('/api/schedule', usersController.isAuthenticated, usersController.updateSchedule);




	app.post('/api/schedule', usersController.updateSchedule);//delete later bc auth


	/* Test api for events */
    // app.post('/api/events', eventsController.create);

    // app.get('/api/events', eventsController.list);

	//test for associations
	app.get('/test/associate', function(req, res) {
		Event
	      .create({
	        title: "1",
	      })
	      .then(event => {
	      	event.addUser(req.user.id);
	      	res.status(201).send(event);
	      })
	      .catch(error => res.status(400).send(error));

	});
	app.get('/test/associate1', function(req, res) {
		Event
		.create({
			title: "2",
		})
		.then(event => {
			event.addUser(req.user.id, { through : { interviewer: "1" }});
			res.status(201).send(event);
		})
		.catch(error => res.status(400).send(error));

	});

	//get all events that user belongs to
	app.get('/test/events', usersController.isAuthenticated, function(req, res, next) {
		User.findById(req.user.id, {
			include: [{model: Event, as: 'event'}]
		})
	 	.then(res.send.bind(res))
	    .catch(error => res.status(400).send(error));
	});

	app.get('/test/users', function(req, res, next) {
		Event.findAll({
			include: [{all: true}]
		})
		.then(events => {
	      	res.status(201).send(events);
	    })
	    .catch(error => res.status(400).send(error));
	});

	app.post('/api/events', eventsController.create);

    app.get('/api/events/', eventsController.read);

    app.delete('/api/events/:id', eventsController.delete);

    app.put('/api/events/:id', eventsController.update);

};

