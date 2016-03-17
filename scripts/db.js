var config = require('../config.js');
var Promise = require('promise');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Pages = new Schema({
    page: 'String',
    images: [
        {
            link: 'String',
            likes: 'String'
        }
    ]
});

mongoose.model('Page', Pages);

module.exports.nextPage = function() {
    return new Promise(function (resolve, reject) {
        var pageModel = mongoose.model('Page');
        pageModel.findOne({images: {$exists: true, $eq: []}}, function (err, page) {
            if (err)
            {
                reject(err);
                return;
            }

            resolve(page);
        })
    })
};