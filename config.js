module.exports = {
  paterns: {
    likes: /"likes":\{"count":(\d+)/g,
    userId: /com\/(\w+)\//g
  },
  //useCss: false,

  xPathSelectors: {
    name: '//div/div/h1',
    content: '//a[@class = "_8mlbc _t5r8b" and not(div[@class = "_1lp5e"])]',
    loading: '//article/div/div/a'
  },
  cssSelectors: {
    nextContent: '.coreSpriteRightPaginationArrow',
    scrollTarget : '.ResponsiveBlock',
    image: '._e0mru ._icyx7,._rudo5 ._icyx7',
    video: '._c8hkj',
  },

  scrollStep: 200,
  scrollTimeout: 50,
  waitElementTimeout: 10000,
  waitScriptTimeout: 10000,
  sourceUrl: '',
  countContent: 2000
};
