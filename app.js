var firefox = require('selenium-webdriver/firefox');
var crawler = require('./scripts/crawler.js');
var db = require('./scripts/db.js');
var config = require('./config.js');
var mongoose = require('mongoose');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var states = config.profileStates;

var pathToQuickjava = __dirname + '/extensions/quickjava-2.0.7-fx.xpi';

var profile = new firefox.Profile();
profile.addExtension(pathToQuickjava);
profile.setPreference("thatoneguydotnet.QuickJava.curVersion", "2.0.7");
profile.setPreference("thatoneguydotnet.QuickJava.startupStatus.Images", 2);

var options = new firefox.Options().setProfile(profile);

function createDriver(){
    var driver = new firefox.Driver(options);
    driver.manage().timeouts().setScriptTimeout(config.waitScriptTimeout);
    driver.manage().window().setSize(800, 600);
    return driver;
}

var run = async(function iteration(){
    var profile = await(db.nextProfile());
    if(!profile) {
        setTimeout(run, 1000);
        return;
    }
    var driver = createDriver();
    try {
        await(crawler.grabPage(driver, profile.url, config.countContent));
        await(db.profileChangeState(profile, states.done));
    }
    catch(err){
        console.log("main [error]: ",err);
        //await(db.removeAllImages(profile));
        //await(db.profileChangeState(profile, states.free));
    }
	finally{
		driver.quit();
        run();
	}

});

run();