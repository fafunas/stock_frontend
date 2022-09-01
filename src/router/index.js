import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:()=> import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path:'/login',
    name: 'Login',
    component:()=> import('../components/login/LoginCompo.vue')
  },
  {
    path:'/panel',
    name: 'UserPanel',
    component:()=> import('../views/UserABM.vue'),
   // meta: { requiresAuth: true }
  },
  {
    path:'/product',
    name:'Product Panel',
    component:()=> import('../views/ProductAbm.vue'),
   // meta: { requiresAuth: true }
  },
  {
    path:'/warehouse/in',
    name: 'Warehouse',
    component:()=> import('../views/WarehouseIn.vue'),
    meta: { requiresAuth: true }
  },
  {
    path:'/warehouse/out',
    name: 'WarehouseOut',
    component:()=> import('../views/WarehouseOut.vue'),
    meta: { requiresAuth: true }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login','/','/warehouse/in'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
export default router
