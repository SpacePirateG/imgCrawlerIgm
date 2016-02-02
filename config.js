module.exports = {
  paterns: {
    likes: /"likes":\{"count":(\d+)/g,
    userId: /com\/(\w+)\//g
  },
  
  xPathSelectors: {
    content : '//div/div/div/a[count(*)=1]',
    image : '//article/div/div/img | //article/div/div/div/img',
    closeContent : '//div/div/button',
    more : '//main/article/div/div/a',
    scrollTarget : '//@[class=".ResponsiveBlock"]'
  },

  scrollStep: 200,
  scrollTimeout: 50,
  waitElementTimeout: 10000,
  waitScriptTimeout: 10000
};
