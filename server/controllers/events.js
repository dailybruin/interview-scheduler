const Event = require('../models').Event;

const { Client, Query } = require('pg')
const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'events',
  password: 'password',
  port: 5432,
})
client.connect()

module.exports = {
  create(req, res) {
    return Event
      .create({
        title: req.body.title,
      })
      .then(event => {
        const query_text = 'INSERT INTO \"Events\" VALUES($1, $2, $3::timestamptz, $4::timestamptz);';
     		const query_values = [1, event.title, Date(), Date()];

        //console.log("Reached here");

     		client.query(query_text, query_values, (err, resp) => {
     			if(err) { 
     				res.status(400).send(err);
     			}
     			else {
     				//client.end();
     				res.status(201).send(resp);
     			}
     		})
   		//res.status(201).send(event)
   			/*.then(event => res.status(201).send(event))
   			.catch(error => res.status(400).send(error));*/
      	//res.status(201).send(event)
      })
      .catch(error => res.status(400).send(error));


   
  },
  
  read(req, res) {
    const query_text = 'SELECT * FROM \"Events\" ORDER BY ID; ';

    client.query(query_text, (err, resp) => {
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
    })
  },
  
  delete(req, res) {
    const query_text = 'DELETE FROM \"Events\" WHERE id=$1';
    const query_values = [req.params.id]

    client.query(query_text, query_values, (err, resp) => {
      if(err) {
        res.status(400).send(err)
      }
      else
      {
        res.status(201).send(resp)
      }
    });
  }, 

  update(req, res) {
    const query_text = 'UPDATE \"Events\" SET title=$1 WHERE id=$3; ';
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
    });
  }
}