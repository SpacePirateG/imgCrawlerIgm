var firefox = require('selenium-webdriver/firefox');
var crawler = require('./scripts/crawler.js');
var db = require('./scripts/db.js');
var config = require('./config.js');

var pathToQuickjava = __dirname + '/extensions/quickjava-2.0.7-fx.xpi';

var profile = new firefox.Profile();
profile.addExtension(pathToQuickjava);
profile.setPreference("thatoneguydotnet.QuickJava.curVersion", "2.0.7");
profile.setPreference("thatoneguydotnet.QuickJava.startupStatus.Images", 2);

var options = new firefox.Options().setProfile(profile);
var driver = new firefox.Driver(options);
driver.manage().timeouts().setScriptTimeout(config.waitScriptTimeout);
driver.manage().window().setSize(800, 800);

page = 'https://www.instagram.com/volochkova_art/';
countContent = 1;

//db.nextPage().then(function(page){
    crawler.grabPage(driver, page, countContent).then(function () {
        console.log('done');
    }, function (err) {
        console.log('err: ', err);
    });
//},function(err){

//});




