const express = require('express');

const route = express.Router();
let OnlineOrders = require('../models/client_FullOrders');
//                                     Online Orders
//___________________________________________________________________________________________

//Insert online orders.
route.post('/AddOnlineOrders', (req, res) => {
  OnlineOrders.insertMany(req.body, (err) => {
    if (err) {
      res.send('somthing rowng!');
    } else res.send('success!');
  });
});

//Get online orders.
route.post('/GetOnlineOrders', (req, res) => {
  OnlineOrders.find({}, (err, onlineOrders) => {
    if (err) {
      res.send('somthing rowng!');
    } else if (onlineOrders[0].length)
      //list online Orders is empty?
      res.send('list online Orders is empty!');
    else {
      OnlineOrders.deleteMany(onlineOrders[0], (err, arr) => {
        //
        if (err) {
          res.send('not cleaing');
        } else res.send(onlineOrders[0]);
      });
    }
  });
});

module.exports = route;
