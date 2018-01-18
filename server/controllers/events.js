const Event = require('../models').Event;

module.exports = {
  create(req, res) {
    return Event
      .create({
        title: req.body.title,
      })
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  }
}