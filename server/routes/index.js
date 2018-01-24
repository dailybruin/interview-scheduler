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

    /* Routes for google oauth */
    app.get('/auth/google',
	  passport.authenticate('google', {
	    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
	    hd: 'g.ucla.edu',
	  })
	);

	app.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/'}),
	  function(req, res) {
		    res.redirect('/');
	});


	/* Example to test to make sure user is logged in, gets the user calendar*/
	app.get('/api/calendar', usersController.isAuthenticated, usersController.getCalendar);
};


//need to see when to refresh the google oauth token too