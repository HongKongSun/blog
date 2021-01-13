module.exports = {
  title: "孙香港的个人主页",
  description: '简单的个人输出空间',
  dest: 'example/public',
  head: [
    ['link', { rel: 'icon', href: 'https://gitee.com/hongkongsun/pic-bed/raw/master/config/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    // ['meta', { name: 'baidu-site-verification', content: 'code-dmHFWs3rRk' }]
  ],
  // markdown: {
  //   // markdown-it-anchor 的选项
  //   anchor: { permalink: false },
  //   // markdown-it-toc 的选项
  //   toc: { includeLevel: [1, 2] }
  // },
  // base: '/reco-example-test/',
  // theme: 'reco',
  theme: require.resolve('../../vuepress-theme-reco'),
  themeConfig: {
    nav: [
      { text: '主页', link: '/' ,icon: 'reco-home'},
      { text: 'Style', link: '/views/LifeList', icon: 'reco-douyin'},
      {
        text: '专栏', icon: 'reco-document', items: [
          // { text: '个人总结', link: '/views/review/', },
          { text: '交流技巧', link: '/views/speaking/', },
          { text: '商学课', link: '/views/business/', },
          { text: 'AI-PM', link: '/views/AI-PM/', },
          { text: 'AI技术', link: '/views/AI-Skill/', },
          { text: '前端面试专栏', link: '/views/FrontEnd/' },
        ],
      },
      { text: 'Time', link: '/timeline/', icon: 'reco-date'},
      { text: '关于我', link: '/views/About/about', icon: 'reco-wechat' },
    ],
    sidebar: {
      // 前端
      '/views/FrontEnd/': [
        // 介绍
        {
          title: '栏目介绍',
          collapsable: false,
          children: [''],
        },
        // 条目1:HTML+CSS
        {
          title: 'HTML + CSS',
          collapsable: true,
          children: ['HTML','CSS'],
        },
        // 条目2:JS
        {
          title: 'JS',
          collapsable: true,
          children: ['JS', 'JS-II', 'JS-III',]
        },
        // 条目3:Vue
        {
          title: 'Vue',
          collapsable: true,
          children: ['Vue']
        },
        // 条目4:Webpack
        {
          title: 'Webpack',
          collapsable: true,
          children: ['Webpack']
        },
        // 条目4:DesignPattern
        {
          title: '设计模式',
          collapsable: true,
          children: ['DesignPattern']
        },
        
      ],
      // 马丁讲话
      '/views/speaking/': [
        // 介绍
        {
          title: '栏目介绍',
          collapsable: false,
          children: [''],
        },
        // 条目
        {
          title: '马丁专栏',
          collapsable: false,
          children: ['First'],
        },
        
      ],
      // 商学课
      '/views/business/': [
        // 介绍
        {
          title: '栏目介绍',
          collapsable: false,
          children: [''],
        },
        // 条目1:第一季
        {
          title: '商学课第一季',
          collapsable: true,
          children: ['First'],
        },
        // 条目2:第二季
        {
          title: '商学课第二季',
          collapsable: true,
          children: ['Second'],
        },
        
      ],
      // AI产品
      '/views/AI-PM/': [
        // 介绍
        {
          title: '栏目介绍',
          collapsable: false,
          children: [''],
        },
        // 条目1:基础
        {
          title: 'AI-PM',
          collapsable: true,
          children: ['Basic'],
        },
        
      ],
      // AI技术
      '/views/AI-Skill/': [
        // 介绍
        {
          title: '栏目介绍',
          collapsable: false,
          children: [''],
        },
        // 条目1:CV
        {
          title: '计算机视觉',
          collapsable: true,
          children: ['CV'],
        },
        // 条目2:知识图谱
        {
          title: '知识图谱',
          collapsable: true,
          children: ['KG'],
        },
        
      ],
      // 个人总结
      // '/views/review/': [
      //   // 介绍
      //   {
      //     title: '栏目介绍',
      //     collapsable: false,
      //     children: [''],
      //   },
      //   // 条目
      //   {
      //     title: '个人阶段性总结',
      //     collapsable: false,
      //     children: ['internship'],
      //   },
        
      // ],
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '文章' // 默认 “分类”
      },
      tag: {
        location: 4, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    logo: 'https://gitee.com/hongkongsun/pic-bed/raw/master/config/avatar.jpeg',
    authorAvatar: 'https://gitee.com/hongkongsun/pic-bed/raw/master/config/avatar.jpeg',
    // 搜索设置
    search: false,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 4,
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'hongkong',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2020',
    /**
     * 密钥 (if your blog is private)
     */
    // 友情链接
    friendLink: [
      {
        title: 'Life-Style',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'hongkongsun7@gmail.com',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: '/views/LifeList.html'
      },
      // {
      //   title: 'vuepress-theme-reco',
      //   desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      //   avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   link: 'https://vuepress-theme-reco.recoluan.com'
      // },
    ],
    /**
     * support for
     * '' | 'default'
     * 'coy'
     * 'dark'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     * 'twilight'
     */
  },
  plugins: ['@vuepress/nprogress']
}
