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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*Passport Stuff*/

app.use(session({secret: 'key', resave: true, saveUninitialized: false, 
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


/*const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'events',
  password: 'password',
  port: 5432,
})
client.connect()

// Create an Event (using POST)

router.post('/api/events', (req, res, next) =>{

	const results = [];
	// Grab data from http request

	const data = {name: "Interview 1", start: 4};

	const query_text = 'INSERT INTO events_table(name, start) VALUES($1, $2)';
	const query_values = [data.name, data.start]

	client.query(query_text, query_values, (err, res) => {
		if(err)
		{
			// some error in selecting items
			console.log(err.stack);
		}
		else
		{
			const query_to_order = client.query('SELECT * FROM events_table ORDER BY id asc');

			query_to_order.on('row', (row) => {
				results.push(row);
			});

			query.on('end', () => {
				done();
				return res.json(results);
			})

		}

	})
});
*/