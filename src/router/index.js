import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import TransitionWrapperLayout from "../layouts/TransitionWrapperLayout.vue";
import SimpleLayout from "../layouts/SimpleLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import Start from "../views/Start.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Bitcoin from "../views/Bitcoin.vue";
import Lightning from "../views/Lightning.vue";
import Apps from "../views/Apps.vue";
import AppStore from "../views/AppStore.vue";
import AppStoreApp from "../views/AppStoreApp.vue";
import Settings from "../views/Settings.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: TransitionWrapperLayout,
    children: [
      {
        path: "",
        component: SimpleLayout,
        children: [
          {
            path: "",
            name: "login",
            component: Login,
            meta: { requiresAuth: false }
          }
        ]
      },
      {
        path: "/start",
        component: SimpleLayout,
        meta: { requiresAuth: false },
        children: [
          {
            path: "",
            name: "start",
            component: Start
          }
        ]
      },
      {
        path: "/dashboard",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "dashboard",
            component: Dashboard
          }
        ]
      },
      {
        path: "/bitcoin",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "bitcoin",
            component: Bitcoin
          }
        ]
      },
      {
        path: "/lightning",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "lightning",
            component: Lightning
          }
        ]
      },
      {
        path: "/apps",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "apps",
            component: Apps
          }
        ]
      },
      {
        path: "/app-store",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "app-store",
            component: AppStore
          },
          {
            path: ":id",
            name: "app-store-app",
            component: AppStoreApp
          }
        ]
      },
      {
        path: "/settings",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "settings",
            component: Settings
          }
        ]
      },
      {
        path: "/logout",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "logout",
            component: Logout
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // Exists when Browser's back/forward pressed
    if (savedPosition) {
      return savedPosition
      // For anchors
    } else if (to.hash) {
      return { selector: to.hash, behavior: 'smooth' }
      // By changing queries we are still in the same component, so "from.path" === "to.path" (new query changes just "to.fullPath", but not "to.path").
    } else if (from.path === to.path) {
      return {}
    }
    // Scroll to top
    return { x: 0, y: 0 }
  }
});

//Fake for now
const isLoggedIn = () => !!store.state.user.jwt;

//Authentication Check
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // always call next()!
  }
});

//Close Mobile Menu after route change
router.afterEach(() => {
  if (store.getters.isMobileMenuOpen) {
    store.commit("toggleMobileMenu");
  }
});

export default router;
