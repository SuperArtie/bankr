'use strict';
var Mongo = require('mongodb');
var _ = require('lodash');
var Transfer = require('./transfers');
Object.defineProperty(Account, 'collection', {
  get: function(){return global.mongodb.collection('accounts');}
});

function Account(acct){
  this.name         = acct.name;
  this.pin          = parseInt(acct.pin);
  this.type         = acct.type;
  this.balance      = parseFloat(acct.balance);
  this.opened       = new Date();
  this.color        = acct.color;
  this.photo        = acct.photo;
  this.transactions = [];
  this.transfers    = [];
}

//if pin doesn't equal, stop function
Account.prototype.addTrans = function(t){
  if(this.pin !== t.pin){ return 0; }

//if deposit, increase balance, or else decrease balance
  if(t.type === 'deposit'){
    this.balance += t.amount;
  }else{
    this.balance -= t.amount;
  }

// if balance is less than 0, $50 fee
  if(this.balance <= 0){
    this.balance -= 50;
    t.fee = 50;
  }
  //push transaction into trans array
  this.transactions.push(t);
  this.transactions[this.transactions.length-1].id = this.transactions.length;
};


Account.prototype.transfer = function(acct, amt){
  if(this.balance <= (amt + 25)){ return 0; }
  amt = parseFloat(amt);
  this.balance -= (amt + 25);
  acct.balance += amt;
  
  var t = new Transfer(acct.name, this.name, amt);
  
  this.transfers.push(t);
  this.transfers[this.transfers.length-1].fee = 25;
  this.transfers[this.transfers.length-1].id = this.transfers.length;
  acct.transfers.push(t);
  acct.transfers[acct.transfers.length-1].id = acct.transfers.length;
};


Account.prototype.save = function(cb){
  Account.collection.save(this, cb);
};

Account.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Account.collection.findOne({_id:_id}, function(err, obj){
    var account = changePrototype(obj);
    cb(null, account);
  });
};

Account.all = function(cb){
  Account.collection.find().toArray(function(err, objects){
    var accounts = objects.map(function(p){
      return changePrototype(p);
    });
    cb(null, accounts);
  });
};

Account.except = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Account.collection.find({_id:{$ne:_id}}).toArray(function(err, objects){
    var accounts = objects.map(function(p){
      return changePrototype(p);
    });
    cb(null, accounts);
  });
};

module.exports = Account;


function changePrototype(obj){
  var account = _.create(Account.prototype, obj);
  return account;
}
