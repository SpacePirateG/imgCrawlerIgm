module.exports = {
    paterns: {
        likes: /"likes":\{"count":(\d+)/g,
        userId: /com\/(\w+)\//g
    },
    //useCss: false,
    xPathSelectors: {
        name: '//div/div/h1',
        //content: '//a[@class = "_8mlbc" and not(div[@class = "_1lp5e"])]',
        loading: '//article/div/div/a'
    },
    cssSelectors: {
		content: '._8mlbc',
        nextContent: '.coreSpriteRightPaginationArrow',
        scrollTarget: '.ResponsiveBlock',
        image: '._e0mru ._icyx7,._rudo5 ._icyx7',
        video: '._c8hkj'
    },
    scrollStep: 200,
    scrollTimeout: 50,
    waitElementTimeout: 10000,
    waitScriptTimeout: 10000,
    sourceUrl: '',
    countContent: 1000,

    profileStates: {
        free: 'FREE',
        lock: 'LOCK',
        done: 'DONE'
    },
    module: {
        name: 'crawler',
        likes: {
            name: 'likes',
            //desc: 'count likes in image',
            type: 'INT'
        },
        profile: {
            name: 'profile',
            //desc: 'profile name',
            type: 'STRING'
        }
    },

    hostDB: 'mongodb://localhost/work'
};
