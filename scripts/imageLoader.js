var request = require('request');
var Promise = require('promise');

module.exports.loadImage = function(url){
    var buffer = new Buffer('');
    return new Promise(function(resolve, reject){
       request
           .get(url)
           .on('data', function(chunk){
                buffer = Buffer.concat([buffer, chunk]);
           }).on('end',function(){
               resolve(buffer);
           })
    });
};