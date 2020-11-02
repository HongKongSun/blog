module.exports = {
  title: "孙香港的个人主页",
  description: '简单的个人输出空间',
  dest: 'example/public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
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
      { text: '🏠 主页', link: '/' },
      // { text: '人生清单', link: '/views/LifeList/' },
      { text: '📄 人生清单', link: '/views/LifeList' },
      { text: '专栏', link: '/views/sidebargroup/', icon: 'reco-document' },

      { text: '⌚️ 时间轴', link: '/timeline/' },
      { text: '关于我', link: '/views/About/about', icon: 'reco-wechat'},
    ],
    sidebar: {
      '/views/sidebargroup/': [
        {
          title: '前端面试专栏',
          collapsable: true,
          children: ['','frontend'],
        },
        {
          title: 'python专栏',
          collapsable: true,
          children: [
            'python'
          ]
        },
        {
          title: 'AI 专栏',
          collapsable: true,
          children: [
            'ai'
          ]
        },
      ]
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
    logo: '/avatar.jpeg',
    authorAvatar: '/avatar.jpeg',
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
        title: '我是小黑呀',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'hongkongsun7@gmail.com',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://hongkongsun.github.io/'
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
  plugins: [
   
  ]
}
