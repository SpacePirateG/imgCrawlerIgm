var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

//var mongoose = require('mongoose'),
  //  Schema = mongoose.Schema;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var likesParse = require('./likesParse.js');

var config = require('../config.js');

var imgLinks = [];


grabImageLinksByXpath = async(function(driver, countContents) {
    var content;
    var contentUrl;
    var imgLink;
    var offset = 0;
    config.cssSelectors.imageOrVideo = config.cssSelectors.image + ',' + config.cssSelectors.video;
    try {
        while (offset < countContents) {
            await(driver.wait(until.elementLocated(By.css(config.cssSelectors.imageOrVideo)), config.waitElementTimeout));
            try{
                content = await(driver.findElement(By.css(config.cssSelectors.image)));

                contentUrl = await(driver.getCurrentUrl()).split('?')[0];

                likesParse(contentUrl).then(function (likesCount) {
                    console.log('\tcount likes: ' + likesCount);
                }, errorHandler);

                imgLink = await(content.getAttribute('src'));
                imgLinks.push(imgLink);

                if(imgLinks.length == 100)
                {
                    console.log(imgLinks.join('\n'));
                    imgLinks = [];
                }
                offset++;
            }
            catch(err){
                content = await(driver.findElement(By.css(config.cssSelectors.video)));
            }
            try{
                await(driver.findElement(By.css(config.cssSelectors.nextContent)).click());
            }
            catch(err){
                console.log(err);
                break;
            }
            await(driver.wait(until.stalenessOf(content)), config.waitElementTimeout);

        }

    }
    catch(err){
        errorHandler(err);
    }
    finally{
        console.log('images links: ' + imgLinks.join('\n'))
        console.log('end of crawling');
        driver.quit();
        console.timeEnd('grab image links');
    }
});


function errorHandler(err){
    console.log('\n\n[error] :' + err +'\n\n');
}

module.exports.grabPage = async(function (driver, url, countContents) {

        console.time('grab image links');
        driver.get(url);

        await(driver.wait(until.elementLocated((By.xpath('(' + config.xPathSelectors.content + ')[' + 1 + ']'))), config.waitElementTimeout).then(
            function (elem) {
                driver.findElement((By.xpath('(' + config.xPathSelectors.content + ')[' + 1 + ']'))).click().then(function () {
                    grabImageLinksByXpath(driver, countContents);
                });
            }, errorHandler
        ));
});