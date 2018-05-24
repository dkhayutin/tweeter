"use strict";
const Mongo = require("mongodb");

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insert(newTweet, (err, result) => {
        callback(null, true);
      });
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(err, tweets);
      });
    },

    getTweet: function (id, callback) {
      db.collection('tweets').findOne({_id:Mongo.ObjectID(id)}, (err, tweet) => {
        console.log('getTweet before', tweet);
        callback(err, tweet);
        console.log('getTweet after', tweet);
      })
    },

    updateTweet: function (id, tweet, callback) {
      db.collection('tweets').updateOne({_id:Mongo.ObjectID(id)}, tweet, (err, tweet) => {
        callback(err, tweet)
      })
    }
  };
}
