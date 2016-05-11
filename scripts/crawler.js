var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var _ = require('lodash');

var db = require('./db.js');
var likesParse = require('./likesParse.js');
var Image = require('../model/image.js');
var imageLoader = require('./imageLoader.js');

var config = require('../config.js');



function getImageObject(imageData, likes, profile){
    var likesObj = config.module.likes;
    var profileObj = config.module.profile;
    likesObj.value = likes;
    profileObj.value = profile;


    return {
        data: imageData.toString('base64'),
        info: [
            {
                module: config.module.name,
                properties: [
                    likesObj,
                    profileObj
                ]
            }
        ]
    };
}

grabImageLinksByXpath = async(function(driver, profile, countContents) {
    var content;
    var contentUrl;
    var imgLink;
    var imagesList = [];
    var offset = 0;

    var getLikesAndAddData = async(function(imgLink, contentUrl){
        var likes = await(likesParse(contentUrl));
        var imageData = await(imageLoader.load(imgLink));

        imagesList.push(
            new Image(getImageObject(imageData, likes, profile))
        );

        if(imagesList.length == 10 || offset == countContents - 1)
        {
            db.emitter.emit('save data list',  imagesList );
            imagesList = [];
        }
    });

    config.cssSelectors.imageOrVideo = config.cssSelectors.image + ',' + config.cssSelectors.video;
    try {
        while (offset < countContents) {
            await(driver.wait(until.elementLocated(By.css(config.cssSelectors.imageOrVideo)), config.waitElementTimeout));
            try {
                content = await(driver.findElement(By.css(config.cssSelectors.image)));

                contentUrl = await(driver.getCurrentUrl()).split('?')[0];

                imgLink = await(content.getAttribute('src')).match('.+\.jpg')[0];

                if (countContents - offset == 1) {
                    await(getLikesAndAddData(imgLink, contentUrl));
                }
                else
                    getLikesAndAddData(imgLink, contentUrl);

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
    catch(err) {
        errorHandler(err);

    }
	finally{
		db.emitter.emit('save data list', imagesList);
        imagesList = [];
        console.log('end of crawling');
        console.timeEnd('grab image links');
	}
});


function errorHandler(err){
    console.log('\n\n[error] :' + err +'\n\n');
}

module.exports.grabPage = async(function (driver, url, countContents) {

        console.time('grab image links');
        driver.get(url);

        await(driver.wait(until.elementLocated((By.xpath('(' + config.xPathSelectors.content + ')[' + 1 + ']'))), config.waitElementTimeout));
        await(driver.findElement((By.xpath('(' + config.xPathSelectors.content + ')[' + 1 + ']'))).click());
        await(grabImageLinksByXpath(driver, url, countContents));
});