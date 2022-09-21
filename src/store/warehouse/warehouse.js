import axios from "axios";
import authHeader from '@/services/login/auth_header'

export default {
  namespaced: true,
  state: {
    registerIn: [],
    registerOut: [],
    nro_in:0,
    nro_out:0,
    totalIn:[],
    totalOut:[]
  },

  mutations: {
    REGISTERIN(state, payload) {
      state.registerIn = payload;
    },
    REGISTEROUT(state, payload) {
      state.registerOut = payload;
    },
    TOTALIN(state,payload){
      state.totalIn = payload
    },
    TOTALOUT(state,payload){
      state.totalOut = payload
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
  },

    getAllIn(context){
      axios.get(process.env.VUE_APP_SERVER_URL + "warehouse/in",{headers: authHeader()})
      .then ((data)=>{
        context.commit("TOTALIN", data.data.opIn)
       // console.table(data.data.opIn)
      })
    },
    getAllOut(context){
      axios.get(process.env.VUE_APP_SERVER_URL + "warehouse/out",{headers: authHeader()})
      .then ((data)=>{
        context.commit("TOTALOUT", data.data.opOut)
      //  console.table(data.data.opIn)
      })
    }
  },
  getters: {
    totalIn : state => state.nro_in + 1,
    totalOut: state => state.nro_out + 1,
    allOpIn : state=> state.totalIn
  },
};
