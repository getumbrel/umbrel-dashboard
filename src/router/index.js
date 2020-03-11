import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";


import SimpleLayout from "../layouts/SimpleLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import TransitionWrapperLayout from "../layouts/TransitionWrapperLayout.vue";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Bitcoin from "../views/Bitcoin.vue";
import Lightning from "../views/Lightning.vue";
import Settings from "../views/Settings.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    component: TransitionWrapperLayout,
    children: [
      {
        path: '',
        component: SimpleLayout,
        children: [
          {
            path: '',
            name: 'home',
            component: Home,
            meta: { requiresAuth: false }
          }
        ]
      },
      {
        path: "/login",
        name: "login",
        component: SimpleLayout,
        meta: { requiresAuth: false },
        children: [
          {
            path: '',
            component: Login,
          },
        ]
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: Dashboard,
          },
        ]
      },
      {
        path: "/bitcoin",
        name: "bitcoin",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: Bitcoin,
          },
        ]
      },
      {
        path: "/lightning",
        name: "lightning",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: Lightning,
          },
        ]
      },
      {
        path: "/settings",
        name: "settings",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: Settings,
          },
        ]
      },
      {
        path: "/logout",
        name: "logout",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: Logout,
          },
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => { return { x: 0, y: 0 } } //scroll to top on page changes
});

//Fake for now
const isLoggedIn = () => true;

//Authentication Check
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // always call next()!
  }
});

//Close Mobile Menu after route change
router.afterEach(() => {
  if (store.getters.isMobileMenuOpen) {
    store.commit("toggleMobileMenu");
  }
})

export default router;
