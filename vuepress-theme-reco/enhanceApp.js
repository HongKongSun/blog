import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { addLinkToHead, addScriptToHead } from '@theme/helpers/utils'
// import { registerCodeThemeCss } from '@theme/helpers/other'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
  siteData,
  isServer
}) => {
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  if (!isServer) {
    addLinkToHead('//at.alicdn.com/t/font_1030519_2ciwdtb4x65.css')
    addScriptToHead('//kit.fontawesome.com/51b01de608.js')
    // registerCodeThemeCss(siteData.themeConfig.codeTheme)
    Vue.use(Element);

  }
}
