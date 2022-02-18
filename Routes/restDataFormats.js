const express = require('express');

const router = express.Router();
const RestDataFormats = require('../models/client_RestDataFormats');

//                                  RestDataFormats
//___________________________________________________________________________________________
{
  //Get data formats.
  //client post get data formts by type.
  router
    .get('/RestDataFormats_Obj', (req, res) => {
      RestDataFormats.aggregate(
        [{ $match: { type: req.body.type } }],
        (err, ordersList) => {
          if (err) {
            console.log('error');
          } else {
            res.send(ordersList[0]);
          }
        }
      );
    })

    //Edit data format.
    //rest manager post edit (data formts Object).

    .put('/RestDataFormats_Obj', (req, res) => {
      RestDataFormats.aggregate(
        [{ $match: { type: req.body.type } }],
        (err, ordersList) => {
          if (err) {
            console.log('error');
          } else {
            RestDataFormats.updateOne(
              { _id: ordersList[0]._id },
              { $set: req.body.type1 },
              (err, res) => {
                if (err) {
                  console.log('error');
                } else {
                  console.log('success');
                }
              }
            );
            res.send('The object has changed!');
          }
        }
      );
    })

    //Insert data format.
    //rest manager get insert data formts.
    .post('/RestDataFormats_Obj', (req, res) => {
      try {
        RestDataFormats.insertMany(
          { type: req.body.type, obj: req.body.obj },
          (err, item) => {
            if (err) console.log(err);
            else res.send(item);
          }
        );
      } catch (e) {
        console.log(e);
      }
      res.send('The json inserted to database.');
    })

    //Remove data format.
    //rest manager post remove (data formts Object).
    .delete('/RestDataFormats_Obj', (req, res) => {
      RestDataFormats.aggregate(
        [{ $match: { type: req.body.type } }],
        (err, ordersList) => {
          if (err) {
            console.log('error');
          } else {
            RestDataFormats.deleteOne(
              { _id: ordersList[0]._id },
              function (err, results) {
                if (err) {
                  console.log('failed');
                  throw err;
                }
                console.log('success');
              }
            );
            res.send(ordersList[0]);
          }
        }
      );
    });
}
module.exports = router;
