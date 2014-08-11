'use strict';

var Account = require('../models/accounts');
var Transaction = require('../models/transactions');

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
  Account.all(function(err, accounts){
    res.render('accounts/index', {accounts:accounts});
  });
};

exports.show = function(req, res){
  var id = req.params.id;
  Account.findById(id.toString(), function(err, account){
    res.render('accounts/show', {account:account});
  });
};

exports.newTrans = function(req, res){
  Account.findById(req.params.id, function(err, account){
    res.render('accounts/newTrans', {account:account});
  });
};

exports.addTrans = function(req, res){
  Account.findById(req.params.id, function(err, account){
    var t = new Transaction(req.body);
    account.addTrans(t);
    account.save(function(){
      res.redirect('/accounts/' + req.params.id);
    });
  });
};
exports.newTransfer = function(req, res){
  var id = req.params.id;
  Account.findById(id.toString(), function(err, acct){
    Account.except(id.toString(), function(err, accounts){
      res.render('accounts/newTransfer', {acct:acct}, {accounts:accounts});
    });
  });
};
exports.transfer = function(req, res){
  Account.findById(req.params.id, function(err, account){
    Account.findById(req.body.to, function(err, acct){
      account.transfer(acct, req.body.amt);
      account.save(function(){
        acct.save(function(){
          res.redirect('/accounts/' + req.params.id);
        });
      });
    });
  });
};
