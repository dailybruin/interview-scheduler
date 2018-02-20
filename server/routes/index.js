const eventsController = require('../controllers').events;
const express = require('express')
var app = express()
const { Client, Query } = require('pg')
const router = express.Router()

module.exports = (app) => {
    app.get('/api', (req, res ) => res.status(200).send({
        message: 'Interview scheduler API',
    }));

    app.post('/api/events', eventsController.create);

    app.get('/api/events/', eventsController.read);

    app.delete('/api/events/:id', eventsController.delete);

    app.put('/api/events/:id', eventsController.update);
};


