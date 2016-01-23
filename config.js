module.exports = {
  paterns: {
    likes: /"likes":\{"count":(\d+)/g,
    userId: /com\/(\w+)\//g
  },
  selectors: {
    //content :'._8mlbc._t5r8b'; check later     //use paths because id and class generated(check this)

    content : 'div > div > div > a',
    image : 'div > div > div > div > article > div > div > img',
    more : 'main > article > div > div >a',
    scrollTarget : '.ResponsiveBlock'
  },

  scrollStep: 200,
  scrollTimeout: 50

};
