import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import I18n from "../i18n";
import Stream from "../views/Stream";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      icon: "mdi-home",
      i18n: "pages.home._name"
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      icon: "mdi-account-multiple",
      i18n: "pages.about._name"
    }
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
    meta: {
      icon: "mdi-timeline-clock",
      i18n: "pages.stream._name"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${I18n.t(to.meta.i18n)} | ${I18n.t('app.name')}`;
  next();
});

export default router
