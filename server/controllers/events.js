const Event = require('../models').Event;

module.exports = {
  create(req, res) {
    return Event
      .create({
        title: req.body.title,
      })
      .then(event => {
      	res.status(201).send(event);
      })
      .catch(error => res.status(400).send(error));
  },
  /* DELETE LATER, test api for events */
  list(req, res) {
  	console.log("requesting events");
  	return Event
	  .findById(1)
	  then(event => {
      	res.status(201).send(event);
      })
      .catch(error => res.status(400).send(error));
  },
}