import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import I18n from "../i18n";
import Accommodations from "../views/Accommodations";
// import PsychologicalPlatforms from "../views/PsychologicalPlatforms";
// import MedicalPlatforms from '../views/MedicalPlatforms';
import Supplies from "../views/Supplies";

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
    path: '/hospital/supplies',
    name: 'supplies',
    component: Supplies,
    meta: {
      icon: "mdi-hospital",
      i18n: "pages.supplies._name",
      classes: "red font-weight-bold white--text"
    }
  },
    // {
    //     path: '/platforms',
    //     name: 'platforms',
    //     component: MedicalPlatforms,
    //     meta: {
    //         icon: "mdi-hospital",
    //         i18n: "pages.platforms._name"
    //     }
    // },
    // {
    //     path: '/psychological',
    //     name: 'psychological',
    //     component: PsychologicalPlatforms,
    //     meta: {
    //         icon: "mdi-heart",
    //         i18n: "pages.psychological._name"
    //     }
    // }
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
