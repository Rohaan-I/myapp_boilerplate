var createError = require('http-errors');
var express = require('express');

let app = express();
const sequelize = require('./config/sequelize');
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  
  require('./config/express')(app);
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;



