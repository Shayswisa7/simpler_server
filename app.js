const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
//Creating a database connection.
mongoose.connect('mongodb://localhost/localdb');
let db = mongoose.connection;

//Init App
const app = express();

//Bring in models
let Orders = require('./models/localdb(online orders)');

//Check connection
db.once('open', () => {
  console.log('connection to mongoDB');
});
//Check for db error
db.on('error', (err) => {
  console.log(err);
});

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});
// Home Route
app.get('/', (req, res) => {
  Orders.find({}, (err, ordersList) => {
    if (err) {
      console.log('error');
    } else {
      res.send(ordersList);
    }
  });
});
app.get('/orderByPhoneNumber', (req, res) => {
  Orders.find({}, (err, ordersList) => {
    if (err) {
      console.log('error');
    } else {
      res.send(ordersList);
    }
  });
});
// Start Server
app.listen(3001, () => console.log('server started on port 3001...'));
