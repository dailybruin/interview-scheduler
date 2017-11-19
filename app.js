const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Interview scheduler',
}));

module.exports = app;