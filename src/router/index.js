import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import I18n from "../i18n";
import Accommodations from "../views/Accommodations";
// import PsychologicalPlatforms from "../views/PsychologicalPlatforms";
// import MedicalPlatforms from '../views/MedicalPlatforms';
import Supplies from "../views/Supplies";
import FormTest from "../views/FormTest";

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
            i18n: "pages.accommodations._name",
            subtitle: "为医护人员提供免费住宿信息列表，便于查看"
        }
    },
    {
        path: '/hospital/supplies',
        name: 'supplies',
        component: Supplies,
        meta: {
            icon: "mdi-hospital",
            i18n: "pages.supplies._name",
            classes: "red font-weight-bold white--text",
            subtitle: "【急需社会各界帮助】为医院提供信息需求发布平台；支持按照地区过滤、且加入了显示紧急性功能，便于各位捐助者梳理捐助优先级"
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
    // },
    {
        path: '/formTest',
        name: 'formTest',
        component: FormTest,
        meta: {
            icon: "mdi-hotel",
            i18n: "pages.formTest._name",
            subtitle: "表单测试页"
        }
    },
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
