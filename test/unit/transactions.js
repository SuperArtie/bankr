/* jshint expr:true */
/* global describe, it, before, beforeEach */
'use strict';
var expect = require('chai').expect;
var Account = require('../../app/models/accounts');
var Transaction = require('../../app/models/transactions');
var dbConnect = require('../../app/lib/mongodb');
//var Mongo = require('mongodb');
var db = 'bankr-test';
var trans;
describe('Transaction', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    Account.collection.remove(function(){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a transaction', function(){
    var o = {type: 'deposit', pin:'1234', amount:'100.00'};
    trans= new Transaction(o);
    expect(trans).to.be.instanceof(Transaction);
    expect(trans.type).to.equal('deposit');
    expect(trans.pin).to.equal(1234);
    expect(trans.amount).to.equal(100.00);
    });
  });
});
