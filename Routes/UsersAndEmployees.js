const express = require('express');
const { model } = require('mongoose');
let router = express.Router();
let Users = require('../models/client_Users');
let Employee = require('../models/rest_EmployeeUser');

//                                     Users & Employees
//___________________________________________________________________________________________
{
  //Get connection.
  //Rest manager & client post get connection(user). check password

  const connectionByPhoneNumberUser = async (phoneNumber, password) => {
    const user = await Users.findOne({ phoneNumber: phoneNumber });
    const result = await user.comparePassword(password);
    return result;
  };
  const connectionByEmailUser = async (mail, password) => {
    const user = await Users.findOne({ mail: mail });
    const result = await user.comparePassword(password);
    return result;
  };
  const connectionByPhoneNumberEmployee = async (phoneNumber, password) => {
    const user = await Users.findOne({ phoneNumber: phoneNumber });
    const result = await user.comparePassword(password);
    return result;
  };
  const connectionByEmailEmployee = async (mail, password) => {
    const user = await Users.findOne({ mail: mail });
    const result = await user.comparePassword(password);
    return result;
  };
  //Connection user.
  //Rest manager & client get connection user.
  router.get('/employeeUserRoute', (req, res) => {
    if (req.body.type === 'user') {
      if (!req.body.phoneNumber) {
        let result = connectionByPhoneNumberUser(
          req.body.phoneNumber,
          req.body.password
        );
        res.send(result);
      }
      if (!req.body.mail) {
        let result = connectionByEmailUser(req.body.mail, req.body.password);
        res.send(result);
      }
    } else if (req.body.type === 'employee') {
      if (!req.body.phoneNumber) {
        let result = connectionByPhoneNumberUser(
          req.body.phoneNumber,
          req.body.password
        );
        res.send(result);
      }
      if (!req.body.mail) {
        let result = connectionByEmailUser(req.body.mail, req.body.password);
        res.send(result);
      }
    } else res.send('Not exist!');
  });

  //Create user.
  //Rest manager & client post creating user.
  router.post('/employeeUserRoute', (req, res) => {
    if (req.body.type === 'user')
      Users.create(req.body.user, (err, newUser) => {
        if (err) {
          res.send('user alreagy exist!');
        } else {
          res.send(newUser[0]);
        }
      });
    else if (req.body.type === 'employee')
      Employee.create(req.body.user, (err, newEmployee) => {
        if (err) {
          res.send('user alreagy exist!');
        } else {
          res.send(newEmployee[0]);
        }
      });
  });
  //Edit user.
  //Rest manager & client post editing user by (client)phone number/(employee)id.
  router.put('/userAndEmployeeRoute', (req, res) => {
    if (req.body.type === 'user')
      Users.aggregate(
        [{ $match: { phoneNumber: req.body.user.phoneNumber } }],
        (err, user) => {
          if (err) console.log('err');
          else if (user.length) {
            Users.updateOne(
              { _id: user[0]._id },
              { $set: req.body.user },
              (err, userChanged) => {
                if (err) {
                  console.log('error');
                } else {
                  res.send(user);
                }
              }
            );
          } else res.send('user not exist!');
        }
      );
    else if (req.body.type === 'employee')
      Employee.aggregate(
        [{ $match: { id: req.body.user.id } }],
        (err, employee) => {
          if (err) console.log('err');
          else if (employee.length) {
            Employee.updateOne(
              { id: req.body.user.id },
              { $set: req.body.user },
              (err) => {
                if (err) {
                  console.log('error');
                } else {
                  if (employee.length) {
                    res.send(req.body.user);
                  }
                }
              }
            );
          } else res.send('user not exist!');
        }
      );
  });
  //Delete user.
  //rest manager & client post deleting user by (client)phone number/(employee)id.
  router.delete('/employeeUserRoute', (req, res) => {
    if (req.body.type === 'user')
      Users.aggregate(
        [{ $match: { phoneNumber: req.body.user.phoneNumber } }],
        (err, user) => {
          if (err) console.log('err');
          else if (user.length) {
            Users.deleteOne({ _id: user[0]._id }, (err, userChanged) => {
              if (err) {
                console.log('error');
              } else {
                res.send(user);
              }
            });
          } else res.send('user not exist!');
        }
      );
    else if (req.body.type === 'employee')
      Employee.aggregate({ id: req.body.user.id }, (err, employee) => {
        if (err) console.log('err');
        else if (employee.length) {
          Employee.deleteOne({ id: req.body.user.id }, (err) => {
            if (err) {
              console.log('error');
            } else {
              if (employee.length) {
                res.send(req.body.user);
              }
            }
          });
        } else res.send('user not exist!');
      });
  });
}

module.exports = router;
