const eventsController = require('../controllers').events;

module.exports = (app) => {
    app.get('/api', (req, res ) => res.status(200).send({
        message: 'Interview scheduler API',
    }));

    app.post('/api/events', eventsController.create);
};