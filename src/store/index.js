import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from './auth/auth'
import users from './users/users'
import products from './products/products'

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
    products
  }
})
