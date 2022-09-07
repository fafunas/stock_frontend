import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {auth} from './auth/auth'
import users from './users/users'
import products from './products/products'
import supplier from './supplier/supplier'
import wareHouse from './warehouse/warehouse'
import notifications from './notifications/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    users,
    products,
    supplier,
    wareHouse,
    notifications
  },
  plugins:[
    createPersistedState({
      paths:['users'],
  })
  ]
})
