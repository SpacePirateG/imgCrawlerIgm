var firefox = require('selenium-webdriver/firefox');
var crawler = require('./scripts/crawler.js');
var db = require('./scripts/db.js');
var config = require('./config.js');
var mongoose = require('mongoose');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var pathToQuickjava = __dirname + '/extensions/quickjava-2.0.7-fx.xpi';

var profile = new firefox.Profile();
profile.addExtension(pathToQuickjava);
profile.setPreference("thatoneguydotnet.QuickJava.curVersion", "2.0.7");
profile.setPreference("thatoneguydotnet.QuickJava.startupStatus.Images", 2);

var options = new firefox.Options().setProfile(profile);
var driver = new firefox.Driver(options);
driver.manage().timeouts().setScriptTimeout(config.waitScriptTimeout);
driver.manage().window().setSize(800, 800);


var run = async(function(){
    try {
        while (true) {

            try {
                var profile = await(db.nextProfile());
                await(crawler.grabPage(driver, profile.url, config.countContent));
                await(db.profileDone(profile));
            }
            catch(err){
            }

        }
    }
    finally{
        driver.quit();
    }

});

run();




