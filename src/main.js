import './scss/app.scss'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css';

import './validators'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import { messages } from '../locale'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru',
  messages
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
