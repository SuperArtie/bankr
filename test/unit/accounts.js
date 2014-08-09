/* jshint expr:true */
/* global describe, it, before, beforeEach */

var expect = require('chai');
var Account = require('../../app/models/account');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var cp = require('child_process');
var db = 'bankr-test';

describe('Account', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '../scripts/freshdb.sh', [db], {cwd:__dirname + '../scripts'}, function(){
      done();
    });
  });
  describe('constructor', function(){
    it('should create an account', function(){
    });
  });
  describe('#addTransaction', function(){
    it('should conduct a transaction', function(){
      
    });
  });
});
