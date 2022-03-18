import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.module'
import books from './modules/books.module'
import config from '@/config'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: config.storageKey,
    storage: window.sessionStorage,
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth,
    books
  },
})
