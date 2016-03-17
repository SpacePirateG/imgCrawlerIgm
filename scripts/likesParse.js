var request = require('request');
var Promise = require('promise');

var config = require('../config.js');
var pattern = config.paterns.likes;

module.exports = function (url) {
    return new Promise(function (resolve, reject) {
        request.get(url, function (err, res, body) {
            try {
                if (err) {
                    reject(err);
                    return;
                }

                var likesCount = pattern.exec(body)[1];
				pattern.lastIndex = 0;
                if (likesCount)
                    resolve(likesCount);
                else
                    reject(new Error('#Not found likes count'));
            }
            catch (err) {
                reject(err);
            }
        });

    });
};