var config = require('../config.js');
var Promise = require('promise');
var EventEmiter = require('events');
var _=require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/work');

var Profile = require('../model/profile.js');
var Image = require('../model/image.js');

var states = config.profileStates;


const dbEmmiter = new EventEmiter();
dbEmmiter.on('save data list', function(dataList){
    _.each(dataList, function(image){
        image.save(function(err){
            if(err)
                console.log(err);
        });
    });
});

module.exports.emitter = dbEmmiter;

module.exports.nextProfile = function() {
    return new Promise(function (resolve, reject) {
        Profile.findOneAndUpdate({state: {$exists: true, $eq: states.free}}, {state: states.lock}, function (err, profile) {
            if (err)
            {
                reject(err);
                return;
            }

            resolve(profile);
        })
    })
};