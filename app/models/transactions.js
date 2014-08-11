'use strict';
//var Mongo = require('mongodb');
//var _ = require('lodash');

function Transaction(trans){
  this.type         = trans.type;
  this.pin          = parseInt(trans.pin);
  this.amount       = parseFloat(trans.amount);
  this.transDate    = new Date();
}
module.exports = Transaction;
