import axios from "axios";

export default {
  namespaced: true,
  state: {
    registerIn: [],
    nro_in:0
  },

  mutations: {
    REGISTERIN(state, payload) {
      state.registerIn = payload;
    },

    TOTAL_NRO_IN(state,nro_in){
        state.nro_in = nro_in
    }
  },
  actions: {
    confirmNewIn(context, payload) {
      axios
        .post(process.env.VUE_APP_SERVER_URL + "warehouse/in",payload)
        .then(() => {
          context.commit("REGISTERIN", payload);
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },

    getAllRegIn(context){
        axios.get(process.env.VUE_APP_SERVER_URL + "warehouse/in")
        .then((data)=>{
            context.commit("TOTAL_NRO_IN",data.data.total)
        })
    }
  },
  getters: {},
};
