const express = require('express');
let route = express.Router();
//                                   Error
//_________________________________________________________________________________
route.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

route.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = route;
