import Vue from "vue";
import VueRouter from "vue-router";

import SimpleLayout from "../layouts/SimpleLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Bitcoin from "../views/Bitcoin.vue";
import Lightning from "../views/Lightning.vue";
import Settings from "../views/Settings.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: SimpleLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        component: Home,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
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
})

export default router;
