import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ajax: {
      states: [],
      error: false
    },
    settings: {
      dark: false,
      language: null
    },
  },
  mutations: {
    switchDark(state, newState) {
      state.settings.dark = newState
    },
    changeLocale(state, newLocale) {
      state.settings.language = newLocale
    },
    addRequest: (state, payload) => state.ajax.states.push(payload),
    removeRequest: (state, payload) => state.ajax.states = state.ajax.states.filter(el => el !== payload),
  },
  getters: {
    language: state => state.settings.language,
    dark: state => state.settings.dark,
    ajaxLoading: state => !!state.ajax.states.length,
    ajaxError: state => state.ajax.error,
  },
  actions: {
  },
  modules: {
  }
})
