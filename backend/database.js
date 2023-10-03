const pg = require('pg');
//or native libpq bindings
//const pg = require('pg').native

const conString = process.env.ELEPHANTSQL_URL || "postgres://uppxlpjk:ic5WpkEt-1NjAu3AedGlt96QZKrQ6Y-x@castor.db.elephantsql.com/uppxlpjk";

const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * from adminss;', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);

    client.end();
  });
});