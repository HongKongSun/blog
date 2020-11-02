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
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
      // { text: 'sidebar', link: '/views/sidebar/' },
      // { text: 'sidebar', link: '/views/sidebargroup/' }
    ],
    // sidebar: {
    //   '/views/sidebar/': [
    //     '',
    //     'bar1',
    //     'bar2'
    //   ],
    //   '/views/sidebargroup/': [
    //     {
    //       title: '基础',
    //       collapsable: true,
    //       children: [
    //         '',
    //         'bar1'
    //       ]
    //     },
    //     {
    //       title: '进阶',
    //       collapsable: true,
    //       children: [
    //         'bar2'
    //       ]
    //     },
    //   ]
    // },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '类别' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    logo: '/head.png',
    authorAvatar: '/life.JPG',
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
        title: '友情链接',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
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
