import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Accommodations from "../views/lists/Accommodations";
// import PsychologicalPlatforms from "../views/PsychologicalPlatforms";
// import MedicalPlatforms from '../views/MedicalPlatforms';
import Supplies from "../views/supplies/Supplies";
import SuppliesSubmission from "../views/supplies/SuppliesSubmission";
import CommunitySubmission from "../views/supplies/CommunitySubmission";
import PeopleLayout from "../layouts/PeopleLayout";
import StaffLayout from "../layouts/StaffLayout";
import MedicalPlatforms from "../views/lists/MedicalPlatforms";
import PsychologicalPlatforms from "../views/lists/PsychologicalPlatforms";
import Staff from "../views/roles/Staff";
import People from "../views/roles/People";
import config from "../config";
import VolunteerLayout from "../layouts/SponsorLayout";
import Volunteer from "../views/roles/Volunteer";
import PeopleAccommodations from "../views/lists/PeopleAccommodations";
import Community from "../views/supplies/Community";
import i18n from "../i18n";

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    icon: "mdi-home",
    title: "home._name",
    hide: true,
    hideDrawer: true
  }
}, {
  path: "/people",
  name: "people",
  component: PeopleLayout,
  meta: {
    icon: "mdi-face",
    title: "people._name",
    subtitle: "people._subtitle",
    banner: `${config.cdn.global}/images/people.jpg`
  },
  children: [
      {
      path: '',
      name: 'peopleIndex',
      component: People,
      meta: {
        icon: "mdi-home",
        title: "市民信息主页",
      }
    }, {
      path: 'supplies',
      name: 'CommunitySupplies',
      component: Community,
      meta: {
        icon: "mdi-file-document-box-search",
        icons: ["mdi-account", "mdi-file-document-box-search"],
        title: "社区物资需求列表",
        subtitle: "为民众设置的社区物资需求列表，便于各民众发布自己的个人物资需求以便进行针对性帮助"
      }
    }, {
      path: 'supplies/submit',
      name: 'CommunitySuppliesSubmission',
      component: CommunitySubmission,
      meta: {
        icon: "mdi-file-document-box-plus",
        icons: ["mdi-account", "mdi-file-document-box-plus"],
        title: "提交社区物资需求",
        subtitle: "提交新的社区物资需求。提交后将发布于社区物资需求列表中"
      }
    }, {
      path: 'platforms/medical',
      name: 'peopleMedicalPlatform',
      component: MedicalPlatforms,
      meta: {
        icon: "mdi-hospital",
        title: "线上医疗诊断平台",
        subtitle: "足不出户即可与众多知名医院专家连线进行远程诊疗"
      }
    }, {
      path: 'platforms/psychological',
      name: 'peoplePsychologicalPlatform',
      component: PsychologicalPlatforms,
      meta: {
        icon: "mdi-heart",
        title: "线上心理咨询平台",
        subtitle: "我们提供免费心理咨询平台的查询，包括基本信息与其联系方式"
      }
    }, {
      path: 'accommodations',
      name: 'peopleAccommodations',
      component: PeopleAccommodations,
      meta: {
        icon: "wsicon wsicon-hotel",
        title: "武汉在外人员住宿",
        subtitle: "提供武汉在外人员的住宿信息，保障这些群体的基本生活"
      }
    }
  ]
}, {
  path: "/staff",
  name: "staff",
  component: StaffLayout,
  meta: {
    icon: "mdi-hospital-box",
    title: "staff._name",
    subtitle: "staff._subtitle",
    banner: `${config.cdn.global}/images/staff.jpg`
  },
  children: [
    {
      path: '',
      name: 'staffIndex',
      component: Staff,
      meta: {
        icon: "mdi-home",
        title: "医护人员信息主页"
      }
    }, {
      path: 'accommodations',
      name: 'staffAccommodations',
      component: Accommodations,
      meta: {
        icon: "wsicon wsicon-hotel",
        title: "医护人员免费住宿",
        subtitle: "为医护人员提供免费住宿信息列表，支持地理位置排序与地区过滤，以提供基本生活保障"
      }
    }, {
      path: 'platforms/psychological',
      name: 'staffPsychologicalPlatform',
      component: PsychologicalPlatforms,
      meta: {
        icon: "mdi-heart",
        title: "线上心理咨询平台",
        subtitle: "我们为您提供免费心理咨询平台的查询，包括基本信息与其联系方式"
      }
    }, {
      path: 'supplies',
      name: 'staffSupplies',
      component: Supplies,
      meta: {
        icon: "mdi-file-document-box-search",
        icons: ["mdi-hospital", "mdi-file-document-box-search"],
        title: "医疗机构物资需求",
        color: "red--text",
        subtitle: "支持紧急程度与需求核验公示、按照地区过滤等多种功能，方便直观了解情况"
      }
    }, {
      path: 'supplies/submit',
      name: 'staffSuppliesSubmission',
      component: SuppliesSubmission,
      meta: {
        icon: "mdi-file-document-box-plus",
        icons: ["mdi-hospital", "mdi-file-document-box-plus"],
        title: "提交医疗物资需求",
        subtitle: "提交新的医疗机构物资需求。提交后将交由内部信息组与官方渠道进行沟通，确保真实性与时效性后，发布于需求列表中",
        hide: false
      }
    }
  ]
}, {
  path: "/volunteer",
  name: "volunteer",
  component: VolunteerLayout,
  meta: {
    icon: "mdi-hand-heart",
    title: "volunteer._name",
    subtitle: "volunteer._subtitle",
    banner: `${config.cdn.global}/images/volunteers-v3.jpg`
  },
  children: [{
    path: '',
    name: 'volunteerIndex',
    component: Volunteer,
    meta: {
      icon: "mdi-home",
      title: "志愿者信息主页"
    }
  }, {
    path: 'supplies',
    name: 'volunteerSupplies',
    component: Supplies,
    meta: {
      icon: "mdi-hospital",
      icons: ["mdi-hospital", "mdi-file-document-box-search"],
      title: "医疗机构物资需求",
      color: "red--text",
      subtitle: "支持紧急程度与需求核验公示、按照地区过滤等多种功能，方便直观了解情况"
    }
  }, {
    path: 'supplies/submit',
    name: 'volunteerSuppliesSubmission',
    component: SuppliesSubmission,
    meta: {
      icon: "mdi-file-document-box-plus",
      icons: ["mdi-hospital", "mdi-file-document-box-plus"],
      title: "提交医疗物资需求",
      subtitle: "提交新的医疗机构物资需求。提交后将交由内部信息组与官方渠道进行沟通，确保真实性与时效性后，发布于需求列表中",
      hide: false
    }
  }]
}, {
  path: '*',
  beforeEnter: (to, from, next) => {
    next({ path: "/" });
  },
  meta: {
    hide: true
  }
}];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ${i18n.t('app.name')}`;
  next();
});

export default router;
