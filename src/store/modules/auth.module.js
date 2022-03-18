import axios from 'axios'
import { vuexTypes } from '@/store/types'
import config from '@/config'

export default {
  actions: {
    async [vuexTypes.SIGN_UP] (_, form) {
      await axios.post(config.hostUrl + '/api/v1/auth/registration', form)
    },
    async [vuexTypes.LOG_IN] ({ commit }, form) {
      const { data } = await axios.post(config.hostUrl + '/api/v1/auth/login', form, { withCredentials: true })
      commit(vuexTypes.UPDATE_USER_AUTH, data)
    },
    async [vuexTypes.LOG_OUT] ({ commit }) {
      commit(vuexTypes.CLEAR_STATE)
    }
  },
  mutations: {
    [vuexTypes.UPDATE_USER_AUTH] (state, data) {
      state.isLoggedIn = true
      state.accessToken = data.accessToken
      state.user = data.user
    },
    [vuexTypes.CLEAR_STATE] (state) {
      state.isLoggedIn = false
      state.user = {}
      state.accessToken = ''
    }
  },
  state: {
    isLoggedIn: false,
    accessToken: '',
    user: {}
  },
  getters: {
    [vuexTypes.isLoggedIn]: (state) => state.isLoggedIn,
    [vuexTypes.accessToken]: (state) => state.accessToken,
    [vuexTypes.user]: (state) => state.user
  }
}
