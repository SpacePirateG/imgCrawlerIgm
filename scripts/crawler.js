var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var likesParse = require('./likesParse.js');

var config = require('../crawler/config.js');

var imgLinks = [];

var scrollToTargetScript = 'window.scrollToTarget = function (callback) {' +
    'var rect = document.querySelector(\'' + config.selectors.scrollTarget + '\').getBoundingClientRect();' +
    'var targetTop = rect.top;' +
    'var handler = setInterval(function () {' +
    'if (targetTop  < 0) {' +
        'clearInterval(handler);' +
        'callback();' +
    '}' +
    'window.scrollBy(0, ' + config.scrollStep + ');' +
    'targetTop  -= ' + config.scrollStep + ';' +
    '}, ' + config.scrollTimeout + ');' +
'};';



grabImageLinksByXpath = async(function() {
    var content;
    var contentUrl;
	var imgLink;
    var offset = 1;
	var stopFlag = false;
    while (imgLinks.length < needImages) {
        try {
            content = await(driver.findElement(By.xpath('(' + config.xPathSelectors.content + ')[' + offset + ']')));
			stopFlag = false;
		}
        catch (err) {
			if(stopFlag)
				break;
			stopFlag = true;
            errorHandler(err);
			await(driver.executeAsyncScript(
				'var callback = arguments[arguments.length - 1];' +
				'scrollToTarget(callback);').then(function(){
						console.log('scroll done');
					},errorHandler)
				);
			continue;
        }
            contentUrl = await(content.getAttribute('href'));

            likesParse(contentUrl).then(function(likesCount) {
				/*console.log('\tcontent url :' + contentUrl);
                console.log('\tcount likes : ' + likesCount);*/
            },errorHandler);

            content.click();
            driver.wait(until.elementLocated(By.xpath(config.xPathSelectors.closeContent)), config.waitElementTimeout);
			
            imgLink = await(driver.findElement(By.xpath(config.xPathSelectors.image)).getAttribute('src'));
            imgLinks.push(imgLink);
            ñonsole.log('\timage link: ' + imgLink);

            offset++;
			
            driver.findElement(By.xpath(config.xPathSelectors.closeContent)).click();
            driver.wait(until.elementDisappear(By.xpath(config.xPathSelectors.closeContent)), config.waitElementTimeout);
        

    }
    //console.log('images links: ' + imgLinks.join('\n'));
    console.timeEnd('grab image links');
});


function errorHandler(err){
    console.log('\n\n[error] :' + err +'\n\n');
}

until.elementDisappear = function(locator) {
    var locatorStr = locator + '';
    return new until.Condition('element to be disappear by ' + locatorStr,
        function (driver) {
            return driver.findElements(locator).then(function (elements) {
                return !elements[0];
            });
        });
};

var driver = new webdriver.Builder()
    //.withCapabilities(webdriver.Capabilities.phantomjs())
	.withCapabilities(webdriver.Capabilities.firefox())
	.setControlFlow(new webdriver.promise.ControlFlow())
    .build();
driver.manage().timeouts().setScriptTimeout(config.waitScriptTimeout);
driver.manage().window().setSize(1280, 900);

var needImages = 100;

console.time('grab image links');
driver.get(url);

driver.wait(until.elementLocated(By.css(config.selectors.more)),config.waitElementTimeout).then(
function(elem){
	driver.findElement(By.css(config.selectors.more)).click();

	console.log(scrollToTargetScript);	
	driver.executeScript(scrollToTargetScript);

	grabImageLinksByXpath();
},errorHandler);






