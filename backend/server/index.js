const express = require("express");
const pg = require("pg");
const PORT = process.env.PORT || 3001;

const app = express();

/* connect to DBeaver Database */
const conString =
  process.env.ELEPHANTSQL_URL ||
  "postgres://uppxlpjk:ic5WpkEt-1NjAu3AedGlt96QZKrQ6Y-x@castor.db.elephantsql.com/uppxlpjk";

const client = new pg.Client(conString);

client.connect(function (err) {
  console.log("database");
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});
/* connect to DBeaver Database */

//Get a candle by Id
app.get("/candles/:id", (req, res) => {
  console.log("GET /candles/ITEMID");
  const itemID = Number(req.params.id);
  client.query(
    `SELECT * from itemss WHERE id = $1;`,
    [itemID],
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(result);
      res.json({ data: result.rows[0] });
    }
  );
});

//Get all candles
app.get("/candles", (req, res) => {
  console.log("GET /candles");
  client.query(`SELECT * from itemss;`, function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    res.json({ data: result.rows });
  });
});

//Get all favourites
app.get("/favourites", (req, res) => {
  console.log("GET /candles/favourites");
  client.query(
    `SELECT * from itemss WHERE is_favourite = $1;`,
    [true],
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(result.rows);
      res.json({ data: result.rows });
    }
  );
});

app.post("/candles/:id", (req, res) => {
  console.log("GET /candles/:itemId")
  const itemID = Number(req.params.id);
  client.query(`UPDATE itemss SET is_favourite = $1 WHERE id = $2;`, [true, itemID], function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    res.json({data: result.rows})
  })

})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
