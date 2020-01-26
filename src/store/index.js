import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      dark: false,
      language: null
    }
  },
  mutations: {
    switchDark(state, newState) {
      state.settings.dark = newState
    },
    changeLocale(state, newLocale) {
      state.settings.language = newLocale
    },
  },
  getters: {
    language: state => state.settings.language,
    dark: state => state.settings.dark
  },
  actions: {
  },
  modules: {
  }
})
