'use strict';
//var Mongo = require('mongodb');
//var _ = require('lodash');

function Transfer(trans){
  this.to         = trans.to;
  this.from       = trans.from;
  this.amount     = parseFloat(trans.amount);
  this.transDate  = new Date();
}
module.exports = Transfer;
