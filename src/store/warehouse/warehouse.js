import axios from "axios";
import authHeader from '@/services/login/auth_header'

export default {
  namespaced: true,
  state: {
    registerIn: [],
    registerOut: [],
    nro_in:0,
    nro_out:0
  },

  mutations: {
    REGISTERIN(state, payload) {
      state.registerIn = payload;
    },
    REGISTEROUT(state, payload) {
      state.registerOut = payload;
    },

    TOTAL_NRO_IN(state,nro_in){
        state.nro_in = nro_in
    },
    TOTAL_NRO_OUT(state,nro_out){
      state.nro_out = nro_out
    }
  },
  actions: {
    confirmNewIn(context, payload) {
      axios
        .post(process.env.VUE_APP_SERVER_URL + "warehouse/in",payload,{headers: authHeader()})
        .then(() => {
          context.commit("REGISTERIN", payload);
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },
    confirmNewOut(context, payload) {
      axios
        .post(process.env.VUE_APP_SERVER_URL + "warehouse/out",payload,{headers: authHeader()})
        .then(() => {
          context.commit("REGISTEROUT", payload);
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },

    getAllRegIn(context){
        axios.get(process.env.VUE_APP_SERVER_URL + "warehouse/in",{headers: authHeader()})
        .then((data)=>{
            context.commit("TOTAL_NRO_IN",data.data.total)
        })
    },
    getAllRegOut(context){
      axios.get(process.env.VUE_APP_SERVER_URL + "warehouse/out",{headers: authHeader()})
      .then((data)=>{
          context.commit("TOTAL_NRO_OUT",data.data.total)
      })
  }
  },
  getters: {
    totalIn : state => state.nro_in + 1,
    totalOut: state => state.nro_out + 1 
  },
};
