const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors');
const userAndEmployeeRoute = require('./Routes/UsersAndEmployees');
const restDataFormatsRoute = require('./Routes/restDataFormats');
const onlineOrdersRoute = require('./Routes/onlineOrders');
const errorRoute = require('./Routes/error');
//Creating a database connection.
mongoose.connect('mongodb://localhost/localdb');
let db = mongoose.connection;

//Init App
const app = express();
//morgan for debug.
app.use(morgan('dev'));
/*
//Routes
app.use('/employeeUserRoute', userAndEmployeeRoute);
app.use('/RestDataFormats_Obj', restDataFormatsRoute);
app.use('/FullOrders', onlineOrdersRoute);
app.use('/error', errorRoute);
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authoriztion'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
//Bring in models client.
let FullOrders = require('./models/client_FullOrders');
const AllFullOrdersData = require('./models/all_fullOrders_Data');
let RestDataFormats = require('./models/client_RestDataFormats');
let Users = require('./models/client_Users');
let BusinessTemplatesData = require('./models/businessTemplatesData');
//Bring in models rest_manager.
let Employee = require('./models/rest_EmployeeUser');
let AllOrders = require('./models/rest_AllOrders');
const { send } = require('process');
const { connect } = require('http2');

//Check connection.
db.once('open', () => {
  console.log('connection to mongoDB');
});
//Check for db error.
db.on('error', (err) => {
  console.log(err);
});

//Body Parser Middleware.
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

//                                  RestDataFormats
//___________________________________________________________________________________________
{
  //Get data formats.
  //client post get data formts by type.
  app.post('/RestDataFormats_Obj', (req, res) => {
    console.log(req.body.type);
    if (req.body.type !== 'All')
      RestDataFormats.aggregate(
        [{ $match: { type: req.body.type } }],
        (err, allFormats) => {
          if (err) {
            console.log('error');
          } else {
            res.send(allFormats[0]);
          }
        }
      );
    else {
      RestDataFormats.find({}, (err, allFormats) => {
        if (err) {
          res.send(err);
        } else {
          res.send(allFormats);
        }
      });
    }
  });

  //Edit data format.
  //rest manager post edit (data formts Object).
  app.post('/EditRestDataFormats_Obj', (req, res) => {
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
  });

  //Insert data format.
  //rest manager get insert data formts.
  app.post('/InsertRestDataFormats_Obj', (req, res) => {
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
  });

  //Remove data format.
  //rest manager post remove (data formts Object).
  app.post('/RemoveRestDataFormats_Obj', (req, res) => {
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

//                                     Users & Employees
//___________________________________________________________________________________________
{
  //Get connection.
  //Rest manager & client post get connection(user). check password

  const connectionByUserPhoneNumber = async (phoneNumber, password) => {
    let user = await Users.findOne({ phoneNumber: phoneNumber });
    if (user === null) user = await Users.findOne({ email: phoneNumber });
    const result = await user.comparePassword(password);
    return result ? user : result;
  };
  const connectionByEmployeePhoneNumberOrID = async (phoneNumber, password) => {
    let employee = await Employee.findOne({ phoneNumber: phoneNumber });
    if (employee === null)
      employee = await Employee.findOne({ id: phoneNumber });
    const result = await employee.comparePassword(password);
    return result ? employee : result;
  };
  app.post('/UserConnection', (req, res) => {
    if (req.body.type === 'User') {
      let result = connectionByUserPhoneNumber(
        req.body.phoneNumber,
        req.body.password
      );
      res.send(result);
      if (result) {
        result
          .then((response) => {
            res.send(response);
          })
          .catch((err) => res.status(500).send(err));
      }
    } else if (req.body.type === 'Employee') {
      let result = connectionByEmployeePhoneNumberOrID(
        req.body.obj.id,
        req.body.obj.password
      );
      if (result) {
        result.then((response) => {
          res.send(response);
        });
      } else res.send(result);
    } else {
      console.log('failed');
    }
  });

  //Create user.
  //Rest manager & client post creating user.
  app.post('/CreateUser', (req, res) => {
    if (req.body.type === 'User')
      Users.create(req.body.user, (err, newUser) => {
        if (err) {
          res.send('user already exist! or the mail now valid!');
        } else {
          res.send(newUser[0]);
        }
      });
    else if (req.body.type === 'Employee') {
      Employee.create(req.body.user, (err, newEmployee) => {
        if (err) {
          res.send(err.keyValue);
        } else {
          res.send(newEmployee[0]);
        }
      });
    }
  });
  //Edit user.
  //Rest manager & client post editing user by (client)phone number/(employee)id.
  app.post('/EditUser', (req, res) => {
    if (req.body.type === 'User')
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
    else if (req.body.type === 'Employee')
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
  app.post('/DeleteUser', (req, res) => {
    if (req.body.type === 'User')
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
    else if (req.body.type === 'Employee')
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
//add work time object
//for employee
app.post('/LogOutEmployee', (req, res) => {
  console.log('______________');
  Employee.updateOne(
    { id: req.body.obj.id },
    { $push: { workTimes: req.body.obj.workTimes } },
    (err) => {
      if (err) {
        res.send('faild');
      } else {
        res.send('success');
      }
    }
  );
});

//                                     Online Orders
//___________________________________________________________________________________________
//Insert online orders.
app.post('/AddOnlineOrders', (req, res) => {
  FullOrders.create(req.body, (err) => {
    if (err) {
      res.send('somthing rowng!');
    } else {
      AllFullOrdersData.create(req.body, (err) => {
        if (err) {
          res.send('err');
        } else {
          console.log('success!');
        }
      });
      res.send('success!');
    }
  });
});

//Get online orders.
app.post('/GetOnlineOrders', (req, res) => {
  FullOrders.find({}, (err, onlineOrders) => {
    if (err) {
      res.send('somthing rowng!');
    } else if (onlineOrders[0].length)
      //list online Orders is empty?
      res.send('list online Orders is empty!');
    else {
      FullOrders.deleteMany(onlineOrders[0], (err, arr) => {
        //
        if (err) {
          res.send('not cleaing');
        } else res.send(onlineOrders[0]);
      });
    }
  });
});

//post All full orders.
app.post('/GetAll_allFullOrdersData', (req, res) => {
  AllFullOrdersData.find({}, (err, allFullOrdersData) => {
    if (err) {
      console.log('fails');
    } else {
      res.send(allFullOrdersData);
    }
  });
});

//                                   Business
//_________________________________________________________________________________

//Create Business item
app.post('/CreateBusinessItem', (req, res) => {
  BusinessTemplatesData.create(req.body.obj, (err, business) => {
    if (err) res.send(JSON.stringify(err));
    else {
      console.log(business);
      res.send('success!');
    }
  });
});

//Get Business List
app.get('/GetBusinessList', (req, res) => {
  BusinessTemplatesData.find({}, (err, allBusiness) => {
    if (err) {
      res.send(JSON.stringify(err));
    } else {
      res.send(allBusiness);
    }
  });
});

//                                   All Orders
//_________________________________________________________________________________

app.post('/CreateAllOrderItem', (req, res) => {
  AllOrders.create(req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success!');
    }
  });
});

//                                   Error
//_________________________________________________________________________________
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(req.body);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// Start Server
app.listen(3001, () => console.log('server started on port 3001...'));
