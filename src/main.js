import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'
import config from './config'
import store from './store'
import vuetify from './plugins/vuetify'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import './assets/icon/wsicon.css'
import i18n from './i18n'

Vue.config.productionTip = false

const production = process.env.NODE_ENV === 'production'

if (production) {
  Sentry.init({
    dsn: 'https://335257229b13429eaa7f9af4faebcabe@sentry.imgal.vin/3',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
    logErrors: true,
    release: 'frontend@' + (config.version || 'unknown')
  })

  Vue.use(VueAnalytics, {
    id: 'UA-69113723-14',
    // customResourceURL: "https://www.google-analytics.com/analytics.js",
    router,
    debug: {
      // enabled: process.env.NODE_ENV === "development",
      enabled: false,
      sendHitTask: production
    },
    batch: {
      enabled: true, // enable/disable
      amount: 5, // amount of events fired
      delay: 2000 // delay in milliseconds
    },
    autoTracking: {
      exception: true,
      exceptionLogs: true
    }
  });
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
