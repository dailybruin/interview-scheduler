const eventsController = require('../controllers/events');//.events;
const usersController = require('../controllers/users');//.users;
const passport = require("passport");//delete later if needed

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


    /* Test api for events */
    app.post('/api/events', eventsController.create);

    app.get('/api/events', eventsController.list);


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
	app.get('/api/calendar/:calendarID', usersController.isAuthenticated, usersController.getPrimaryCalendar); 
	app.get('/api/calendar/:calendarID/events', usersController.isAuthenticated, usersController.getPrimaryCalendarEvents);
	/* Get your weekly schedule */
	app.get('/api/schedule', usersController.isAuthenticated, usersController.getSchedule);

};


//need to see when to refresh the google oauth token too