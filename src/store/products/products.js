import axios from "axios";
import authHeader from "@/services/login/auth_header";

export default {
  namespaced: true,
  state: {
    products: [],
    types: [],
    groups: [],
    lessStock: 0,
    equalTo: 0,
    greaterThan:0,
    dialogProducts: [],
  
  },

  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    TYPES(state, payload) {
      state.types = payload;
    },
    GROUPS(state, payload) {
      state.groups = payload;
    },
    DASHBOARD(state, payload) {
      state.lessStock = payload.lessTotal[0];
      state.equalTo = payload.equalTo[0];
      state.greaterThan = payload.greater[0]
    },
    SAMESTOCKPRODUCT(state, payload) {
      state.dialogProducts = payload.same;
    },
    LESSSTOCKPRODUCTS(state, payload) {
      state.dialogProducts = payload.lessthan;
    },
  },
  actions: {
    getAllProducts(context) {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "products", {
          headers: authHeader(),
        })
        .then((data) => {
          context.commit("PRODUCTS", data.data);
        });
    },

    getAllTypes(context) {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "types", {
          headers: authHeader(),
        })
        .then((data) => {
          context.commit("TYPES", data.data.types[0]);
        });
    },

    getAllGroups(context) {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "groups", {
          headers: authHeader(),
        })
        .then((data) => {
          context.commit("GROUPS", data.data.group[0]);
        });
    },
    getDashboardProduct(context) {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "products/dashboard", {
          headers: authHeader(),
        })
        .then((data) => {
          context.commit("DASHBOARD", data.data);
               //console.log("esto viene del store",data.data)
        });
    },
    getDashboardLessProduct(context) {
        axios
          .get(process.env.VUE_APP_SERVER_URL + "products/dashboard/less", {
            headers: authHeader(),
          })
          .then((data) => {
            context.commit("LESSSTOCKPRODUCTS", data.data);
           // console.log("esto viene del store",data.data)
          });
      },
      getDashboardSameProduct(context) {
        axios
          .get(process.env.VUE_APP_SERVER_URL + "products/dashboard/same", {
            headers: authHeader(),
          })
          .then((data) => {
            context.commit("SAMESTOCKPRODUCT", data.data);
          //  console.log("esto viene del store",data.data)
          });
      },
  },
  getters: {
    types: (state) => state.types,
    group: (state) => state.groups,
    products: (state) => state.products,
  },
};
