/* jshint expr:true */
/* global describe, it, before, beforeEach */
'use strict';
var expect = require('chai').expect;
var Account = require('../../app/models/accounts');
var Transaction = require('../../app/models/transactions');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var db = 'bankr-test';
var acct1, trans, trans2;
describe('Account', function(){
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
    it('should create an account', function(){
    var o = {name:'James', pin:'1234', type:'checking', balance:'100.00', color:'Red', photo:'dog'};
    acct1 = new Account(o);
    expect(acct1).to.be.instanceof(Account);
    expect(acct1.name).to.equal('James');
    expect(acct1.pin).to.equal(1234);
    expect(acct1.type).to.equal('checking');
    expect(acct1.balance).to.equal(100.00);
    });
  });
  describe('#addTransaction', function(){
    it('should conduct a transaction', function(){
    var o = {name:'James', pin:'1234', type:'checking', balance:'100.00', color:'Red', photo:'dog'};
    acct1 = new Account(o);
    
    var o2 = {type: 'withdrawal', pin:'1234', amount:'110.00'};
    trans = new Transaction(o2);
    
    acct1.addTrans(trans);
    //console.log(acct1);

    var o3 = {type: 'deposit', pin:'1234', amount:'110.00'};
    trans2 = new Transaction(o3);

    acct1.addTrans(trans2);
    //console.log(acct1);

    //expect(acct1.transactions[0]).to.be.instanceof(Transaction);
    expect(trans).to.be.instanceof(Transaction);
    expect(trans.type).to.equal('withdrawal');
    //expect(trans.pin).to.equal(1234);
    expect(trans.amount).to.equal(110.00);
    });
  });
  describe('#save', function(){
    it('should save an account to db', function(done){
      var o = {name:'James', pin:'1234', type:'checking', balance:'100.00', color:'Red', photo:'dog'};
      acct1 = new Account(o);
      
      var o2 = {type: 'deposit', pin:'1234', amount:'110.00'};
      trans = new Transaction(o2);

      acct1.addTrans(trans);

      acct1.save(function(){
        expect(acct1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#findById', function(){
    it('should find an account by ID', function(done){
      var o = {name:'James', pin:'1234', type:'checking', balance:'100.00', color:'Red', photo:'dog'};
      acct1 = new Account(o);
      
      var o2 = {type: 'deposit', pin:'1234', amount:'110.00'};
      trans = new Transaction(o2);
      
      acct1.save(function(){
        Account.findById(acct1._id.toString(), function(err, account){
          account.addTrans(trans);
          console.log(account);
          expect(account).to.respondTo('addTrans');
          expect(account.pin).to.equal(1234);
          expect(account.type).to.equal('checking');
          expect(account.balance).to.equal(210.00);
          expect(account.transactions.length).to.equal(1);
          done();
        });
      });
    });
  });
});
