'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var home = require('../controllers/home');
var accounts = require('../controllers/accounts');
//var tasks = require('../controllers/tasks');
module.exports = function(app, express){

  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);

  app.get('/accounts/new', accounts.init);
  app.post('/accounts', accounts.create);
  app.get('/accounts', accounts.index);
  app.get('/accounts/:id', accounts.show);
  app.get('/accounts/:id/transaction', accounts.newTrans);
  app.post('/accounts/:id', accounts.addTrans);
  app.get('/accounts/:id/transfer', accounts.newTransfer);
  app.post('/accounts/:id', accounts.transfer);
/*
  app.get('/tasks/new', tasks.init);
  app.post('/tasks', tasks.create); 
  app.get('/tasks', tasks.index);
  */
  console.log('Pipeline Configured');
};
