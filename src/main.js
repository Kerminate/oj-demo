// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './element-variables.scss'
import 'swiper/dist/css/swiper.css'
import { formate, timePretty } from '@/util/formate'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.filter('formate', formate)
Vue.filter('timePretty', timePretty)

Vue.config.productionTip = false

;['success', 'warning', 'info', 'error'].forEach((type) => {
  Vue.prototype['$' + type] = function (message, options = {}) {
    this.$message(Object.assign({
      type,
      message,
      duration: 5000,
      showClose: true
    }, options))
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
