const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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