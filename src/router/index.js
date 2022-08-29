import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name: 'Login',
    component:()=> import('../components/login/LoginCompo.vue')
  },
  {
    path:'/panel',
    name: 'UserPanel',
    component:()=> import('../views/UserABM.vue')
  },
  {
    path:'/product',
    name:'Product Panel',
    component:()=> import('../views/ProductAbm.vue')
  },
  {
    path:'/warehouse/in',
    name: 'Warehouse',
    component:()=> import('../views/WarehouseIn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
