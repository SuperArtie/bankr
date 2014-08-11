'use strict';

var Account = require('../models/accounts');
//var Task = require('../models/task');

exports.init = function(req, res){
  Account.all(function(accounts){
    res.render('accounts/init', {accounts:accounts});
  });
};

exports.create = function(req, res){
  var account = new Account(req.body);
  account.save(function(){
    res.redirect('/accounts');
  });
 // console.log(req.body);
};

exports.index = function(req, res){
  Account.all(function(accounts){
    res.render('accounts/index', {accounts:accounts});
  });
};


