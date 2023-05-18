//if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
//}
const express = require("express");
const pg = require("pg");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

/* connect to DBeaver Database */
const conString =
  process.env.ELEPHANTSQL_URL ||
  "postgres://uppxlpjk:ic5WpkEt-1NjAu3AedGlt96QZKrQ6Y-x@castor.db.elephantsql.com/uppxlpjk";

const client = new pg.Client(conString);

client.connect(function (err) {
  console.log("connected to database");
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});
/* connect to DBeaver Database */

app.post("/cart/itemId", (req, res) => {
  const itemId = parseInt(req.body.itemId);
  console.log(itemId);
  client.query(
    `SELECT itemss.price FROM itemss WHERE id = $1;`,
    [itemId],
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("result.rows");
      console.log(result.rows[0]);
      res.json({ data: result.rows[0] });
    }
  );
});

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';


app.post('/create-checkout-session', async (req, res) => {
  const {cart} = req.body;
  console.log("cart", cart)
 
  const line_items = cart.map((item) => {
      return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: +(item.price.replace(".", "")),
      },
      quantity: item.amount,
    }
  })

  console.log("lineItems");
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',//'http://localhost:4242/success',
    cancel_url: 'http://localhost:3000/candles',
  });
console.log("session",  session)
  res.json({url: session.url});
  // res.redirect(303, session.url);
});

// Get a candle by Id
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

app.post("/candles/itemId", (req, res) => {
  console.log("POST CALL");
  const itemId = parseInt(req.body.itemId);
  console.log(itemId);
  client.query(
    `UPDATE itemss SET is_favourite = $1 WHERE id = $2 RETURNING *;`,
    [true, itemId],
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("result.rows");
      console.log(result.rows[0]);
      res.json({ data: result.rows[0] });
    }
  );
});

app.post("/candles/remove", (req, res) => {
  console.log("POST CALL");
  const itemId = parseInt(req.body.itemId);
  console.log(itemId);
  client.query(
    `UPDATE itemss SET is_favourite = $1 WHERE id = $2 RETURNING *;`,
    [false, itemId],
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("result.rows");
      console.log(result.rows[0]);
      res.json({ data: result.rows[0] });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
