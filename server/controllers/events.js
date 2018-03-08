const Event = require('../models').Event;

function pgFormatDate(date) {
  /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate()), zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(" ");
}

module.exports = {
  create(req, res) {
    return Event
      .create({
        title: req.body.title,
      })
      .then(event => {
        /*const query_text = 'INSERT INTO \"Events\" VALUES($1, $2, $3::timestamptz, $4::timestamptz);';
     		const query_values = [1, event.title, pgFormatDate(Date()), pgFormateDate(Date())];

        console.log(Date());
        //console.log("Reached here");

     		client.query(query_text, query_values, (err, resp) => {
     			if(err) { 
     				res.status(400).send(err);
     			}
     			else {
     				//client.end();
     				res.status(201).send(resp);
     			}*/
          res.status(201).send(event);
     		})
   		//res.status(201).send(event)
   			/*.then(event => res.status(201).send(event))
   			.catch(error => res.status(400).send(error));*/
      	//res.status(201).send(event)
      .catch(error => res.status(400).send(error));


   
  },
  
  read(req, res) {
    //const query_text = 'SELECT * FROM \"Events\" ORDER BY ID; ';

    /*client.query(query_text, (err, resp) => {
        if(err) {
          res.status(400).send(err)
        }
        else
        {
          results = []
          resp.rows.forEach(function(row) {
            results.push(row);
          });
          res.status(201).send(results);
        }
    })*/
    return Event
            .findById(req.params.id)
            .then(event => {
              res.status(201).send(event);
            }).catch(error => {
              res.status(400).send(error);
            });
  },
  
  delete(req, res) {
    /*const query_text = 'DELETE FROM \"Events\" WHERE id=$1';
    const query_values = [req.params.id]

    client.query(query_text, query_values, (err, resp) => {
      if(err) {
        res.status(400).send(err)
      }
      else
      {
        res.status(201).send(resp)
      }
    });*/
    return Event.findById(req.params.id)
        .then(event => {
          event.destroy();
          console.log("Deleted Successfully");
          res.status(201).send(event);
        }).catch(error => {
          res.status(400).send(error);
        })
  }, 

  update(req, res) {
    /*const query_text = 'UPDATE \"Events\" SET title=$1 WHERE id=$3; ';
    //const query_values = [req.body.title, Date(), req.params.id];
    const query_values = [req.body.title, Date(), req.params.id];
    //console.log(query_text, query_values);

    client.query(query_text, query_values, (err, resp) => {
      if(err) {
        res.status(400).send(err);
      }
      else
      {
        res.status(201).send(resp);
      }
    });*/
    return Event.findById(req.params.id)
          .then(event => {
            event.set('title', req.body.title);
            event.set('updatedAt', Date());
            event.save();
            res.status(201).send(event);
          })
          .catch(error=> {
            res.status(400).send(error);
          });
  }
}