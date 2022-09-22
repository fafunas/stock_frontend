import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName: "Login" */ "../components/login/LoginCompo.vue"
      ),
  },
  {
    path: "/panel",
    name: "UserPanel",
    component: () =>
      import(/* webpackChunkName: "Panel" */ "../views/UserABM.vue"),
    meta: { requiresAuth: true, admin: true },
    beforeEnter: (to, from, next) => {
      if (store.state.users.userRol === "USER_ROLE") {
        next("/");
      }
      next();
    },
  },
  {
    path: "/product",
    name: "Product Panel",
    component: () =>
      import(/* webpackChunkName: "Product Page" */ "../views/ProductAbm.vue"),
    meta: { requiresAuth: true, admin: true },

    beforeEnter: (to, from, next) => {
      if (store.state.users.userRol === "USER_ROLE") {
        next("/");
      }
      next();
    },
  },
  {
    path: "/warehouse/in",
    name: "Warehouse",
    component: () => import("../views/WarehouseIn.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: ()=> import ('../views/ReportsView.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: "/warehouse/out",
    name: "WarehouseOut",
    component: () => import("../views/WarehouseOut.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/warehouse/lease",
    name: "WarehouseLease",
    component: () => import("../views/WarehouseLease.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.status.loggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
export default router;
