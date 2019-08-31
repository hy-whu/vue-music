import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
// vue-lazy 图片加载时显示默认图片
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

// 解决300ms点击延迟问题
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
