import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import config from './config'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import * as Sentry from '@sentry/browser';
import * as Integrations from "@sentry/integrations";

Vue.config.productionTip = false

const production = process.env.NODE_ENV === 'production';

if (production) {
  Sentry.init({
    dsn: 'https://237b425bb92749e98198df60f1835d31@sentry.io/1973056',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    logErrors: false,
    release: 'frontend-v2@' + (config.version || 'unknown'),
  });
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
