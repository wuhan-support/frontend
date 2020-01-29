import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import I18n from "../i18n";
import Accommodations from "../views/Accommodations";
import Platforms from '../views/Platforms';

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
  // {
  //   path: '/stream',
  //   name: 'stream',
  //   component: Stream,
  //   meta: {
  //     icon: "mdi-timeline-clock",
  //     i18n: "pages.stream._name"
  //   }
  // },
  {
    path: '/accommodations',
    name: 'accommodations',
    component: Accommodations,
    meta: {
      icon: "mdi-hotel",
      i18n: "pages.accommodations._name"
    }
  },
  {
    path: '/platforms',
    name: 'platforms',
    component: Platforms,
    meta: {
      icon: "mdi-heart",
      i18n: "pages.platforms._name"
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${I18n.t(to.meta.i18n)} | ${I18n.t('app.name')}`;
  next();
});

export default router
